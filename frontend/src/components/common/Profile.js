import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import StoryCard from '../storys/StoryCard'
import { Link } from 'react-router-dom'
import Collapsible from 'react-collapsible'

class Profile extends React.Component {

  state = {
    data: {
      id: '',
      first_name: '',
      last_name:'',    
      username: '',
      bio: '',
      storys: []
    } 
  }

  async componentDidMount() {
    const userId = this.state.data.id
    console.log(userId)
    try {
      const res = await axios.get(`/api/profile`, {
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
      await axios.delete(`/api/profile/${userId}/`, {
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
                  <h2 className="title is-3">&nbsp;{data.username}&apos;s profile</h2>
            <hr />
            <div className="container">
              <div className="box">
                <h2 className="is-size-4"><strong>A bit about you</strong></h2>
                <h2 className="is-size-5">My name is {data.first_name}&nbsp;{data.last_name} and {data.bio}</h2>
                <div>&nbsp;</div> 
              </div>
            </div>
            <hr />
            <div className="container">
              <div className="box">
            
                
                <h2 className="is-size-4"><strong>Created Storys</strong></h2> 

                <div className="box" id="boxBackground">
                  {data.storys && data.storys.length === 0 && 
            <p className="subtitle is-5" id='linkFont'><Link to="/storys/new">Make a story</Link></p>}
                  </div>
                {data.storys && data.storys.map(story => (
                    <StoryCard key={story.id} {...story} />
                    ))}  
                      
                    
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