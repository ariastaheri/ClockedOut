const {GetConnection} = require('../dbConnection');
const { Request, TYPES } = require('tedious');

const USER_TABLE = '[dbo].[Users]';

const AddNewUser = function(User, cb) {
    //console.log(User);
    var connection = GetConnection();
    connection.connect((err) => {
        if (err) {
            console.log('connection err ' + err.message);
            throw err;
        }
        const sql = `
        INSERT INTO ${USER_TABLE}
        ([UserName],[FirstName],[LastName],[Password],[AllottedDatePerAnnum]
        ,[AllowedSickDays][RemainingDaysOff],[RemainingSickDays],[ManagerId])
        VALUES
        ('${User.userName}',
        '${User.firstName}',
        '${User.lastName}',
        '${User.password}',
        '${User.vacationDays}',
        '${User.sickDays}',
        '${User.remainingVacationDays}',
        '${User.remainingSickDays}',
        '${User.managerId}')`
        const request = new Request(sql, (err, rowCount) => {
            if(err) {
                console.log("error in adding user");
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

const GetAllUsers = function(cb) {  
    var connection = GetConnection();
    connection.connect((err) => {
        if (err) {
            console.log('connection err ' + err.message);
            throw err;
        }
        var _rows = [];

        const sql = `
        SELECT * FROM ${USER_TABLE}
        `
        const request = new Request(sql, (err, rowCount, rows) => {
            if(err) {
                console.log("error in getting users");
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

const GetUserById = function(id, callback) {
    var connection = GetConnection();
    connection.connect((err) => {
        if (err) {
            console.log('connection err ' + err.message);
            throw err;
        }
        var _rows = [];

        const sql = `
        SELECT * FROM ${USER_TABLE} WHERE UserId = @id
        `
        const request = new Request(sql, (err, rowCount, rows) => {
            if(err) {
                console.log("error in getting user");
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


const UpdateUserById = function(id, user, callback) {

    var connection = GetConnection();
    connection.connect((err) => {
        if (err) {
            console.log('connection err ' + err.message);
            throw err;
        }
        const sql = `
        UPDATE ${USER_TABLE} 
        SET UserName = @Username, FirstName = @Firstname, LastName = @Lastname,
            Password = @Password, LastLoginDate = @LastLoginDate,
            AllottedDatePerAnnum = @VacationDays, AllowedSickDays = @sickDays,
            RemainingDaysOff = @RemaningDaysOff, RemainingSickDays = @RemainingSickDays,
            ManagerId = @Managerid 
        WHERE UserId = @id
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
        console.log(user)
        request.addParameter('id', TYPES.Int, id);
        request.addParameter('Username', TYPES.NVarChar, user.userName);
        request.addParameter('Firstname', TYPES.NVarChar, user.firstName);
        request.addParameter('Lastname', TYPES.NVarChar, user.lastName);
        request.addParameter('Password', TYPES.NVarChar, user.password);
        request.addParameter('LastLoginDate', TYPES.DateTime, user.lastLoginDate);
        request.addParameter('VacationDays', TYPES.Int, user.vacationDays);
        request.addParameter('sickDays', TYPES.Int, user.sickDays);
        request.addParameter('RemaningDaysOff', TYPES.Int, user.remainingVacationDays);
        request.addParameter('RemainingSickDays', TYPES.Int, user.remainingSickDays);
        request.addParameter('Managerid', TYPES.Int, user.managerId);
     
        connection.execSql(request);       
    }) 
}

const DeleteUserById = function(id, callback) {
    var connection = GetConnection();
    connection.connect((err) => {
        if (err) {
            console.log('connection err ' + err.message);
            throw err;
        }

        const sql = `
        DELETE FROM ${USER_TABLE} WHERE UserId = @id
        `
        const request = new Request(sql, (err, rowCount, rows) => {
            if(err) {
                console.log("error in getting user");
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

const UserExists = function(id, callback) {
    var connection = GetConnection();
    connection.connect((err) => {
        if (err) {
            console.log('connection err ' + err.message);
            throw err;
        }
        const sql = `
        SELECT * FROM ${USER_TABLE} WHERE UserId = @id
        `
        const request = new Request(sql, (err, rowCount, rows) => {
            if(err) {
                console.log("error in getting users");
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


module.exports.AddNewUser = AddNewUser;
module.exports.GetAllUsers = GetAllUsers;
module.exports.GetUserById = GetUserById;
module.exports.UpdateUserById = UpdateUserById;
module.exports.DeleteUserById = DeleteUserById;
module.exports.UserExists = UserExists;