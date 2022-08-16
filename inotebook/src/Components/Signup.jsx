import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
    let navigate = useNavigate()
    const [credentials,setCredentials] = useState({ name : '', email : '' , password : '' , cpassword : ''})
    const onchange = (e) =>{
        setCredentials({...credentials, [e.target.name] : e.target.value})
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        fetch('https://my-inotebook1.herokuapp.com/api/auth/createUser',{
            method: 'POST',
            headers: {
                "Content-Type" : "application/json"
            },body : JSON.stringify({name: credentials.name, email : credentials.email , password : credentials.password})
        }).then((res)=>{return res.json()})
        .then((data)=>{
            if(data.success){
                console.log(data)
                window.localStorage.setItem('token' , data.authToken)
                navigate('/')
                props.showAlert("Account Created Successfully" , "success")
            }else{
                props.showAlert("invalid Credentials" , "danger")
            }
        })
    }
    return (
        <>  
            <h2 className='mt-5'>Create an Account   use iNotebook</h2>
            <div className="container">
                <form onSubmit={handleSubmit}>
                <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name='name'  value={credentials.name}  onChange={onchange}   />
             
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onchange}  aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onchange} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                        <input type="cpassword" className="form-control" id="cpassword" name='cpassword' value={credentials.password} onChange={onchange} minLength={5} required/>
                    </div>
                    
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Signup