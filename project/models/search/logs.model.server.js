module.exports = function() {
    var mongoose = require('mongoose');
    var PlanSchema = require('./logs.schema.server')();
    var LogsModel = mongoose.model('LogsModel', PlanSchema);


    var api = {
        insertLogs: insertLogs,
        findAllData:findAllData
    };

    return api;
    var model = {};

    function insertLogs(data) {
        return LogsModel
            .create(data);
    }

    function findAllData(type){
        console.log('*8888**');
        return LogsModel
            .find({type:type})
    }
}