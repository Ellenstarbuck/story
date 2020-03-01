import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Auth from '../../lib/auth'

class StoryShow extends React.Component{
  
  state = {
    story: null
  }

  async componentDidMount() {
    const storyId = this.props.match.params.id
    try {
      const res = await axios.get(`http://localhost:8000/storys/${storyId}`)
      this.setState({ story: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  handleDelete = async() => {
    const storyId = this.props.match.params.id 
    try {
      await axios.delete(`http://localhost:8000/storys/${storyId}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.props.history.push('/story')
    } catch (err) {
      console.log(err.response)
    }
  }

  
  isOwner = () => {
    return Auth.getPayLoad().sub === this.state.story.owner.id
  }

  render() {
    const { story } = this.state
    if (!story) return null
    return (
      <section className="section">
        <div className="container">
          <div className="colums">
            <div className="displayNice">
              <div className="column is-one-third">
                <figure className="image">
                  <img src={story.image} alt={story.title} />
                </figure>
              </div>
              <div className="column is-one-third">
                <h2 className="title">{story.title}</h2>
                <h4 className="title-is-4">Writer</h4>
                {story.owner.username}
                <br />
                <h4 className="title-is-4">Age-rating</h4>
                <p>{story.age_rating}</p>
                <br />
                <h4 className="title-is-4">Genre</h4>
                {story.genre}
                <br />
                <h4 className="title-is-4">First Line</h4>
                <p>{story.lineStart}</p>
                <br />
                {this.isOwner() && 
                <>
                  <Link to={`/storys/${story.id}/edit`} className="button is-warning">Edit Story</Link>
                  <hr />
                  <button onClick={this.handleDelete} className="button is-danger">Delete Story</button>
                </>
                }
    
              </div>
            </div>
          <div/>
        </div>
      </div>
    </section>
    )
  }
}

export default StoryShow