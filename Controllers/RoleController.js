const {AddNewRole, GetAllRoles, GetRoleById, UpdateRoleById, RoleExists, DeleteRoleById } = require('../DataAccessors/RoleDataAccessor');
const Role = require('../Models/RoleModel')


const GetRoles = function(callback) {
    GetAllRoles(result => {
        console.log(result);
        callback(result)
    })   
}

const GetRole = (id, callback) => {
    GetRoleById(id, result => {
        console.log(result);
        callback(result);
    })
}

const AddRole = (body, callback) => {
    var IsComplete = CheckBodyForAllParams(body);
    if(IsComplete.output === true)
    {
        const role = 
            new Role(
                IsComplete.body.RoleName, 
                IsComplete.body.IsAdmin              
                );
        AddNewRole(role, result => {
            console.log(result);
            callback(result);
        })
    }  
    else {
        callback({success: false, error: IsComplete.error})
    }    
}

const UpdateRoleByRoleId = (id, body, callback) => {
    
    RoleExists(id, result => {
        if(!result)
            callback({success: false, message: "RoleId does not exist on the database"});
        else {
            console.log("role exists");
            GetRoleById(id, role => {
                var foundRole = role[0];
                console.log(foundRole);
                var existingRole = 
                    new Role(
                            foundRole.RoleName,
                            foundRole.IsAdmin
                        );
                existingRole.roleName = (body.RoleName == null) ? existingRole.roleName : body.RoleName; 
                existingRole.isAdmin = (body.IsAdmin == null) ? existingRole.isAdmin : body.IsAdmin;
                console.log(existingRole);        
                UpdateRoleById(id, existingRole, result => {
                    console.log(result);
                    callback(result);
                })
            });
        }
    })   
}

const DeleteRoleByRoleId = (id, callback) => {
    DeleteRoleById(id, result => {
        console.log(result);
        callback(result);
    })
}

function CheckBodyForAllParams(body)
{
    let output = true;
    let errorMessage = '';
    console.log(!(typeof body.IsAdmin === "boolean"))
    
    if(!(body.RoleName) || !(typeof body.RoleName === "string"))
    {
        output = false;
        errorMessage += 'Missing RoleName or incorrect format... '
    }
    if(!(body.IsAdmin != null) || !(typeof body.IsAdmin === "boolean"))
    {
        output = false;
        errorMessage += 'Missing IsAdmin or incorrect format... '
    }
    
    return { output: output, error: errorMessage, body: body };
}

module.exports.GetRoles = GetRoles;
module.exports.GetRole = GetRole;
module.exports.AddRole = AddRole;
module.exports.UpdateRoleByRoleId = UpdateRoleByRoleId;   
module.exports.DeleteRoleByRoleId = DeleteRoleByRoleId;   