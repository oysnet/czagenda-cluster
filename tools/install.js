var settings = require('../settings');
var log = require('czagenda-log').from(__filename);
var czCluster = require('openvz-cluster');
var async = require('async');

// import containers
var CzagendaRedis = require('../lib/containers/czagendaredis').Container;
var CzagendaElasticSearch = require('../lib/containers/czagendaelasticsearch').Container;
var CzagendaApi = require('../lib/containers/czagendaapi').Container;
var CzagendaHttpProxy = require('../lib/containers/czagendahttpproxy').Container;

// register containers
czCluster.containerTypes.register(CzagendaRedis);
czCluster.containerTypes.register(CzagendaElasticSearch);
czCluster.containerTypes.register(CzagendaApi);
czCluster.containerTypes.register(CzagendaHttpProxy);

// configure hosts and cluster
var cluster = require('../lib/cluster').cluster;

var default_host = cluster.hosts[0];

var logCallback = function(callback, message, err, res) {
	if (err) {
		log.warning(message + ': FAILED', JSON.stringify(err));
	} else {
		log.info(message);
	}
	callback(err, res);
}

cluster.afterInit(function() {

			var ctnRedis = null;
			var ctnES1 = null;
			var ctnApi1 = null;
			var ctnProxy1 = null;

			var methods = [];

			// Redis
			methods.push(function(callback) {
						ctnRedis = new CzagendaRedis({}, default_host);
						ctnRedis.setup(logCallback.bind(this, callback,
								'Install Redis VM'));
					})

			// set Failover IP
			methods.push(function(callback) {
						ctnRedis.addIp(settings.REDIS_FAILOVER, false,
								logCallback.bind(this, callback,
										'Set failover IP on Redis'))
					})

			// ES 1
			methods.push(function(callback) {
						ctnES1 = new CzagendaElasticSearch({}, default_host);
						ctnES1.setup(logCallback.bind(this, callback,
								'Install ElasticSearch VM n°1'));
					})

			// set Failover IP
			methods.push(function(callback) {
						ctnES1
								.addIp(
										settings.ELASTICSEARCH_FAILOVER,
										false,
										logCallback
												.bind(this, callback,
														'Set failover IP on ElasticSearch VM n°1'))
					})

			// ES 2
			methods.push(function(callback) {
						var ctn = new CzagendaElasticSearch({}, default_host);
						ctn.setup(logCallback.bind(this, callback,
								'Install ElasticSearch VM n°2'));
					})

			// API 1
			methods.push(function(callback) {
						ctnApi1 = new CzagendaApi({}, default_host);
						ctnApi1.setup(logCallback.bind(this, callback,
								'Install CzagendaApi VM n°1'));
					})

			// API 2
			methods.push(function(callback) {
						var ctn = new CzagendaApi({}, default_host);
						ctn.setup(logCallback.bind(this, callback,
								'Install CzagendaApi VM n°2'));
					})

			// API PROXY 1
			methods.push(function(callback) {
						ctnProxy1 = new CzagendaHttpProxy({}, default_host);
						ctnProxy1.setup(logCallback.bind(this, callback,
								'Install CzagendaHttpProxy VM n°1'));
					})

			methods.push(function(callback) {
						ctnProxy1
								.addIp(
										settings.PROXY_FAILOVER,
										false,
										logCallback
												.bind(this, callback,
														'Set failover IP on CzagendaHttpProxy VM n°1'))

					})

			// API PROXY 2
			methods.push(function(callback) {
						var ctn = new CzagendaHttpProxy({}, default_host);
						ctn.setup(logCallback.bind(this, callback,
								'Install CzagendaHttpProxy VM n°2'));
					})

			// Install Elasticsearch mapping
			methods.push(function(callback) {
						ctnApi1
								.exec(
										[
												'sh /home/czagenda-api/tools/setupElasticsearch.sh',
												settings.ELASTICSEARCH_INDEX_NAME,
												settings.ELASTICSEARCH_FAILOVER]
												.join(' '),
										null,
										logCallback
												.bind(this, callback,
														'Install ElasticSearch mappings'))
					})

			// Install Schemas
			methods.push(function(callback) {
						ctnApi1
								.exec(
										'cd /home/czagenda-api && node tools/createSchemas.js',
										null, logCallback.bind(this, callback,
												'Install schemas'))
					})

			async.series(methods, function(err, res) {

						if (err) {
							log.warning('Cluster installation failed');
							process.exit(0);
						}

						log.info("Cluster installation complete")
						process.exit(1)
					})

		});