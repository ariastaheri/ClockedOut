const {GetConnection} = require('../dbConnection');
const { Request, TYPES } = require('tedious');

const ROLE_TABLE = '[dbo].[Roles]';


const AddNewRole = function(Role, cb) {
    //console.log(Role);
    var connection = GetConnection();
    connection.connect((err) => {
        if (err) {
            console.log('connection err ' + err.message);
            throw err;
        }
        const sql = `
        INSERT INTO ${ROLE_TABLE}
        ([RoleName],[IsAdmin])
        VALUES
        ('${Role.roleName}',
        '${Role.isAdmin}')`
        const request = new Request(sql, (err, rowCount) => {
            if(err) {
                console.log("error in adding role");
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

const GetAllRoles = function(cb) {  
    var connection = GetConnection();
    connection.connect((err) => {
        if (err) {
            console.log('connection err ' + err.message);
            throw err;
        }
        var _rows = [];

        const sql = `
        SELECT * FROM ${ROLE_TABLE}
        `
        const request = new Request(sql, (err, rowCount, rows) => {
            if(err) {
                console.log("error in getting roles");
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

const GetRoleById = function(id, callback) {
    var connection = GetConnection();
    connection.connect((err) => {
        if (err) {
            console.log('connection err ' + err.message);
            throw err;
        }
        var _rows = [];

        const sql = `
        SELECT * FROM ${ROLE_TABLE} WHERE RoleId = @id
        `
        const request = new Request(sql, (err, rowCount, rows) => {
            if(err) {
                console.log("error in getting Role");
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


const UpdateRoleById = function(id, Role, callback) {

    var connection = GetConnection();
    connection.connect((err) => {
        if (err) {
            console.log('connection err ' + err.message);
            throw err;
        }
        const sql = `
        UPDATE ${ROLE_TABLE} 
        SET RoleName = @Rolename, 
            IsAdmin = @IsAdmin 
        WHERE RoleId = @id
        `
        const request = new Request(sql, (err, rowCount, rows) => {
            if(err) {
                console.log("error in updating Role");
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
        console.log(Role)
        request.addParameter('id', TYPES.Int, id);
        request.addParameter('Rolename', TYPES.NVarChar, Role.roleName);
        request.addParameter('IsAdmin', TYPES.Bit, Role.isAdmin);

     
        connection.execSql(request);       
    }) 
}

const DeleteRoleById = function(id, callback) {
    var connection = GetConnection();
    connection.connect((err) => {
        if (err) {
            console.log('connection err ' + err.message);
            throw err;
        }

        const sql = `
        DELETE FROM ${ROLE_TABLE} WHERE RoleId = @id
        `
        const request = new Request(sql, (err, rowCount, rows) => {
            if(err) {
                console.log("error in Deleting Role");
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

const RoleExists = function(id, callback) {
    var connection = GetConnection();
    connection.connect((err) => {
        if (err) {
            console.log('connection err ' + err.message);
            throw err;
        }
        const sql = `
        SELECT * FROM ${ROLE_TABLE} WHERE RoleId = @id
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


module.exports.AddNewRole = AddNewRole;
module.exports.GetAllRoles = GetAllRoles;
module.exports.GetRoleById = GetRoleById;
module.exports.UpdateRoleById = UpdateRoleById;
module.exports.DeleteRoleById = DeleteRoleById;
module.exports.RoleExists = RoleExists;