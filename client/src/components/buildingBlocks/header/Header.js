import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { logOut } from '../../../redux/actions/logInOut'
import { unsetUser } from '../../../redux/actions/unsetUser'

import Dropdown from './Dropdown'
import logo from '../../../images/logo.png'

const Header = (props) => {
  return (
    <div className="shadow-md bg-white py-6 px-5">
      <div className="w-8/12 m-auto flex justify-between items-center">
        <Link to="/">
          <img src={logo} className="w-40" alt="logo" />
        </Link>

        <div className="flex items-center">
          <Link to="/paths" className="mr-8 hover-blue font-semibold">
            <i className="fas fa-chart-line"></i> Paths
          </Link>

          {/* Extra menu items if isAdmin */}
          {props.isAdmin && (
            <div>
              <Link to="/employees" className="mr-8 hover-blue font-semibold">
                <i className="fas fa-users"></i> Employees
              </Link>
              <Link to="/reports" className="mr-16 hover-blue font-semibold">
                <i className="fas fa-chart-pie"></i> Reports
              </Link>
              <Link to="#" className="btn btn-green px-5 py-2 mr-8">
                Upgrade now
              </Link>
            </div>
          )}

          {/* Dropdown component */}
          <Dropdown
            image={props.image}
            fullName={props.fullName}
            email={props.email}
            isAdmin={props.isAdmin}
          />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    image: state.user.image,
    fullName: state.user.firstName + ' ' + state.user.lastName,
    email: state.user.email,
    isAdmin: state.user.isAdmin,
  }
}

export default connect(mapStateToProps, { logOut, unsetUser })(Header)
