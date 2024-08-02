import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem.js'
import AddNote from './AddNote.js';
import { useNavigate } from 'react-router-dom';
const Notes = (props) => {
  const context = useContext(noteContext);
  const {showAlert}=props;
  const [note, setNote] = useState({eid:"", etitle: "", edescription: "", etag: "" })
  const { notes, getNotes ,editNote} = context;
  const ref = useRef(null);
  const history=useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){
    getNotes();
    }
    else{
      history('/Login');
    }
    // eslint-disable-next-line
  }, [])
  const updateNote = (note) => {
    setNote({eid:note._id,etitle:note.title,edescription:note.description,etag:note.tag});
    ref.current.click();
  }
  const handleOnChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  const handleOnClick = (e) => {
    e.preventDefault();
    editNote({id:note.eid,title:note.etitle,description:note.edescription,tag:note.etag});
    showAlert({type:'success',message:'Successfully updated the note'});
  }
  return (
    <>
      <AddNote showAlert={showAlert}/>
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={handleOnChange} value={note.etitle}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" onChange={handleOnChange} value={note.edescription}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text"  className="form-control" id="etag" name="etag" onChange={handleOnChange} value={note.etag} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" disabled={note.etitle.length<1 || note.edescription.length<1} className="btn btn-primary" onClick={handleOnClick} data-bs-dismiss="modal">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your notes</h2>
        <div className="container">
          {notes.length===0 && 'No Notes To Display'}
        </div>
        {notes.map((note) => { return <NoteItem updateNote={updateNote} showAlert={showAlert} key={note._id} note={note} /> })}
      </div>
    </>
  )
}

export default Notes
