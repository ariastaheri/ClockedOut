const {GetConnection} = require('../dbConnection');
const { Request, TYPES } = require('tedious');

const REQUEST_STATUS_TABLE = '[dbo].[RequestStatus]';


const AddNewRequestStatus = function(RequestStatus, cb) {
    var connection = GetConnection();
    connection.connect((err) => {
        if (err) {
            console.log('connection err ' + err.message);
            throw err;
        }
        const sql = `
        INSERT INTO ${REQUEST_STATUS_TABLE}
        ([StatusName])
        VALUES
        ('${RequestStatus.requestStatus}')`
        const request = new Request(sql, (err, rowCount) => {
            if(err) {
                console.log("error in adding RequestStatus");
                cb({success: false, error: err.message})
            }
            else {
                cb({success: true, error: null})
            }
            connection.close();
        });
        connection.execSql(request);
    })
}

const GetAllRequestStatuses = function(cb) {  
    var connection = GetConnection();
    connection.connect((err) => {
        if (err) {
            console.log('connection err ' + err.message);
            throw err;
        }
        var _rows = [];

        const sql = `
        SELECT * FROM ${REQUEST_STATUS_TABLE}
        `
        const request = new Request(sql, (err, rowCount, rows) => {
            if(err) {
                console.log("error in getting RequestStatuses");
            }
            connection.close();
        });
        request.on('row', columns => {
            var _item = {};
            for(var name in columns){
                _item[name] = columns[name].value;
            }
            _rows.push(_item);
        })

        request.on("requestCompleted", (rowCount, more, rows) => {            
            cb(_rows);
        });
        
        connection.execSql(request);       
    }) 
               
}

const GetRequestStatusById = function(id, callback) {
    var connection = GetConnection();
    connection.connect((err) => {
        if (err) {
            console.log('connection err ' + err.message);
            throw err;
        }
        var _rows = [];

        const sql = `
        SELECT * FROM ${REQUEST_STATUS_TABLE} WHERE Id = @id
        `
        const request = new Request(sql, (err, rowCount, rows) => {
            if(err) {
                console.log("error in getting RequestStatus");
            }
            connection.close();
        });
        request.addParameter('id', TYPES.Int, id);
        request.on('row', columns => {
            var _item = {};
            for(var name in columns){
                _item[name] = columns[name].value;
            }
            _rows.push(_item);
        })

        request.on("requestCompleted", (rowCount, more, rows) => {            
            callback(_rows);
        });
        
        connection.execSql(request);       
    }) 
}

const GetRequestStatusByName = function(status, callback) {
    var connection = GetConnection();
    connection.connect((err) => {
        if (err) {
            console.log('connection err ' + err.message);
            throw err;
        }
        var _rows = [];

        const sql = `
        SELECT * FROM ${REQUEST_STATUS_TABLE} WHERE StatusName = @status
        `
        const request = new Request(sql, (err, rowCount, rows) => {
            if(err) {
                console.log(err.message);
            }
            connection.close();
        });
        request.addParameter('status', TYPES.NVarChar, status);
        request.on('row', columns => {
            var _item = {};
            for(var name in columns){
                _item[name] = columns[name].value;
            }
            _rows.push(_item);
        })

        request.on("requestCompleted", (rowCount, more, rows) => {            
            callback(_rows);
        });
        
        connection.execSql(request);       
    }) 
}

const UpdateRequestStatusById = function(id, RequestStatus, callback) {

    var connection = GetConnection();
    connection.connect((err) => {
        if (err) {
            console.log('connection err ' + err.message);
            throw err;
        }
        const sql = `
        UPDATE ${REQUEST_STATUS_TABLE} 
        SET StatusName = @RequestStatus
        WHERE Id = @id
        `
        const request = new Request(sql, (err, rowCount, rows) => {
            if(err) {
                console.log("error in updating RequestStatus");
                callback({success: false, error: err.message})
            }
            else {
                if(rowCount > 0)
                    callback({success: true})
                else
                    callback({success: false, error: "No Rows Updated!"}) 
            }
            connection.close();
        });
        request.addParameter('id', TYPES.Int, id);
        request.addParameter('RequestStatus', TYPES.NVarChar, RequestStatus.requestStatus);
     
        connection.execSql(request);       
    }) 
}

const DeleteRequestStatusById = function(id, callback) {
    var connection = GetConnection();
    connection.connect((err) => {
        if (err) {
            console.log('connection err ' + err.message);
            throw err;
        }

        const sql = `
        DELETE FROM ${REQUEST_STATUS_TABLE} WHERE Id = @id
        `
        const request = new Request(sql, (err, rowCount, rows) => {
            if(err) {
                console.log("error in Deleting RequestStatus");
                callback({success: false, error: err.message})
            }
            else {
                callback({success: true})
            }
            connection.close();
        });
        request.addParameter('id', TYPES.Int, id);
        
        connection.execSql(request);       
    }) 
}

const RequestStatusExists = function(id, callback) {
    var connection = GetConnection();
    connection.connect((err) => {
        if (err) {
            console.log('connection err ' + err.message);
            throw err;
        }
        const sql = `
        SELECT * FROM ${REQUEST_STATUS_TABLE} WHERE Id = @id
        `
        const request = new Request(sql, (err, rowCount, rows) => {
            if(err) {
                console.log("error in getting Statuss");
            }
            if(rowCount > 0)
                callback(true)
            else
                callback(false)
            connection.close();
        });
        request.addParameter('id', TYPES.Int, id);
     
        connection.execSql(request);       
    }) 
}


module.exports.AddNewRequestStatus = AddNewRequestStatus;
module.exports.GetAllRequestStatuses = GetAllRequestStatuses;
module.exports.GetRequestStatusById = GetRequestStatusById;  
module.exports.GetRequestStatusByName = GetRequestStatusByName;  
module.exports.UpdateRequestStatusById = UpdateRequestStatusById;
module.exports.DeleteRequestStatusById = DeleteRequestStatusById;
module.exports.RequestStatusExists = RequestStatusExists;