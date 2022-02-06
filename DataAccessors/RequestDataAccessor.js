const {GetConnection} = require('../dbConnection');
const { Request, TYPES } = require('tedious');

const REQUEST_TABLE = '[dbo].[UserRequest]';


const AddNewRequest = function(UserRequest, cb) {
    var connection = GetConnection();
    connection.connect((err) => {
        if (err) {
            console.log('connection err ' + err.message);
            throw err;
        }
        console.log(UserRequest.startDate)
        console.log(UserRequest.endDate)
        const sql = `
        INSERT INTO ${REQUEST_TABLE}
        ([UserId], [RequestTypeId], [StartDate], [EndDate], [StatusId])
        VALUES
        (${UserRequest.userId}, ${UserRequest.requestTypeId}, 
          CAST ('${UserRequest.startDate}' as datetime),
          CAST ('${UserRequest.endDate}' as datetime), 
          ${UserRequest.statusId})`
        const request = new Request(sql, (err, rowCount) => {
            if(err) {
                console.log("error in adding Request");
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

const GetAllRequests = function(cb) {  
    var connection = GetConnection();
    connection.connect((err) => {
        if (err) {
            console.log('connection err ' + err.message);
            throw err;
        }
        var _rows = [];

        const sql = `
        SELECT * FROM ${REQUEST_TABLE}
        `
        const request = new Request(sql, (err, rowCount, rows) => {
            if(err) {
                console.log("error in getting Requests");
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

const GetRequestById = function(id, callback) {
    var connection = GetConnection();
    connection.connect((err) => {
        if (err) {
            console.log('connection err ' + err.message);
            throw err;
        }
        var _rows = [];

        const sql = `
        SELECT * FROM ${REQUEST_TABLE} WHERE Id = @id
        `
        const request = new Request(sql, (err, rowCount, rows) => {
            if(err) {
                console.log("error in getting Request");
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


const UpdateRequestById = function(id, UserRequest, callback) {

    var connection = GetConnection();
    connection.connect((err) => {
        if (err) {
            console.log('connection err ' + err.message);
            throw err;
        }
        const sql = `
        UPDATE ${REQUEST_TABLE} 
        SET UserId = @UserId,
            RequestTypeId = @RequestTypeId,
            StartDate = CAST (@StartDate as datetime),
            EndDate = CAST (@EndDate as datetime),
            StatusId = @StatusId
        WHERE Id = @id
        `
        const request = new Request(sql, (err, rowCount, rows) => {
            if(err) {
                console.log("error in updating Request");
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
        request.addParameter('UserId', TYPES.Int, UserRequest.userId);
        request.addParameter('RequestTypeId', TYPES.Int, UserRequest.requestTypeId);
        request.addParameter('StartDate', TYPES.DateTime, UserRequest.startDate);
        request.addParameter('EndDate', TYPES.DateTime, UserRequest.endDate);
        request.addParameter('StatusId', TYPES.Int, UserRequest.statusId);
     
        connection.execSql(request);       
    }) 
}

const DeleteRequestById = function(id, callback) {
    var connection = GetConnection();
    connection.connect((err) => {
        if (err) {
            console.log('connection err ' + err.message);
            throw err;
        }

        const sql = `
        DELETE FROM ${REQUEST_TABLE} WHERE Id = @id
        `
        const request = new Request(sql, (err, rowCount, rows) => {
            if(err) {
                console.log("error in Deleting Request");
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

const RequestExists = function(id, callback) {
    var connection = GetConnection();
    connection.connect((err) => {
        if (err) {
            console.log('connection err ' + err.message);
            throw err;
        }
        const sql = `
        SELECT * FROM ${REQUEST_TABLE} WHERE Id = @id
        `
        const request = new Request(sql, (err, rowCount, rows) => {
            if(err) {
                console.log("error in getting User Request");
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


module.exports.AddNewRequest = AddNewRequest;
module.exports.GetAllRequests = GetAllRequests;
module.exports.GetRequestById = GetRequestById;
module.exports.UpdateRequestById = UpdateRequestById;
module.exports.DeleteRequestById = DeleteRequestById;
module.exports.RequestExists = RequestExists;