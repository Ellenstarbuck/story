import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import StoryCard from '../storys/StoryCard'
import { Link } from 'react-router-dom'

class Profile extends React.Component {

  state = {
    data: {
      id: '',
      username: '',
      profile_image: '',
      bio: '',
      storys: []
    } 
  }

  async componentDidMount() {
    const userId = this.state.data.id
    console.log(userId)
    try {
      const res = await axios.get(`http://localhost:8000/profile`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      console.log('hey')
      this.setState({ data: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  
  

  render() {
    const { data } = this.state
    console.log(this.state.data.id)
    return (
      
      <div className="box" id="profileBox" className="hero is-fullheight-with-navbar is-primary">
        <div className="column is-mobile is-multiline">
          <section className="section" id="profileSection" className='profilebg'>
            <div className="level">
              <div className="level-left">
                <div className="level-item">
                  <span className="icon is-large">
                    <i className="fas fa-3x fa-map-marked-alt"></i>
                  </span>
                  <h2 className=" title is-3">&nbsp;{data.username}&apos;s profile</h2>
                  <div>&nbsp;</div>
                  <div>&nbsp;</div>
                  <span className="icon is-large">
                    <i className="fas fa-3x fa-map-marked-alt"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="box">
                <h2 className="is-size-4">{data.profile_image}</h2>
              </div>
            </div>
            <hr />
            <div className="container">
              <div className="box">
                <h2 className="is-size-4">Bio</h2>
                <h2 className="is-size-4">{data.bio}</h2>
                <div>&nbsp;</div> 
                <div className="columns is-mobile is-multiline">
                  {/* {profile.likedTrails && profile.likedTrails.length === 0 && 
            <p className="subtitle is-5">&nbsp;&nbsp;You have not saved any trails yet!</p>}
                  {profile.likedTrails && profile.likedTrails.map(trail => (
                    <TrailCard key={trail._id} {...trail} />
                  ))} */}
                </div>
              </div>
            </div>
            <div className="container">
              <div className="box">
                <h2 className="is-size-4">Created Storys</h2>
                 <div className="columns is-mobile is-multiline">
                  {data.storys && data.storys.length === 0 && 
            <p className="subtitle is-5"><Link to="/storys/new">Make a story</Link></p>}
                {data.storys && data.storys.map(story => (
                    <StoryCard key={story.id} {...story} />
                    ))}    
                </div>
              </div>
            </div>
            <hr />
                <Link to={`/profile/${data.id}/edit`} className="button is-warning">Edit Profile</Link>
                  <button onClick={this.handleDelete} className="button is-danger">Delete Profile</button>
          </section>
        </div>
      </div>
    )
  }

}

export default Profile