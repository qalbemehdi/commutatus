export function generateRandomID() {
    const timestamp = Date.now().toString(36);
    const randomNum = Math.random().toString(36).substr(2, 5);
    return `${timestamp}-${randomNum}`;
}

export function filterPositionsByLevelAndDepartment(level, department, execution, positionsByDepartment) {
    const levelPositions = execution[level] || [];
    const departmentPositions = positionsByDepartment[department] || [];
    return levelPositions.filter(position => departmentPositions.includes(position));
}

export function getDepartmentById(company_data, departmentId) {
    return company_data?.departments?.find(department => department.id === parseInt(departmentId));
}

export function findTeamByName(teams, teamName) {
    return teams.find(team => team.name === teamName);
}

export function filterTeamLeads(employees, department) {
    return employees?.filter(emp => emp.level === 2).filter(emp => emp.department === department);
}

export function filterEmployeesByDepartment(employees, department, teamLead) {
    return employees?.filter(emp => emp.department === department && emp.level !== 1 && emp.employee_id !== teamLead);
}

export function getEmployee(employees, employee_id) {
    return employees.filter(employee => employee.employee_id === employee_id);
}

export function getTeamByTeamLead(teams, teamId) {
    return teams.find(team => team.team_lead === teamId);
}

export function findTeamByEmployeeId(teams, employeeId) {
    return teams.find(team => team.team_members.includes(employeeId));
}