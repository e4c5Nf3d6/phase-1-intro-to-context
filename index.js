function createEmployeeRecord(employeeArray) {
    return {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

function createEmployeeRecords(employeesArray) {
    return employeesArray.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(employeeRecord, dateStamp) {
    const timeInEvent = {
        type: "TimeIn",
        hour: parseInt(dateStamp.split(' ')[1]),
        date: dateStamp.split(' ')[0]
    }
    employeeRecord.timeInEvents.push(timeInEvent)
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    const timeOutEvent = {
        type: "TimeOut",
        hour: parseInt(dateStamp.split(' ')[1]),
        date: dateStamp.split(' ')[0]
    }
    employeeRecord.timeOutEvents.push(timeOutEvent)
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, dateStamp) {
    let timeIn = employeeRecord.timeInEvents.find(event => event.date === dateStamp).hour
    let timeOut = employeeRecord.timeOutEvents.find(event => event.date ===dateStamp).hour

    return (timeOut - timeIn) / 100
}

function wagesEarnedOnDate(employeeRecord, dateStamp) {
    return employeeRecord.payPerHour * hoursWorkedOnDate(employeeRecord, dateStamp)
}

function allWagesFor (employeeRecord) {
    let allDates = employeeRecord.timeInEvents.map(event => event.date)

    return allDates.reduce((total, date) => {
        return total + wagesEarnedOnDate(employeeRecord, date)
    }, 0) 
}

function calculatePayroll(employeesArray) {
    return employeesArray.reduce((total, employee) => {
        return total + allWagesFor(employee)
    }, 0) 
}

