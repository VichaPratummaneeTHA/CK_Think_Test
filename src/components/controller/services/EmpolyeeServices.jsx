const KEYS = {
  employeesId: 'employeesId',
  employees: 'employees'
}

export const getDepartmentCollection = () => ( [
  {id: '1', title: 'Development'},
  {id: '2', title: 'Finance'},
  {id: '3', title: 'Information teachnology'},
  {id: '4', title: 'Ticketing'},
])
 
export const insertEmployee = (data) => {

    let employees = getAllEmployees()
    data['id'] = generateEmployeeId()
    employees.push(data)
    localStorage.setItem(KEYS.employees, JSON.stringify(employees))
    
}

export const updateEmployee = (data) => {

    let employees = getAllEmployees()
    let recordIndex = employees.findIndex(emp => emp.id === data.id)

    employees[recordIndex] = {...data}
    localStorage.setItem(KEYS.employees, JSON.stringify(employees))
}

export const deleteEmployee = (id) => {

    let employees = getAllEmployees()
    employees = employees.filter(emp => emp.id !== id)

    localStorage.setItem(KEYS.employees, JSON.stringify(employees))
}

export const generateEmployeeId = () => {
  if(localStorage.getItem(KEYS.employeesId) === null){
    localStorage.setItem(KEYS.employeesId, '0')
  }
  var id = parseInt(localStorage.getItem(KEYS.employeesId))
  localStorage.setItem(KEYS.employeesId, (++id).toString())

  return id;
}

export const getAllEmployees = () => {
  if(localStorage.getItem(KEYS.employees) === null){
    localStorage.setItem(KEYS.employees, JSON.stringify([]))
  }
  var employees = JSON.parse(localStorage.getItem(KEYS.employees))
  //map departmentId to department title
  var departments = getDepartmentCollection();
  employees = employees.map(emp => ({
        ...emp,
        department : departments[emp.departmentId-1].title
      }))
  return employees;
}