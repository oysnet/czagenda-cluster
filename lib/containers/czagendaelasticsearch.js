var util = require('util'), 
log = require('czagenda-log').from(__filename), 
ElasticSearch = require('czagenda-cluster').containers.ElasticSearch,
settings = require('../../settings');


var CzagendaElasticSearch = function CzagendaElasticSearch() {
	ElasticSearch.apply(this, Array.prototype.slice.call(arguments));
	
};
util.inherits(CzagendaElasticSearch, ElasticSearch);

CzagendaElasticSearch.type = 'CzagendaElasticSearch';


ElasticSearch.prototype._getServerConfiguration = function() {
	return "cluster:\nname: "+ settings.ELASTICSEARCH_CLUSTER_NAME +"\nnetwork:\nhost: 0.0.0.0";
}

exports.Container = CzagendaElasticSearch