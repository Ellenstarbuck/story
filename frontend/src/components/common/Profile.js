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

  handleDelete = async() => {
    const userId = this.state.data.id
    try {
      await axios.delete(`http://localhost:8000/profile/${userId}/`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.props.history.push('/storys')
    } catch (err) {
      console.log(err.response)
    }
  }
  
  

  render() {
    const { data } = this.state
    console.log(this.state.data.id)
    return (
      <div className="hero is-fullheight-with-navbar is-primary">
      <div className="profilebg">
      <section className="section">
      <div className="container">
        <div className="columns">
        <div className="column is-half is-offset-one-quarter">
                  <h2 className=" title is-3">&nbsp;{data.username}&apos;s profile</h2>
            <hr />
            <div className="container">
              <div className="box">
                <h2 className="is-size-4">Bio</h2>
                <h2 className="is-size-4">{data.bio}</h2>
                <div>&nbsp;</div> 
              </div>
            </div>
            <hr />
            <div className="container">
              <div className="box">
                <h2 className="is-size-4">Created Storys</h2>
                <div>&nbsp;</div> 
                </div>
              </div>
              <hr />
                <div className="container">
              <div className="box">
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
          
        </div>
      </div>
      </div>
      </section>
      </div>
      </div>
    )
  }

}

export default Profile