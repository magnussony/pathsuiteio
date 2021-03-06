import React from 'react'
import { Link } from 'react-router-dom'

// Represents the employee card on /employees
// Receives {employee}

const EmployeeCard = (props) => {
  return (
    <article className="bg-white shadow-md p-8 flex flex-col items-center rounded-lg text-center hover-card">
      <img
        src={`data:image/png;base64, ${props.employee.image}`}
        className="rounded-full w-24 h-24"
        alt="profile"
      />
      <h3 className="mt-5">
        {props.employee.firstName} {props.employee.lastName}
      </h3>
      <p>{props.employee.jobTitle}</p>
      <p className="mt-3">
        <i className="fas fa-chart-line mr-1"></i> {props.employee.paths.length} active paths
      </p>
      <Link to={`user?id=${props.employee._id}`} className="text-green hover:font-semibold mt-3">
        View profile
      </Link>
    </article>
  )
}

export default EmployeeCard
