const {AddNewRequest, GetAllRequests,  GetRequestById, 
    UpdateRequestById, RequestExists, DeleteRequestById } = require('../DataAccessors/RequestDataAccessor');
const UserRequest = require('../Models/RequestModel')

const GetRequests = function(callback) {
    GetAllRequests(result => {
        console.log(result);
        callback(result)
    })   
}

const GetRequest = (id, callback) => {
    GetRequestById(id, result => {
        console.log(result);
        callback(result);
    })
}

const AddRequest = (body, callback) => {
    var IsComplete = CheckBodyForAllParams(body);
    if(IsComplete.output === true)
    {
        const userRequest = new UserRequest
                (IsComplete.body.UserId,
                IsComplete.body.RequestTypeId,
                IsComplete.body.StartDate,
                IsComplete.body.EndDate,
                IsComplete.body.StatusId);

        AddNewRequest(userRequest, result => {
            console.log(result);
            callback(result);
        })    
    }  
    else {
        callback({success: false, error: IsComplete.error})
    }    
}

const UpdateRequestByRequestId = (id, body, callback) => {   
    RequestExists(id, result => {
        if(!result)
            callback({success: false, message: "Id does not exist on the database"});
        else {
            GetRequestById(id, userRequest => {
                var foundUserRequest = userRequest[0];
                var existingUserRequest = 
                    new UserRequest(foundUserRequest.UserId,
                        foundUserRequest.RequestTypeId,
                        foundUserRequest.StartDate,
                        foundUserRequest.EndDate,
                        foundUserRequest.StatusId);
        
                    existingUserRequest.userId = (body.UserId == null) ? existingUserRequest.userId : body.UserId; 
                    existingUserRequest.requestTypeId = (body.RequestTypeId == null) ? existingUserRequest.requestTypeId : body.RequestTypeId; 
                    existingUserRequest.startDate = (body.StartDate == null) ? existingUserRequest.startDate : body.StartDate; 
                    existingUserRequest.endDate = (body.EndDate == null) ? existingUserRequest.endDate : body.EndDate; 
                    existingUserRequest.statusId = (body.StatusId == null) ? existingUserRequest.statusId : body.StatusId; 
        
                    UpdateRequestById(id, existingUserRequest, result => {
                    console.log(result);
                    callback(result);
                })
            });
        }
    })   
}

const DeleteRequestByRequestId = (id, callback) => {
    DeleteRequestById(id, result => {
        console.log(result);
        callback(result);
    })
}

function CheckBodyForAllParams(body)
{
    let output = true;
    let errorMessage = '';
    
    if(!body.UserId || !(typeof body.UserId === "number"))
    {
        output = false;
        errorMessage += 'Missing UserId or incorrect format... '
    }
    if(!body.RequestTypeId || !(typeof body.RequestTypeId === "number"))
    {
        output = false;
        errorMessage += 'Missing RequestTypeId or incorrect format... '
    }
    if(!body.StartDate || !(typeof body.StartDate === "string"))
    {
        output = false;
        errorMessage += 'Missing StartDate or incorrect format... '
    }
    if(!body.EndDate || !(typeof body.EndDate === "string"))
    {
        output = false;
        errorMessage += 'Missing EndDate or incorrect format... '
    }
    if(!body.StatusId || !(typeof body.StatusId === "number"))
    {
        output = false;
        errorMessage += 'Missing StatusId or incorrect format... '
    }

    return { output: output, error: errorMessage, body: body };
}

module.exports.GetRequests = GetRequests; 
module.exports.GetRequest = GetRequest;
module.exports.AddRequest = AddRequest;
module.exports.UpdateRequestByRequestId = UpdateRequestByRequestId;   
module.exports.DeleteRequestByRequestId = DeleteRequestByRequestId;   
  
