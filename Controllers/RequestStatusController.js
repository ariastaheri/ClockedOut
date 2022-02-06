const {AddNewRequestStatus, GetAllRequestStatuses,  GetRequestStatusById, 
    UpdateRequestStatusById, RequestStatusExists, GetRequestStatusByName,
    DeleteRequestStatusById } = require('../DataAccessors/RequestStatusDataAccessor');
const RequestStatus = require('../Models/RequestStatusModel')

const GetRequestStatuses = function(callback) {
    GetAllRequestStatuses(result => {
        console.log(result);
        callback(result)
    })   
}

const GetRequestStatus = (id, callback) => {
    GetRequestStatusById(id, result => {
        console.log(result);
        callback(result);
    })
}

const GetRequestStatusWithName = (status, callback) => {
    GetRequestStatusByName(status, result => {
        console.log(result);
        callback(result);
    })
}

const AddRequestStatus = (body, callback) => {
    var IsComplete = CheckBodyForAllParams(body);
    if(IsComplete.output === true)
    {
        const requestStatus = new RequestStatus(IsComplete.body.RequestStatus);

        AddNewRequestStatus(requestStatus, result => {
            console.log(result);
            callback(result);
        })    
    }  
    else {
        callback({success: false, error: IsComplete.error})
    }    
}

const UpdateRequestStatusByStatusId = (id, body, callback) => {   
    RequestStatusExists(id, result => {
        if(!result)
            callback({success: false, message: "Id does not exist on the database"});
        else {
            GetRequestStatusById(id, requestStatus => {
                var foundRequestStatus = requestStatus[0];
                var existingRequestStatus = 
                    new RequestStatus(foundRequestStatus.StatusName);
        
                    existingRequestStatus.requestStatus = (body.RequestStatus == null) ? existingRequestStatus.requestStatus : body.RequestStatus; 
        
                UpdateRequestStatusById(id, existingRequestStatus, result => {
                    console.log(result);
                    callback(result);
                })
            });
        }
    })   
}

const DeleteRequestStatusByStatusId = (id, callback) => {
    DeleteRequestStatusById(id, result => {
        console.log(result);
        callback(result);
    })
}

function CheckBodyForAllParams(body)
{
    let output = true;
    let errorMessage = '';
    
    if(!body.RequestStatus || !(typeof body.RequestStatus === "string"))
    {
        output = false;
        errorMessage += 'Missing RequestStatus or incorrect format... '
    }

    return { output: output, error: errorMessage, body: body };
}

module.exports.GetRequestStatuses = GetRequestStatuses; 
module.exports.GetRequestStatusWithName = GetRequestStatusWithName; 
module.exports.GetRequestStatus = GetRequestStatus;
module.exports.AddRequestStatus = AddRequestStatus;
module.exports.UpdateRequestStatusByStatusId = UpdateRequestStatusByStatusId;   
module.exports.DeleteRequestStatusByStatusId = DeleteRequestStatusByStatusId;   
  
