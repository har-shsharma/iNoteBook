import React, { useState, useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const {showAlert}=props;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleOnClick = (e) => {
        e.preventDefault()
        addNote(note)
        setNote({ title: "", description: "", tag: "" })
        showAlert({type:'success',message:'Successfully added the note'})
    }
    const handleOnChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div className="my-3 container">
            <h2>Add notes</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={handleOnChange} value={note.title}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={handleOnChange} value={note.description}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={handleOnChange} value={note.tag} />
                </div>
                <button type="submit" disabled={note.title.length<1 || note.description.length<1} className="btn btn-primary" onClick={handleOnClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
