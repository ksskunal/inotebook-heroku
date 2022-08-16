import React, { useContext } from 'react'
import { useState } from 'react'
import noteContext from '../context/noteContext'

const Addnote = (props) => {
    
    const { addNote } = useContext(noteContext)  
    const [ note , setNote ] = useState({title : '' , desc:'' , tag : ''})
    const handleClick = (e) =>{
        e.preventDefault()
        addNote(note.title, note.desc, note.tag)
        setNote({title : '' , desc:'' , tag : ''})
        props.showAlert("Note Added Sucessfully", "success")
    }
    const onchange = (e) =>{
        setNote({...note ,[e.target.name] : e.target.value})
    }
  return (
    <div className="container my-3">
        <h2>Add a note</h2>
        <form className='my-4' onSubmit={handleClick}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onchange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="desc" className="form-label">Description</label>
            <input type="text" className="form-control" id="desc" name="desc" value={note.desc} onChange={onchange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onchange}/>
          </div>
          <button disabled={note.title.length<3 || note.desc.length < 5} type="submit" className="btn btn-primary">Add Note</button>
        </form>
      </div>
  )
}

export default Addnote