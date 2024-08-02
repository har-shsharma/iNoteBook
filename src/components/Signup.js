import React from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'


const Signup = (props) => {
    const {showAlert}=props;
    const [credentials, setCredentials] = useState({ name:'',email: '', password: '' ,cpassword:''});
    let history=useNavigate();
    const handleOnChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleOnSubmit=async (e)=>{
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/createuser', { method: 'POST', headers: { 'Content-Type': 'application/json'},body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password}) });
        const data=await response.json();
        if(data.success){
            showAlert({type:'success',message:'Account created successfully'})
            history('/');
        }
        else{
            showAlert({type:'danger',message:'Invalid credentials'})
        }
    }
    return (
        <div className="container my-3">
            <h2>Sign Up to continue to iNotebook</h2>
            <form onSubmit={handleOnSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={handleOnChange} required minLength={3}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={handleOnChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={handleOnChange} required minLength={5} />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={handleOnChange} required minLength={5} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
