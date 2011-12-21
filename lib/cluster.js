var settings = require('../settings');
var czCluster = require('openvz-cluster');


// configure hosts and cluster
var cluster = new czCluster.Cluster();

settings.HOSTS.forEach(function (host) {
	cluster.register(new czCluster.Host(host.ip));
})

cluster.defaultNetworkAddress = settings.NETWORK_ADDRESS;
cluster.nameServerAddress = settings.NAME_SERVER;

exports.cluster = cluster;