import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'

class ProfileEdit extends React.Component {


  state = {
    data: {
      id: '',
      username: '',
      profile_image: '',
      bio: ''
    } 
  }

  async componentDidMount() {
    const profileId = this.props.match.params.id
    
    try {
      const res = await axios.get(`http://localhost:8000/profile/${profileId}/`)
      this.setState({ data: res.data })
      console.log(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  handleChange = ({ target: { name, value } }) => {
    const data = { ...this.state.data, [name]: value }
    console.log(data)
    this.setState({ data })
  }

  handleSubmit = async e => {
  e.preventDefault()
  const userId = this.state.data.id
  try {
      await axios.put(`http://localhost:8000/profile/${userId}/`,
      this.state.data, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      }) 
    this.props.history.push(`/profile`)
  } catch (err) {
    console.log(err)
  }
}

  render() {
    const { data } = this.state
    return(
        <div className="box" id="profileBox">
          <form onSubmit={this.handleSubmit} className="column is-mobile is-multiline">
            
            <section className="section" id="profileSection">
              <div className="level">
                <div className="level-left">
                  <div className="level-item">
                    <span className="icon is-large">
                      <i className="fas fa-3x fa-map-marked-alt"></i>
                    </span>
                    <div className="field">
                    <h2 className=" title is-3">&nbsp;{data.username}&apos;s profile</h2>
                    <div className="control">
                      <input 
                        className="input"
                        name="username"
                        required
                        placeholder="username"
                        onChange={this.handleChange}
                        value={data.username}
                      />
                    </div>
                    </div>
                    <span className="icon is-large">
                      <i className="fas fa-3x fa-map-marked-alt"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="box">
                <div className="field">
                  <h2 className="is-size-4">{data.profile_image}</h2>
                  <div className="control">
                      <input 
                        className="input"
                        name="profile_image"
                        required
                        placeholder="profile_image"
                        onChange={this.handleChange}
                        value={data.profile_image}
                      />
                    </div>
                </div>
                </div>
              </div>
              <hr />
              <div className="container">
                <div className="box">
                <div className="field">
                  <h2 className="is-size-4">Bio</h2>
                  <h2 className="is-size-4">{data.bio}</h2>
                  <div className="control">
                      <input 
                        className="input"
                        name="bio"
                        required
                        placeholder="bio"
                        onChange={this.handleChange}
                        value={data.bio}
                      />
                    </div>
                </div>
              </div>   
              </div>
              <button type="submit" className="button is-fullwidth is-warning">
            Update my profile!
          </button> 
                </section>
                </form>
                </div>  
    
    )

  }
  


}

export default ProfileEdit


