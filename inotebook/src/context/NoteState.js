
import { useState } from "react"
import noteContext from "./noteContext"

const NoteState = (props) => {
  const host = "https://my-inotebook1.herokuapp.com"
  const notesInitial = []

  const [notes, setnotes] = useState(notesInitial)

  // Get All notes 

  const getNotes = async () => {
    fetch(`${host}/api/notes/fetchallnotes`, { headers: { "Content-Type": "application/json", "auth-token": localStorage.getItem('token') } })
      .then((res) => { return res.json() })
      .then((data) => { setnotes(data) })
  }

  // add a note

  const addNote = (title, desc, tag) => {
    fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: { "Content-Type": "application/json", "auth-token": localStorage.getItem('token') },
      body: JSON.stringify({ title, desc, tag })
    }).then((res) => { return res.json() })
      .then((data) => { 
        const note = data
        setnotes(notes.concat(note))

      })



    

  }

  // edit a note
  const editNote = async (id, title, desc, tag) => {

    await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json", "auth-token": localStorage.getItem('token') },
      body: JSON.stringify({ title, desc, tag })
    })

    
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title
        newNotes[index].desc = desc
        newNotes[index].tag = tag
        break;
      }

    }
    setnotes(newNotes)
  }

  // delete a note
  const deleteNote = async (id) => {
   await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: { "Content-Type": "application/json", "auth-token": localStorage.getItem('token') }
    })


    let newNote = notes.filter((note) => { return note._id !== id })
    setnotes(newNote)

  }
  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, getNotes,editNote }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState