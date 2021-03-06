import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import { logOut } from '../../../redux/actions/logInOut'
import { unsetUser } from '../../../redux/actions/unsetUser'
import Dropdown from './Dropdown'
import logo from '../../../images/logo.png'

// Represents the header
const Header = (props) => {
  // passed down to component to unsetUser and logOut when the logout is clicked
  const onLogOut = async () => {
    await axios.get('/api/logout')
    props.logOut()
    props.unsetUser()
  }

  return (
    <header className="shadow-md bg-white py-6 px-5">
      <div className="w-11/12 m-auto flex justify-between items-center xl:w-8/12">
        <Link to="/">
          <img src={logo} className="w-40" alt="logo" />
        </Link>

        <div className="flex items-center">
          {(props.isAdmin && (
            <Link to="/paths" className="mr-8 hover-underline font-semibold">
              <i className="fas fa-chart-line"></i> Paths
            </Link>
          )) || (
            <Link to={`user?id=${props.id}`} className="mr-8 hover-underline font-semibold">
              <i className="fas fa-chart-line"></i> Paths
            </Link>
          )}

          {/* Extra menu items if isAdmin */}
          {props.isAdmin && (
            <div>
              <Link to="/employees" className="mr-16 hover-underline font-semibold">
                <i className="fas fa-users"></i> Employees
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
            onLogOut={onLogOut}
          />
        </div>
      </div>
    </header>
  )
}

const mapStateToProps = (state) => {
  return {
    image: state.user.image,
    fullName: state.user.firstName + ' ' + state.user.lastName,
    email: state.user.email,
    isAdmin: state.user.isAdmin,
    id: state.user._id,
  }
}

export default connect(mapStateToProps, { logOut, unsetUser })(Header)
