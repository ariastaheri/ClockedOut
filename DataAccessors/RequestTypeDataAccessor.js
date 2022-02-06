const {GetConnection} = require('../dbConnection');
const { Request, TYPES } = require('tedious');

const REQUEST_TYPE_TABLE = '[dbo].[RequestType]';


const AddNewRequestType = function(RequestType, cb) {
    //console.log(Role);
    var connection = GetConnection();
    connection.connect((err) => {
        if (err) {
            console.log('connection err ' + err.message);
            throw err;
        }
        const sql = `
        INSERT INTO ${REQUEST_TYPE_TABLE}
        ([RequestType])
        VALUES
        ('${RequestType.requestType}')`
        const request = new Request(sql, (err, rowCount) => {
            if(err) {
                console.log("error in adding RequestType");
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

const GetAllRequestTypes = function(cb) {  
    var connection = GetConnection();
    connection.connect((err) => {
        if (err) {
            console.log('connection err ' + err.message);
            throw err;
        }
        var _rows = [];

        const sql = `
        SELECT * FROM ${REQUEST_TYPE_TABLE}
        `
        const request = new Request(sql, (err, rowCount, rows) => {
            if(err) {
                console.log("error in getting RequestTypes");
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

const GetRequestTypeById = function(id, callback) {
    var connection = GetConnection();
    connection.connect((err) => {
        if (err) {
            console.log('connection err ' + err.message);
            throw err;
        }
        var _rows = [];

        const sql = `
        SELECT * FROM ${REQUEST_TYPE_TABLE} WHERE Id = @id
        `
        const request = new Request(sql, (err, rowCount, rows) => {
            if(err) {
                console.log("error in getting RequestType");
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


const UpdateRequestTypeById = function(id, RequestType, callback) {

    var connection = GetConnection();
    connection.connect((err) => {
        if (err) {
            console.log('connection err ' + err.message);
            throw err;
        }
        const sql = `
        UPDATE ${REQUEST_TYPE_TABLE} 
        SET RequestType = @RequestType
        WHERE Id = @id
        `
        const request = new Request(sql, (err, rowCount, rows) => {
            if(err) {
                console.log("error in updating RequestType");
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
        request.addParameter('RequestType', TYPES.NVarChar, RequestType.requestType);
     
        connection.execSql(request);       
    }) 
}

const DeleteRequestTypeById = function(id, callback) {
    var connection = GetConnection();
    connection.connect((err) => {
        if (err) {
            console.log('connection err ' + err.message);
            throw err;
        }

        const sql = `
        DELETE FROM ${REQUEST_TYPE_TABLE} WHERE Id = @id
        `
        const request = new Request(sql, (err, rowCount, rows) => {
            if(err) {
                console.log("error in Deleting RequestType");
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

const RequestTypeExists = function(id, callback) {
    var connection = GetConnection();
    connection.connect((err) => {
        if (err) {
            console.log('connection err ' + err.message);
            throw err;
        }
        const sql = `
        SELECT * FROM ${REQUEST_TYPE_TABLE} WHERE Id = @id
        `
        const request = new Request(sql, (err, rowCount, rows) => {
            if(err) {
                console.log("error in getting Roles");
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


module.exports.AddNewRequestType = AddNewRequestType;
module.exports.GetAllRequestTypes = GetAllRequestTypes;
module.exports.GetRequestTypeById = GetRequestTypeById;
module.exports.UpdateRequestTypeById = UpdateRequestTypeById;
module.exports.DeleteRequestTypeById = DeleteRequestTypeById;
module.exports.RequestTypeExists = RequestTypeExists;