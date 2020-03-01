import React from 'react'
import Select from 'react-select'




const StoryForm = ({ data, handleChange, handleSubmit }) => {
  
  // const options = [
  //   { key: '1', label: 'Funny' }, //label is shown to user
  //   { key: '2', label: 'Sci-fi' },
  //   { key: '3', label: 'Spooky' },
  //   { key: '4', label: 'Internet' },
  //   { key: '5', label: 'Cute' },
  //   { key: '6', label: 'Fairy Tales' },
  //   { key: '7', label: 'Mysery' },
  //   { key: '8', label: 'Poetry' },
  //   { key: '9', label: 'Magic' }
  // ]

  return (
    <div className="columns">
      <form onSubmit={handleSubmit} className="column is-half is-offset-one-quarter">
        <h2 className="title">New Story</h2>
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
        <div className="field">
          <label className="label">Image</label>
          <div className="control">
            <input 
              className="input"
              name="image"
              required
              placeholder="Image"
              onChange={handleChange}
              value={data.image}
            />
          </div>
        </div>
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
          <label className="label">Genre</label>
          <div className="control">
            <input 
              className="input"
              name="genre"
              placeholder="genre"
              onChange={handleChange}
              value={data.genre}
            />
          </div>
        </div>
        {/* <div className="field">
              <label className="label">Genre</label>
              <div className="control">
                <Select
                  value={data.genre}
                  options={options}
                  isMulti
                  onChange={handleMultiChange}
                />
              </div>
        </div> */}
       
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