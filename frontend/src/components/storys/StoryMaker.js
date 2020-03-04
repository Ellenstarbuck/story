import React from 'react'


class StoryMaker extends React.Component {

  state = {
    data: {
      beginning: '',
      middle: '',
      end: '',
    } 
  }

    beginningArray = ['a spooky boot', 'an alien making dinner', 'your favourite food', 'a giant mouse', 'your favourite singer', 'your favourite film', 'a forgetful otter', 'a unexpected telephone call', 'a scary dream', 'a secret door', 'your best friend', 'a secret loft', 'squirrels taking over the world', 'being a pop star', 'dancing in the rain']

    handleClick = e => {
      e.preventDefault()
      const beginning = this.beginningArray[Math.floor(Math.random() * this.beginningArray.length)]
      this.setState({ beginning }) 
      
    }

    middleArray = ['a spooky boot', 'an alien making dinner', 'your favourite food', 'a giant mouse', 'your favourite singer', 'your favourite film', 'a forgetful otter', 'a unexpected telephone call', 'a scary dream', 'a secret door', 'your best friend', 'a secret loft', 'squirrels taking over the world', 'being a pop star', 'dancing in the rain']

    handleClick2 = e => {
      e.preventDefault()
      const middle = this.middleArray[Math.floor(Math.random() * this.middleArray.length)]
      this.setState({ middle }) 
      
    }

    endArray = ['a spooky boot', 'an alien making dinner', 'your favourite food', 'a giant mouse', 'your favourite singer', 'your favourite film', 'a forgetful otter', 'a unexpected telephone call', 'a scary dream', 'a secret door', 'your best friend', 'a secret loft', 'squirrels taking over the world', 'being a pop star', 'dancing in the rain']

    handleClick3 = e => {
      e.preventDefault()
      const end = this.endArray[Math.floor(Math.random() * this.endArray.length)]
      this.setState({ end }) 
      
    }

  render() {
    return(

      <div className="columns">
      <form className="column is-half is-offset-one-quarter">
      <div className="field">
      <label className="label">Once upon a time there lived a {this.state.beginning}</label>
            <button onClick={this.handleClick} className="button">click</button>
            
      </div> 
      <div className="field">
            <label className="label">who {this.state.middle}</label>
            <button onClick={this.handleClick2} className="button">click</button>
            
      </div>  
      <div className="field">
            <label className="label">And then they {this.state.end}</label>
            <button onClick={this.handleClick3} className="button">click</button> 

            <h4>{this.state.beginning} {this.state.middle} {this.state.end}</h4>
            
      </div>       
      </form>
      </div>
      


    )
  }
}

export default StoryMaker