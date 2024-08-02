import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = 'http://localhost:5000'
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  const getNotes = async () => {
    const url = `${host}/api/notes/fetchallnotes`;
    const response = await fetch(url, { method: 'GET', headers: { 'auth-token': localStorage.getItem('token') , 'Content-Type': 'application/json' } });
    const data = await response.json();
    setNotes(data);
  }

  const addNote = async ({ title, description, tag }) => {
    const url = `${host}/api/notes/addnote`;
    const response = await fetch(url, { method: 'POST', headers: { 'auth-token': localStorage.getItem('token') , 'Content-Type': 'application/json' }, body: JSON.stringify({ title, description, tag }) });
    const data = await response.json();
    setNotes(notes.concat(data));
  }

  const deleteNote = async (id) => {
    const url = `${host}/api/notes/deletenote/${id}`;
    const response = await fetch(url, { method: 'DELETE', headers: { 'auth-token': localStorage.getItem('token') , 'Content-Type': 'application/json' } });
    // const data=await response.json();

    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  }

  const editNote = async ({ id, title, description, tag }) => {
    const url = `${host}/api/notes/updatenote/${id}`;
    const response = await fetch(url, { method: 'PUT', headers: { 'auth-token': localStorage.getItem('token') , 'Content-Type': 'application/json' }, body: JSON.stringify({ title, description, tag }) });
    // const data = await response.json();
    let newNotes=JSON.parse(JSON.stringify(notes));

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
           break;
      }
    }
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;