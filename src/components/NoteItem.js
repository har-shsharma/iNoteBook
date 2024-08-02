import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const NoteItem = (props) => {
    const { note, updateNote ,showAlert} = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;
    return (
        <div className='col-md-3 my-3'>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-regular fa-trash-can mx-2" onClick={() => { deleteNote(note._id);showAlert({type:'success',message:'Successfully deleted the note'}); }}></i>
                    <i className="fa-regular fa-pen-to-square mx-2" onClick={() => { updateNote(note) }}></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
