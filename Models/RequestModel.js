class UserRequest {
    constructor(UserId, RequestTypeId, StartDate, EndDate, StatusId){
        this.userId = UserId; 
        this.requestTypeId = RequestTypeId;
        this.startDate = StartDate;
        this.endDate = EndDate;
        this.statusId = StatusId;
    }
}

module.exports = UserRequest;
