import React from 'react'




//passing the props down to the story form so we can re-use it as a component
const StoryForm = ({ data, handleChange, handleSubmit, handleUpload, handleClick, choices }) => {
  

  return (
    <div className="columns">
      <form onSubmit={handleSubmit} className="column is-half is-offset-one-quarter">
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input 
              className="input"
              name="title"
              required
              placeholder="Title"
              onChange={handleChange}
              value={data.title}
            />
          </div>
        </div>
        <label className="label">Age Rating</label>
              <div className="d_form">
                <div className="control">
                  <input 
                    className="input"
                    placeholder="Enter a number between 8 - 12"
                    type="number" 
                    max="12"
                    value={data.age_rating}
                    required
                    min="8"
                    name="age_rating"
                    onChange={handleChange}
                  ></input>
                </div>
              </div>  
              <p>&nbsp;</p>  
        <div className="box">
        <div className="field">
          <div className="field">
          <label className="label">Need an idea for your story? Click below</label>
          <button onClick={handleClick} className="button">Inspiration button</button><h2>Write a story about {choices}</h2>
          </div>
                          
          <p>&nbsp;</p> 
          <label className="label">Write the first line of your story</label>
          <div className="control">
            <input 
              className="input"
              name="lineStart"
              required
              placeholder="First Line"
              onChange={handleChange}
              value={data.lineStart}
            />
          </div>
        </div>
        <p>&nbsp;</p>  
        {data.image ? 
                <div>
                  <img src={data.image} />
                </div>
                :
          <>
            <label className='label'>Please upload a photo for your story</label>
            <input
              className="image"
              type="file"
              onChange={handleUpload}
            />
          </>
              }
          <p>&nbsp;</p> 
            <div className="field">
              <label className="label">What kind of story is it?</label>
              <div className="select">
                <select name="genre" onChange={handleChange} value={data.genre}>
                  <option disabled value="">Pick a type</option>
                  <option value="magic">Magic</option>
                  <option value="spooky">Spooky</option>
                  <option value="funny">Funny</option>
                  <option value="funny">Cute</option>
                  <option value="funny">Internet</option>
                  <option value="funny">Space</option>
                </select>
              </div>
            </div>
        <div className="field">
          <button type="submit" className="button is-fullwidth is-warning">
            Add my story to the collection!
          </button>
        </div>
        </div>
      </form>  
    </div>


  )


}
  

export default StoryForm