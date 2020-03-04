import React from 'react'
import axios from 'axios'
import StoryCard from '../storys/StoryCard'


class Magic extends React.Component {

  state = { 
    storys: []
  }


  async componentDidMount() {
    try {
      const res = await axios.get('http://localhost:8000/storys') 
      console.log(res.data)
      const filteredRes = res.data.filter(story => {
        if (story.genre === 'Magic') {
          return story
        }
      })
      this.setState({ storys: filteredRes }) 
    } catch (err) {
      console.log(err)
    } 
  }
  

  render() {
    console.log('i am returning...', this.state.storys)
    return (
      <>
      <div className="box" id="storyShowBox">

      </div>
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

export default Magic
