import employeesData from '../data/data.json' with { type: 'json' }

function extractRoleFromUrl(url) {
    const pathParts = url.split('/')
    return pathParts[1] || null
}

function findEmployeeByRole(role) {
    if (!role) return null

    const employees = employeesData[0]

    if (employees.hasOwnProperty(role)) {
        const firstLetter = role.charAt(0)
        const otherLetters = role.substring(1)
        const roleWithUpperLetter = firstLetter.toUpperCase() + otherLetters
        return `${roleWithUpperLetter}: ${employees[role]}`
    }

    return null
}

export function getEmployeeNameByUrl(url) {
    const role = extractRoleFromUrl(url)
    return findEmployeeByRole(role)
}
