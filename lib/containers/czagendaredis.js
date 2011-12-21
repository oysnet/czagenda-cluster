var util = require('util'), 
log = require('czagenda-log').from(__filename), 
Redis = require('openvz-cluster').containers.Redis,
Container = require('openvz-cluster').Container;

var CzagendaRedis = function CzagendaRedis() {
	Redis.apply(this, Array.prototype.slice.call(arguments));
	this.network = Container.NETWORK.VETH;
};
util.inherits(CzagendaRedis, Redis);

CzagendaRedis.type = 'CzagendaRedis';

exports.Container = CzagendaRedis