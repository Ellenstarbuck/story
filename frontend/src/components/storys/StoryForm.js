import React from 'react'
// import Select from 'react-select'




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
        <div className="field">
          <label className="label">Age Rating</label>
          <div className="control">
            <input 
              className="input"
              name="age_rating"
              required
              placeholder="Age Rating"
              onChange={handleChange}
              value={data.age_rating}
            />
          </div>
        </div>
        <div className="box">
             {data.image ? 
                <div>
                  <img src={data.image} />
                </div>
                :
          <>
            <label className='label'>Please upload a photo</label>
            <input
              className="image"
              type="file"
              onChange={handleUpload}
            />
          </>
              }
              <p>&nbsp;</p>  
        <div className="field">
          <label className="label">First Line</label>
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
        <div className="field">
          <label className="label">Would you like a writing prompt?</label>
                <button onClick={handleClick} className="button" id="rock">Yes please!</button>
                <p>&nbsp;</p> 
                <label className="label">Write a line about {choices}</label>
          </div>
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