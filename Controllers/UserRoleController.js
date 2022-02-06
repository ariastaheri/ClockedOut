const {AddNewUserRole, GetAllUserRolesByUserId, GetAllUserRoles, GetUserRoleById, 
    UpdateUserRoleById, UserRoleExists, UserRoleExistsById, DeleteUserRoleById, DeleteUserRolesByUserId } = require('../DataAccessors/UserRoleDataAccessor');
const UserRole = require('../Models/UserRoleModel')

const GetUserRoles = function(callback) {
    GetAllUserRoles(result => {
        console.log(result);
        callback(result)
    })   
}

const GetUserRole = (id, callback) => {
    GetUserRoleById(id, result => {
        console.log(result);
        callback(result);
    })
}

const GetUserRolesByUserId = (id, callback) => {
    GetAllUserRolesByUserId(id, result => {
        console.log(result);
        callback(result)
    }) 
}

const AddUserRole = (body, callback) => {
    var IsComplete = CheckBodyForAllParams(body);
    if(IsComplete.output === true)
    {
        UserRoleExists(
            IsComplete.body.UserId, 
            IsComplete.body.RoleId, 
            exists => {
                if(!exists)
                {
                    const userRole = 
                        new UserRole(
                            IsComplete.body.UserId, 
                            IsComplete.body.RoleId
                            );
                    AddNewUserRole(userRole, result => {
                        console.log(result);
                        callback(result);
                    })
                }
                else {
                    callback({success: false, error: "User-Role Already Exists"})
                }
            })     
    }  
    else {
        callback({success: false, error: IsComplete.error})
    }    
}

const UpdateUserRoleByUserRoleId = (id, body, callback) => {   
    UserRoleExistsById(id, result => {
        if(!result)
            callback({success: false, message: "Id does not exist on the database"});
        else {
            GetUserRoleById(id, userRole => {
                var foundUserRole = userRole[0];
                var existingUserRole = 
                    new UserRole(
                        foundUserRole.UserId, 
                        foundUserRole.RoleId 
                        );
        
                existingUserRole.userId = (body.UserId == null) ? existingUser.userId : body.UserId; 
                existingUserRole.roleId = (body.RoleId == null) ? existingUser.roleId : body.RoleId;
        
                UpdateUserRoleById(id, existingUserRole, result => {
                    console.log(result);
                    callback(result);
                })
            });
        }
    })   
}

const DeleteUserRoleByUserRoleId = (id, callback) => {
    DeleteUserRoleById(id, result => {
        console.log(result);
        callback(result);
    })
}

const DeleteAllUserRolesByUserId = (id, callback) => {
    DeleteUserRolesByUserId(id, result => {
        console.log(result);
        callback(result);
    })
}



function CheckBodyForAllParams(body)
{
    let output = true;
    let errorMessage = '';
    
    if(!body.RoleId || !(typeof body.RoleId === "number"))
    {
        output = false;
        errorMessage += 'Missing RoleId or incorrect format... '
    }
    if(!body.UserId || !(typeof body.UserId === "number"))
    {
        output = false;
        errorMessage += 'Missing UserId or incorrect format... '
    }
 
    return { output: output, error: errorMessage, body: body };
}

module.exports.GetUserRoles = GetUserRoles;
module.exports.GetUserRolesByUserId = GetUserRolesByUserId;
module.exports.GetUserRole = GetUserRole;
module.exports.AddUserRole = AddUserRole;
module.exports.UpdateUserRoleByUserRoleId = UpdateUserRoleByUserRoleId;   
module.exports.DeleteUserRoleByUserRoleId = DeleteUserRoleByUserRoleId;   
module.exports.DeleteAllUserRolesByUserId = DeleteAllUserRolesByUserId;   
