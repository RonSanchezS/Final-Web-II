import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const NuevaCuenta = () => {

    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name)
        console.log(email)
        console.log(password)
        axios.post('http://localhost:8000/api/auth/register', {
            name: name,
            email: email,
            password: password
        })
            .then(res => {
                console.log(res)
                navigate('/login')
            }
            )
            .catch(err => {
                console.log(err)
            }
            )
    }

    return (<>
        <form method='post' onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Name</label>
                <input type="text" className="form-control" onChange={(e) => {
                    setname(e.target.value)
                }} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email"  onChange={(e)=>{
                    setemail(e.target.value)
                    }} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password"  onChange={(e)=>{
                    setpassword(e.target.value)
                    }} className="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </>);
}

export default NuevaCuenta;