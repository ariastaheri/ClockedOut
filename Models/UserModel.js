class User {
    constructor(UserName, FirstName, LastName, Password, AllottedDatePerAnnum = 10, 
        AllowedSickDays = 5, RemainingDaysOff = 10, RemainingSickDays = 5, ManagerId){
        this.userName = UserName; 
        this.firstName = FirstName;
        this.lastName = LastName;      
        this.password = Password;      
        this.vacationDays = AllottedDatePerAnnum;      
        this.sickDays = AllowedSickDays;      
        this.remainingVacationDays = RemainingDaysOff;      
        this.remainingSickDays = RemainingSickDays;      
        this.managerId = ManagerId;      
    }
}

module.exports =  User;