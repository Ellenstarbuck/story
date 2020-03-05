import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../../lib/auth'

class Navbar extends React.Component {
  state = { navbarOpen: false }


  toggleNavbar = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen })
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ navbarOpen: false })
    }
  }

  handleLogout = () => {
    Auth.logout()
    this.props.history.push('/')
  }


  render() {
    const { navbarOpen } = this.state 
    return (
      <nav className="navbar is-danger">
        <div className="container">
          <div className="navbar-brand">
            <Link className="navbar-item"to="/">Home</Link>
            <Link className="navbar-item" to="/about">How does this work?</Link>
            <a className={`navbar-burger ${navbarOpen ? 'is-active' : ''}`} onClick={this.toggleNavbar}>
              <span></span>
              <span></span>
              <span></span>
            </a>
          </div>
          <div className={`navbar-menu ${navbarOpen ? 'is-active' : ''}`}>
            <div className="navbar-end">
              <Link className="navbar-item"to="/storys">The Storys</Link>
                <nav className="navbar is-danger" role="navigation" aria-label="dropdown navigation"> 
                <div className="navbar-item has-dropdown is-hoverable">
                  <div className="navbar-link">Types of Storys</div>
                  <div className="navbar-dropdown">
                    <Link className="navbar-item"to="/magic">Magic</Link>
                    <Link className="navbar-item"to="/spooky">Spooky</Link>
                    <Link className="navbar-item"to="/funny">Funny</Link>
                    <Link className="navbar-item"to="/cute">Cute</Link>
                    <Link className="navbar-item"to="/internet">Internet</Link>
                    <Link className="navbar-item"to="/space">Space</Link>
                  </div>
                </div> 
              </nav>
              {!Auth.isAuthenticated() && <Link className="navbar-item" to="/register">Register</Link>}
              {!Auth.isAuthenticated() && <Link className="navbar-item" to="/login">Login</Link>}
              {Auth.isAuthenticated() && <Link className="navbar-item" to="/storys/new">Add a Story</Link>}
              {Auth.isAuthenticated() && <Link className="navbar-item" to="/profile">View your profile</Link>}
              {Auth.isAuthenticated() && <a onClick={this.handleLogout} className="navbar-item">Logout</a>}
            </div>
          </div>
        </div>
      </nav>
    )
  }
}



export default withRouter(Navbar)








