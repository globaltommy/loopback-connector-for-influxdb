var Connector = require('loopback-connector').Connector;

require('util').inherits(InfluxdbConnector, Connector);

exports.initialize = function initializeDataSource(dataSource, callback) {
  console.log(dataSource.settings);
  dataSource.connector = new InfluxdbConnector(dataSource.settings);
  process.nextTick(function () {
    callback && callback();
  });
};

function InfluxdbConnector(dataSourceProps) {
  this.field1 = dataSourceProps.field1;
  this._models = {};
}

InfluxdbConnector.prototype.all = function (model, filter, callback) {
  //connector implementation logic 
  callback(null, [{ "id": 1, "name": "hello" }, { "id": 2, "name": "world" }]);
};