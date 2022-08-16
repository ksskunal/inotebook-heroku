import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import noteContext from '../context/noteContext'
import Addnote from './Addnote'
import NoteItem from './NoteItem'

export const Notes = (props) => {
  let navigate = useNavigate()
  const {showAlert} = props
  const ref = useRef(null)
  const refClose = useRef(null)
  const [ note , setNote ] = useState({ id :'', etitle : '' , edesc:'' , etag : ''})
  const { notes, getNotes ,editNote } = useContext(noteContext)
  useEffect(() => {
    // eslint-disable-next-line
    if(localStorage.getItem('token')){
      getNotes()
    }else{
      navigate('/login')
    }

  }, [])

  const updateNote = (currentNote) => {
    ref.current.click()
    setNote({id:currentNote._id, etitle :currentNote.title , edesc: currentNote.desc, etag : currentNote.tag})
    showAlert("Note Updated" , "success")
  }

  const handleClick = (e) =>{
 
     editNote(note.id,note.etitle, note.edesc , note.etag)
      refClose.current.click()
    
  }
  const onchange = (e) =>{
      setNote({...note ,[e.target.name] : e.target.value})
  }


  return (
    <>
      <Addnote showAlert={showAlert}/>
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal"> </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='my-4' >
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="title" name="etitle" value={note.etitle} onChange={onchange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="desc" className="form-label">Description</label>
                  <input type="text" className="form-control" id="desc" name="edesc" value={note.edesc} onChange={onchange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="tag" name="etag" value={note.etag} onChange={onchange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" disabled={note.etitle.length<3 || note.edesc.length < 5} onClick={handleClick} className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2>Your notes</h2>
        <div className="container">
          {notes.length === 0 && "No notes to display"}
        </div>
        {notes.map((note) => {

          return <NoteItem key={note._id} updatenote={updateNote} note={note} />

        }
        )}
      </div>
    </>

  )
}
