var settings = require('./settings');
var log = require('czagenda-log').from(__filename);
var czCluster = require('openvz-cluster');
var async = require('async');

// import containers
var CzagendaRedis = require('./lib/containers/czagendaredis').Container;
var CzagendaElasticSearch = require('./lib/containers/czagendaelasticsearch').Container;
var CzagendaApi = require('./lib/containers/czagendaapi').Container;
var CzagendaHttpProxy = require('./lib/containers/czagendahttpproxy').Container;

// register containers
czCluster.containerTypes.register(CzagendaRedis);
czCluster.containerTypes.register(CzagendaElasticSearch);
czCluster.containerTypes.register(CzagendaApi);
czCluster.containerTypes.register(CzagendaHttpProxy);

// configure hosts and cluster
var cluster = require('./lib/cluster').cluster;

cluster.afterInit(function() {
	
			// HTTP PROXY
			new czCluster.supervisors.HA(cluster, CzagendaHttpProxy,
					settings.PROXY_FAILOVER);
			new czCluster.supervisors.Count(cluster, CzagendaHttpProxy, settings.PROXY_COUNT,
					true);

			// API
			new czCluster.supervisors.Count(cluster, CzagendaApi, settings.API_COUNT);

			// ElasticSearch
			new czCluster.supervisors.HA(cluster, CzagendaElasticSearch,
					settings.ELASTICSEARCH_FAILOVER);
			new czCluster.supervisors.Count(cluster, CzagendaElasticSearch, settings.ELASTICSEARCH_COUNT)

			// Redis
			new czCluster.supervisors.HA(cluster, CzagendaRedis, settings.REDIS_FAILOVER);
			new czCluster.supervisors.Count(cluster, CzagendaRedis, 1)
		});
