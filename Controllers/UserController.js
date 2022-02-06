const {AddNewUser, GetAllUsers, GetUserById, UpdateUserById, UserExists, DeleteUserById } = require('../DataAccessors/UserDataAccessor');
const User = require('../Models/UserModel')

const GetUsers = function(callback) {
    GetAllUsers(result => {
        console.log(result);
        callback(result)
    })   
}

const GetUser = (id, callback) => {
    GetUserById(id, result => {
        console.log(result);
        callback(result);
    })
}

const AddUser = (body, callback) => {
    var IsComplete = CheckBodyForAllParams(body);
    if(IsComplete.output === true)
    {
        const user = 
            new User(
                IsComplete.body.UserName, 
                IsComplete.body.FirstName, 
                IsComplete.body.LastName, 
                IsComplete.body.Password, 
                IsComplete.body.AllottedDatePerAnnum, 
                IsComplete.body.AllowedSickDays, 
                IsComplete.body.RemainingDaysOff, 
                IsComplete.body.RemainingSickDays, 
                IsComplete.body.ManagerId, 
                );
        AddNewUser(user, result => {
            console.log(result);
            callback(result);
        })
    }  
    else {
        callback({success: false, error: IsComplete.error})
    }    
}

const UpdateUserByUserId = (id, body, callback) => {
    
    UserExists(id, result => {
        if(!result)
            callback({success: false, message: "UserId does not exist on the database"});
        else {
            GetUserById(id, user => {
                var foundUser = user[0];
                var existingUser = 
                    new User(
                        foundUser.UserName, 
                        foundUser.FirstName, 
                        foundUser.LastName, 
                        foundUser.Password, 
                        foundUser.AllottedDatePerAnnum, 
                        foundUser.AllowedSickDays, 
                        foundUser.RemainingDaysOff, 
                        foundUser.RemainingSickDays, 
                        foundUser.ManagerId, 
                        );
                existingUser.lastLoginDate = foundUser.LastLoginDate;
        
                existingUser.userName = (body.UserName == null) ? existingUser.userName : body.UserName; 
                existingUser.firstName = (body.FirstName == null) ? existingUser.firstName : body.FirstName;
                existingUser.lastName = (body.LastName == null) ? existingUser.lastName : body.LastName;      
                existingUser.password = (body.Password == null) ? existingUser.password : body.Password;      
                existingUser.vacationDays = (body.AllottedDatePerAnnum == null) ? existingUser.vacationDays : body.AllottedDatePerAnnum;      
                existingUser.sickDays = (body.AllowedSickDays == null) ? existingUser.sickDays : body.AllowedSickDays;      
                existingUser.remainingVacationDays = (body.RemainingDaysOff == null) ? existingUser.remainingVacationDays : body.RemainingDaysOff;      
                existingUser.remainingSickDays = (body.RemainingSickDays == null) ? existingUser.remainingSickDays : body.RemainingSickDays;      
                existingUser.managerId = (body.ManagerId == null) ? existingUser.managerId : body.ManagerId;
                existingUser.lastLoginDate = (body.LastLoginDate == null) ? existingUser.lastLoginDate : body.LastLoginDate;
                
        
                UpdateUserById(id, existingUser, result => {
                    console.log(result);
                    callback(result);
                })
            });
        }
    })   
}

const DeleteUserByUserId = (id, callback) => {
    DeleteUserById(id, result => {
        console.log(result);
        callback(result);
    })
}

function CheckBodyForAllParams(body)
{
    let output = true;
    let errorMessage = '';
    
    if(!body.UserName || !(typeof body.UserName === "string"))
    {
        output = false;
        errorMessage += 'Missing UserName or incorrect format... '
    }
    if(!body.FirstName || !(typeof body.FirstName === "string"))
    {
        output = false;
        errorMessage += 'Missing FirstName or incorrect format... '
    }
    if(!body.LastName || !(typeof body.LastName === "string"))
    {
        output = false;
        errorMessage += 'Missing LastName or incorrect format... '
    }
    if(!body.Password || !(typeof body.Password === "string"))
    {
        output = false;
        errorMessage += 'Missing Password or incorrect format... '
    }
    if(!body.ManagerId || !(typeof body.ManagerId === "number"))
    {
        output = false;
        errorMessage += 'Missing ManagerId or incorrect format... '
    }
    if(!body.AllottedDatePerAnnum) 
    {
        body.AllottedDatePerAnnum = 10
    }
    if(body.AllottedDatePerAnnum && !(typeof body.AllottedDatePerAnnum === "number")){
        output = false;
        errorMessage += 'AllottedDatePerAnnum must be an integer... '
    }
    if(!body.AllowedSickDays)
    {
        body.AllowedSickDays = 5
    }
    if(body.AllowedSickDays && !(typeof body.AllowedSickDays === "number")){
        output = false;
        errorMessage += 'AllowedSickDays must be an integer... '
    }  
    if(!body.RemainingDaysOff)
    {
        body.RemainingDaysOff = 10
    }
    if(body.RemainingDaysOff && !(typeof body.RemainingDaysOff === "number")){
        output = false;
        errorMessage += 'RemainingDaysOff must be an integer... '
    }       
    if(!body.RemainingSickDays)
    {
        body.RemainingDaysOff = 10
    }
    if(body.RemainingSickDays && !(typeof body.RemainingSickDays === "number")){
        output = false;
        errorMessage += 'RemainingSickDays must be an integer... '
    }   
    return { output: output, error: errorMessage, body: body };
}

module.exports.GetUsers = GetUsers;
module.exports.GetUser = GetUser;
module.exports.AddUser = AddUser;
module.exports.UpdateUserByUserId = UpdateUserByUserId;   
module.exports.DeleteUserByUserId = DeleteUserByUserId;   
