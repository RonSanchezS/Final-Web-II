import axios from 'axios';
import React, { useState } from 'react'
import Imagen from '../../Imagen/Imagen';
const IniciarSesion = () => {


    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('enviando')
        console.log(name)
        console.log(email)
        console.log(password)
        axios.post('http://localhost:8000/api/auth/login', {
            email: email,
            password: password
        })
            .then(res => {
                console.log(res)
                //res returns access token, store it in local storage
                localStorage.setItem('token', res.data.access_token)
                window.location.href = '/'
            }
            )
            .catch(err => {
                console.log(err)
            }
            )
    }




    return (
        <div className='contenedor'>
            <div id='login' className='columns is-centered'>
                <form method='post' onSubmit={handleSubmit}>

                    

                    <div className="form-group">
                        <label className='set' htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" value={email} onChange={(e) => {
                            setemail(e.target.value)
                        }} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" value={password} onChange={(e) => {
                            setpassword(e.target.value)
                        }} id="exampleInputPassword1" placeholder="Password" />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

            </div>
            <div className='futo'>
                <div className='degrade'><div className='wrapper'>
                    <Imagen nombreDeCarpeta={'noimportant'} nombreDeRecurso={'futo'} />
                </div></div>


            </div>

        </div>);
}

export default IniciarSesion;