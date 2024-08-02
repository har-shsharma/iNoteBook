import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const [credentials, setCredentials] = useState({email:'',password:''});
    const {showAlert}=props;
    let history=useNavigate();
    const handleOnChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
      }
    const handleOnSubmit=async (e)=>{
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json'},body: JSON.stringify({email:credentials.email,password:credentials.password}) });
        const data=await response.json();
        if(data.success){
            localStorage.setItem('token',data.authToken);
            showAlert({type:'success',message:'Successfully logged in'})
            history('/');
        }
        else{
            showAlert({type:'danger',message:'Invalid email or password'})
        }
    }
    return (
        <div className='container my-2'>
            <h2>Login to continue to iNotebook</h2>
            <form onSubmit={handleOnSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={credentials.email} onChange={handleOnChange}/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name='password' className="form-control" id="exampleInputPassword1" value={credentials.password} onChange={handleOnChange}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
