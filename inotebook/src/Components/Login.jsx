import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
    let navigate = useNavigate()
    const [credentials,setCredentials] = useState({ email : '' , password : ''})
    const onchange = (e) =>{
        setCredentials({...credentials, [e.target.name] : e.target.value})
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        fetch('https://my-inotebook1.herokuapp.com/api/auth/login',{
            method: 'POST',
            headers: {
                "Content-Type" : "application/json"
            },body : JSON.stringify({email : credentials.email , password : credentials.password})
        }).then((res)=>{return res.json()})
        .then((data)=>{
            if(data.success){
                
                window.localStorage.setItem('token' , data.authToken)
                navigate('/')
            }else{
                alert("invalid credentials")
            }
        })

    }
    return (
        <>
            <h2 className='mt-5'>Login to  use iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onchange} aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onchange} name='password' id="password"/>
                </div>
                <button type="submit"  className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}
