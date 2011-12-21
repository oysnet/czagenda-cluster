// Redis failover IP address
exports.REDIS_FAILOVER = 'IP_ADDRESS';

// HTTP API Proxy failover IP address
exports.PROXY_FAILOVER = 'IP_ADDRESS';

// Elasticsearch failover IP address
exports.ELASTICSEARCH_FAILOVER = 'IP_ADDRESS';

// Number of HTTP API Proxy to keep alive
exports.PROXY_COUNT = 2;

// Number of Elasticsearch to keep alive
exports.ELASTICSEARCH_COUNT = 2; // must be greater than or equal 2 since elasticsearch will be configured to replicate data on 2 shards

// Number of API to keep alive
exports.API_COUNT = 2;

// Elasticsearch cluster name
exports.ELASTICSEARCH_CLUSTER_NAME = 'czagenda-cluster';

// Elasticsearch index name
exports.ELASTICSEARCH_INDEX_NAME = 'czagenda';

// Proxmox hosts list
exports.HOSTS = [{ip : 'IP_ADDRESS'}]

// Virtual machines network address (mask will be 255.255.255.0)
exports.NETWORK_ADDRESS = 'NEWORK_IP_ADDRESS'; // something like 10.7.50.0

// Domain name server IP address
exports.NAME_SERVER = 'IP_ADDRESS';