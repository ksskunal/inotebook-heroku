import React, { useContext } from 'react'
import noteContext from '../context/noteContext'

const NoteItem = (props) => {
    const { deleteNote } = useContext(noteContext)
    const {note , updatenote} = props
    return (
        <>
        <div className='col-md-3'>
            <div className="card my-3" >
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.desc}</p>
                        <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id)}}></i>
                        <i className="fa-solid fa-pen-to-square mx2" onClick={()=>{updatenote(note)}}></i>

                    </div>
            </div>
        </div>
        </>
    )
}

export default NoteItem