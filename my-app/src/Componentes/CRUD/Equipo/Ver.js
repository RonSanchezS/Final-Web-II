import React, { useState, useEffect } from 'react'
//import axios
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Imagen from '../../Imagen/Imagen';
const VerEquipo = () => {

    const [listaEquipos, setlistaEquipos] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fecthEquipos()
    })

    const fecthEquipos = () => {
        //set timeout
        setTimeout(() => {
            axios.get('http://localhost:8000/api/equipos')
            .then(res => {
                setlistaEquipos(res.data)
               
            })
            .catch(err => {
                console.log(err)
            })
        }, 1000)

        
       
    }


    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/api/equipos/${id}`,
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }
        )
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }




    return (<>
        <h1>Lista de Equipos</h1>
        <table className="table is-striped ">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Grupo</th>
                </tr>
            </thead>
            <tbody>
                {listaEquipos.map((equipo) => (
                    <tr key={equipo.id}>
                        <td>
                            <div className='miniIconosDePaises'>
                                <Imagen nombreDeCarpeta={'icons'} nombreDeRecurso={equipo.id}></Imagen>
                            </div>
                        </td>
                        <td>{equipo.nombre}</td>
                        <td>{equipo.grupo.nombre}</td>
                       {localStorage.getItem('token') && <> <td>
                            <button className="button is-primary" onClick={() => navigate(`/equipo/editar/${equipo.id}`)}>Editar</button>
                        </td>
                        <td>
                            <button className="button is-danger" onClick={() => { handleDelete(equipo.id) }}>Eliminar</button>
                        </td>
                        <td>
                            <button className="button is-info" onClick={() => navigate(`/equipofoto/${equipo.id}`)}>Subir Foto</button>
                        </td></>}
                    </tr>
                ))}
            </tbody>
        </table>
        {localStorage.getItem('token') && <button className="button is-primary" onClick={() => navigate(`/crearequipo`)}>Crear Equipo</button>}
    </>);
}

export default VerEquipo;