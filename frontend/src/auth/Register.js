import React from 'react'
import axios from 'axios'


class Register extends React.Component{

  state = {

    data: {
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      profile_image: '',
      bio: '',
      first_name: '',
      last_name: ''
    },
    errors: {}
  }
  

  handleChange = e => {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data })
  }

  handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:8000/register', this.state.data)
      this.props.history.push('/login')  
    } catch (err) {
      this.setState({ errors: err.response.data.errors })
      
    }
  }

  render() {
    return (
      <div className="hero is-fullheight-with-navbar is-primary">
        <div className="registerbg">
      <section className="section">
        <section className="container">
          <div className="columns">
            <form onSubmit={this.handleSubmit} 
              className="column is-half is-offset-one-quarter">
              <h2 className="title has-text-centered">Register</h2>
              <div className="field">
                <div className="label">First Name</div>
                <div className="control">
                  <input className={`input ${this.state.errors.first_name ? 'is-danger' : ''}`}
                    placeholder="first_name"
                    required
                    name="first name"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.first_name && <small className="help is-danger">{this.state.errors.first_name}</small>}
              </div>
              <div className="field">
                <div className="label">Last Name</div>
                <div className="control">
                  <input className={`input ${this.state.errors.last_name ? 'is-danger' : ''}`}
                    placeholder="Last Name"
                    required
                    name="last_name"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.last_name && <small className="help is-danger">{this.state.errors.last_name}</small>}
              </div>
              <div className="field">
                <div className="label">Username</div>
                <div className="control">
                  <input className={`input ${this.state.errors.username ? 'is-danger' : ''}`}
                    placeholder="Username"
                    required
                    name="username"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.username && <small className="help is-danger">{this.state.errors.username}</small>}
              </div>
              <div className="field">
                <div className="label">Email</div>
                <div className="control">
                  <input className={`input ${this.state.errors.email ? 'is-danger' : ''}`}
                    placeholder="Email"
                    name="email"
                    required
                    onChange={this.handleChange}
                  />    
                </div>
                {this.state.errors.email && <small className="help is-danger">{this.state.errors.email}</small>}
              </div>
              <div className="field">
                <div className="label">Password</div>
                <div className="control">
                  <input className={`input ${this.state.errors.password ? 'is-danger' : ''}`}
                    placeholder="Password"
                    type="password"
                    required
                    name="password"
                    onChange={this.handleChange}
                  />    
                </div>
                {this.state.errors.password && <small className="help is-danger">{this.state.errors.password}</small>}
              </div>
              <div className="field">
                <div className="label">Password Confirmation</div>
                <div className="control">
                  <input className={`input ${this.state.errors.password_confirmation ? 'is-danger' : ''}`}
                    placeholder="Password Confirmation"
                    type="password"
                    required
                    name="password_confirmation"
                    onChange={this.handleChange}
                  />    
                </div>
                {this.state.errors.password_confirmation && <small className="help is-danger">{this.state.errors.password_confirmation}</small>}
              </div>
              <div className="field">
                <div className="label">Picture of your favourite animal</div>
                <div className="control">
                  <input className={`input ${this.state.errors.profile_image ? 'is-danger' : ''}`}
                    placeholder="Profile Image"
                    name="profile_image"
                    onChange={this.handleChange}
                  />    
                </div>
                {this.state.errors.profile_image && <small className="help is-danger">{this.state.errors.profile_image}</small>}
              </div>
              <div className="field">
                <div className="label">About Me</div>
                <div className="control">
                  <input className={`input ${this.state.errors.bio ? 'is-danger' : ''}`}
                    placeholder="A bit about me"
                    name="bio"
                    onChange={this.handleChange}
                  />    
                </div>
                {this.state.errors.bio && <small className="help is-danger">{this.state.errors.bio}</small>}
              </div>
              <button type="submit" className="button is fullwidth is-warning">Register Me!</button>
            </form>
          </div>
        </section>
      </section>
      </div>
      </div>
    )
  }
}

export default Register