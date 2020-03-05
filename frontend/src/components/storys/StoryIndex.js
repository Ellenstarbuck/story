import React from 'react'
import axios from 'axios'
import StoryCard from './StoryCard'

class StoryIndex extends React.Component {
  state = {
    storys: []
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/storys/')
      this.setState({ storys: res.data }) 
    } catch(err) {
      this.props.history.push('/notfound')
    }
  }

  render() {
    if (!this.state.storys.length) return null
    return(
      <>
      <div className="storyIndex">
      <section className="section">
        <div className="container is-primary">
          <div className="columns is-mobile is-multiline">
            {this.state.storys.map(story => <StoryCard key={story.id} {...story}/>)}
          </div>
          </div>
      </section>
      </div>
      </>
    )

    
  }
}



export default StoryIndex
