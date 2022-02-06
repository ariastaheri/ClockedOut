const {AddNewRequestType, GetAllRequestTypes,  GetRequestTypeById, 
    UpdateRequestTypeById, RequestTypeExists,
    DeleteRequestTypeById } = require('../DataAccessors/RequestTypeDataAccessor');
const RequestType = require('../Models/RequestTypeModel')

const GetRequestTypes = function(callback) {
    GetAllRequestTypes(result => {
        console.log(result);
        callback(result)
    })   
}

const GetRequestType = (id, callback) => {
    GetRequestTypeById(id, result => {
        console.log(result);
        callback(result);
    })
}

const AddRequestType = (body, callback) => {
    var IsComplete = CheckBodyForAllParams(body);
    if(IsComplete.output === true)
    {
        const requestType = 
        new RequestType(IsComplete.body.RequestType);

        AddNewRequestType(requestType, result => {
            console.log(result);
            callback(result);
        })    
    }  
    else {
        callback({success: false, error: IsComplete.error})
    }    
}

const UpdateRequestTypeByTypeId = (id, body, callback) => {   
    RequestTypeExists(id, result => {
        if(!result)
            callback({success: false, message: "Id does not exist on the database"});
        else {
            GetRequestTypeById(id, requestType => {
                var foundRequestType = requestType[0];
                var existingRequestType = 
                    new RequestType(foundRequestType.RequestType);
        
                    existingRequestType.requestType = (body.RequestType == null) ? existingRequestType.requestType : body.RequestType; 
        
                UpdateRequestTypeById(id, existingRequestType, result => {
                    console.log(result);
                    callback(result);
                })
            });
        }
    })   
}

const DeleteRequestTypeByTypeId = (id, callback) => {
    DeleteRequestTypeById(id, result => {
        console.log(result);
        callback(result);
    })
}

function CheckBodyForAllParams(body)
{
    let output = true;
    let errorMessage = '';
    
    if(!body.RequestType || !(typeof body.RequestType === "string"))
    {
        output = false;
        errorMessage += 'Missing RequestType or incorrect format... '
    }

    return { output: output, error: errorMessage, body: body };
}

module.exports.GetRequestTypes = GetRequestTypes;
module.exports.GetRequestType = GetRequestType;
module.exports.AddRequestType = AddRequestType;
module.exports.UpdateRequestTypeByTypeId = UpdateRequestTypeByTypeId;   
module.exports.DeleteRequestTypeByTypeId = DeleteRequestTypeByTypeId;   
  
