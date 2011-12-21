var cluster = require('../lib/cluster').cluster;
var czCluster = require('openvz-cluster');

var CzagendaApi = require('../lib/containers/czagendaapi').Container;
czCluster.containerTypes.register(CzagendaApi);

cluster.afterInit(function() {
	
	var containers = cluster.getContainersByType(CzagendaApi);
	containers.forEach(function (container) {
		container.updateServer(console.log);
	});
	
});