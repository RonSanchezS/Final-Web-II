import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
const CrearGrupo = () => {

    const navigate = useNavigate();

    const { id } = useParams();


    const [nombre, setNombre] = useState('')

    useEffect(() => {
        retrieveGrupoFromApi();

        return () => {

        }
    }, [])

    const retrieveGrupoFromApi = () => {
        if (id) {
            axios.get(`http://localhost:8000/api/grupos/${id}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res => {
                setNombre(res.data.nombre)
            }
            ).catch(err => {
                console.log(err);
            }
            )
        }
    }
    const habdleGrupo = (e) => {
        e.preventDefault();
       if(id){
        console.log(localStorage.getItem('token'));
        axios.put(`http://localhost:8000/api/grupos/${id}`, {
            nombre: nombre,
            
        },{headers: {
            'Authorization': ' Bearer ' + localStorage.getItem('token')
        }}).then(res => {
            console.log(res);
            navigate('/');
        }
        ).catch(err => {
            console.log(err);
        }
        )
       }else{
        axios.post('http://localhost:8000/api/grupos', {
            nombre: nombre,
            
        },{headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }}).then(res => {
            console.log(res);
            navigate('/');
        }
        ).catch(err => {
            console.log(err);
        }
        )
       }



    }

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
    }, [])
    return (<>
        <form onSubmit={habdleGrupo}>
            <input type={"text"} value={nombre} name="nombre" onChange={(e) => {
                setNombre(e.target.value)
            }} placeholder="Nombre del grupo"></input>
            <button type='submit'>Ingresar un nuevo grupo</button>
        </form>
    </>);
}

export default CrearGrupo;