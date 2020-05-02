function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName: firstName
        , familyName: familyName
        , title: title
        , payPerHour: payPerHour
        , timeInEvents: []
        , timeOutEvents: []
    }
}



function createEmployeeRecords(employees){
  let emplo = [];
  for(let i = 0;i<employees.length;i++){
    emplo.push(createEmployeeRecord(employees[i]));
  }
  return emplo;
}

function createTimeInEvent(employee, dateInfo){
  let date = dateInfo.split(" ");
  let time = date[1];
  let hour = parseInt(time)%100;
  let minutes = parseInt(time)-hour;
  let recordObject = {
    type: "TimeIn",
    hour: parseInt(time),
    date: date[0],
  };

  employee.timeInEvents.push(recordObject);

  return employee;
}

function createTimeOutEvent(employee, dateInfo){
  let date = dateInfo.split(" ");
  let time = date[1];
  let hour = parseInt(time)%100;
  let minutes = parseInt(time)-hour;
  let recordObject = {
    type: "TimeOut",
    hour: parseInt(time),
    date: date[0],
  };

  employee.timeOutEvents.push(recordObject);

  return employee;
}

function hoursWorkedOnDate(date){
  for (let i = 0; i < this.timeInEvents.length; i++) {
         if (this.timeInEvents[i].date === date && this.timeOutEvents[i].date === date) {
           return (this.timeOutEvents[i].hour - this.timeInEvents[i].hour)/100;
         }
     }

}
function wagesEarnedOnDate( date) {
  let hours = this.hoursWorkedOnDate(date);
  return hours * this.payPerHour;
}
function findEmployeeByFirstName(srcArray, firstName){
  for(let i = 0; i < srcArray.length; i++){
    if(srcArray[i].firstName === firstName){
      return srcArray[i];
    }
  }
  return undefined;
}
function calculatePayroll(srcArray){
  let sum = 0;
  for(let i = 0; i < srcArray.length; i++){
    for(let j = 0; j < srcArray[i].timeInEvents.length; j++){
      sum += wagesEarnedOnDate(srcArray[i], srcArray[i].timeInEvents[j].date);
    }
  }
  return sum;

}
let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}
