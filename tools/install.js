var settings = require('../settings');

var czCluster = require('czagenda-cluster');
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

cluster.afterInit(function() {
	
	console.log('init')
	

			var methods = [];
			
			// Redis
			methods.push(function(callback) {
						var ctn = new CzagendaRedis({}, default_host);
						ctn.setup(function () {
							ctn.addIp(settings.REDIS_FAILOVER,false ,callback)
						});
					})
					
			// ES 1
			methods.push(function(callback) {
						var ctn = new CzagendaElasticSearch({}, default_host);
						ctn.setup(function () {
							ctn.addIp(settings.ELASTICSEARCH_FAILOVER,false ,callback)
						});
					})
					
			// ES 2
			methods.push(function(callback) {
						var ctn = new CzagendaElasticSearch({}, default_host);
						ctn.setup(callback);
					})
					
			// API 1
			methods.push(function(callback) {
						var ctn = new CzagendaApi({}, default_host);
						ctn.setup(callback);
					})
					
			// API 2					
			methods.push(function(callback) {
						var ctn = new CzagendaApi({}, default_host);
						ctn.setup(callback);
					})
					
			// API PROXY 1					
			methods.push(function(callback) {
						var ctn = new CzagendaHttpProxy({}, default_host);
						ctn.setup(function () {
							ctn.addIp(settings.PROXY_FAILOVER,false ,callback)
						});
					})
					
			// API PROXY 2				
			methods.push(function(callback) {
						var ctn = new CzagendaHttpProxy({}, default_host);
						ctn.setup(callback);
					})
			
			async.series(methods, function () {
				console.log(arguments)
			})
					
		});