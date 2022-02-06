const {GetConnection} = require('../dbConnection');
const { Request, TYPES } = require('tedious');

const USER_ROLE_TABLE = '[dbo].[UserRole]';

const AddNewUserRole = function(UserRole, cb) {
    var connection = GetConnection();
    connection.connect((err) => {
        if (err) {
            console.log('connection err ' + err.message);
            throw err;
        }
        const sql = `
        INSERT INTO ${USER_ROLE_TABLE}
        ([UserId],[RoleId])
        VALUES
        ('${UserRole.userId}',
        '${UserRole.roleId}')`
        const request = new Request(sql, (err, rowCount) => {
            if(err) {
                console.log("error in adding user-role");
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

const GetAllUserRoles = function(cb) {  
    var connection = GetConnection();
    connection.connect((err) => {
        if (err) {
            console.log('connection err ' + err.message);
            throw err;
        }
        var _rows = [];

        const sql = `
        SELECT * FROM ${USER_ROLE_TABLE}
        `
        const request = new Request(sql, (err, rowCount, rows) => {
            if(err) {
                console.log("error in getting user-roles");
                cb({success: false, error: err.message})
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
            return cb(_rows);
        });
        
        connection.execSql(request);       
    }) 
               
}

const GetUserRoleById = function(id, callback) {
    var connection = GetConnection();
    connection.connect((err) => {
        if (err) {
            console.log('connection err ' + err.message);
            throw err;
        }
        var _rows = [];

        const sql = `
        SELECT * FROM ${USER_ROLE_TABLE} WHERE Id = @id
        `
        const request = new Request(sql, (err, rowCount, rows) => {
            if(err) {
                console.log("error in getting user-role by user-roleId");
                cb({success: false, error: err.message})
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
            return callback(_rows);
        });
        
        connection.execSql(request);       
    }) 
}

const GetAllUserRolesByUserId = function(id, callback) {
    var connection = GetConnection();
    connection.connect((err) => {
        if (err) {
            console.log('connection err ' + err.message);
            throw err;
        }
        var _rows = [];

        const sql = `
        SELECT * FROM ${USER_ROLE_TABLE} WHERE UserId = @id
        `
        const request = new Request(sql, (err, rowCount, rows) => {
            if(err) {
                console.log("error in getting user-roles by userid");
                callback({success: false, error: err.message})
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
            return callback(_rows);
        });
        
        connection.execSql(request);       
    }) 
}

const UpdateUserRoleById = function(id, userRole, callback) {

    var connection = GetConnection();
    connection.connect((err) => {
        if (err) {
            console.log('connection err ' + err.message);
            throw err;
        }
        const sql = `
        UPDATE ${USER_ROLE_TABLE} 
        SET UserId = @UserId, RoleId = @RoleId
        WHERE Id = @id
        `
        const request = new Request(sql, (err, rowCount, rows) => {
            if(err) {
                console.log("error in updating user");
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
        request.addParameter('UserId', TYPES.Int, userRole.userId);
        request.addParameter('RoleId', TYPES.Int, userRole.roleId);

     
        connection.execSql(request);       
    }) 
}

const DeleteUserRoleById = function(id, callback) {
    var connection = GetConnection();
    connection.connect((err) => {
        if (err) {
            console.log('connection err ' + err.message);
            throw err;
        }

        const sql = `
        DELETE FROM ${USER_ROLE_TABLE} WHERE Id = @id
        `
        const request = new Request(sql, (err, rowCount, rows) => {
            if(err) {
                console.log("error in deleting userRole by Id");
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

const DeleteUserRolesByUserId = function(id, callback) {
    var connection = GetConnection();
    connection.connect((err) => {
        if (err) {
            console.log('connection err ' + err.message);
            throw err;
        }

        const sql = `
        DELETE FROM ${USER_ROLE_TABLE} WHERE UserId = @id
        `
        const request = new Request(sql, (err, rowCount, rows) => {
            if(err) {
                console.log("error in deleting userRole by userId");
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

const UserRoleExists = function(userId, roleId, callback) {
    var connection = GetConnection();
    connection.connect((err) => {
        if (err) {
            console.log('connection err ' + err.message);
            throw err;
        }
        const sql = `
        SELECT * FROM ${USER_ROLE_TABLE} WHERE UserId = @UserId and RoleId = @RoleId
        `
        const request = new Request(sql, (err, rowCount, rows) => {
            if(err) {
                console.log("error in checking if userRole exists: " + err.message);
                //callback(false)
            }
            else
            {
                if(rowCount > 0)
                    callback(true)
                else
                    callback(false)
                connection.close();
            }
            
        });
        request.addParameter('UserId', TYPES.Int, userId);
        request.addParameter('RoleId', TYPES.Int, roleId);
     
        connection.execSql(request);       
    }) 
}

const UserRoleExistsById = function(id, callback) {
    var connection = GetConnection();
    connection.connect((err) => {
        if (err) {
            console.log('connection err ' + err.message);
            throw err;
        }
        const sql = `
        SELECT * FROM ${USER_ROLE_TABLE} WHERE Id = @Id
        `
        const request = new Request(sql, (err, rowCount, rows) => {
            if(err) {
                console.log("error in checking if userRole exists: " + err.message);
                callback(false)
            }
            else
            {
                if(rowCount > 0)
                    callback(true)
                else
                    callback(false)
                connection.close();
            }
            
        });
        request.addParameter('Id', TYPES.Int, id);

     
        connection.execSql(request);       
    }) 
}



module.exports.AddNewUserRole = AddNewUserRole;
module.exports.GetAllUserRoles = GetAllUserRoles;
module.exports.GetAllUserRolesByUserId = GetAllUserRolesByUserId;
module.exports.DeleteUserRolesByUserId = DeleteUserRolesByUserId;
module.exports.GetUserRoleById = GetUserRoleById;
module.exports.UpdateUserRoleById = UpdateUserRoleById;
module.exports.DeleteUserRoleById = DeleteUserRoleById;
module.exports.UserRoleExists = UserRoleExists;
module.exports.UserRoleExistsById = UserRoleExistsById;