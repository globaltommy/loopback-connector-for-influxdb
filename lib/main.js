const Influx = require('influx');
const Connector = require('loopback-connector').Connector;

require('util').inherits(InfluxdbConnector, Connector);

exports.initialize = function initializeDataSource(dataSource, callback) {

    var settings = dataSource.settings || {};
    console.log(dataSource.settings);

    dataSource.connector = new InfluxdbConnector(settings);
    callback && process.nextTick(callback);
};

function InfluxdbConnector(settings) {
    this.settings = settings;
    this._models = {};

    this.influx = new Influx.InfluxDB({
        host: this.settings.host || 'localhost',
        database: this.settings.database
        // ,
        // schema: [
        //   {
        //     measurement: 'response_times',
        //     fields: {
        //       path: Influx.FieldType.STRING,
        //       duration: Influx.FieldType.INTEGER
        //     },
        //     tags: [
        //       'host'
        //     ]
        //   }
        // ]
    });
}

InfluxdbConnector.prototype.connect = function (cb) {
    // ...
    cb();
};
InfluxdbConnector.prototype.disconnect = function (cb) {
    // ...
    cb();
};

InfluxdbConnector.prototype.all = function (model, filter, callback) {

    // this has to be limited by default
    this.influx.query(
        "select * " + model + "order by time desc limit 100"
    )
    .then(result => callback(null, result))
    .catch(err => callback(err));
};
