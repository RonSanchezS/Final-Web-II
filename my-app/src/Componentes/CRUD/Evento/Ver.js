import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
const VerEvento = () => {

    const [listaEventos, setlistaEventos] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        fetchEventos();
    }, [])

    const fetchEventos = () => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
            return;
        }
        axios.get('http://localhost:8000/api/eventos')
            .then(res => {
                setlistaEventos(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const eliminar = (id) => {
        axios.delete(`http://localhost:8000/api/eventos/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => {
                fetchEventos();
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <>
            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>ID del partido</th>
                        <th>minuto</th>
                        <th>Descripcion</th>
                    </tr>
                </thead>
                <tbody>
                    {listaEventos.map((evento) => (
                        <tr key={evento.id}>
                            <td>{evento.id}</td>
                            <td>{evento.partido_id}</td>
                            <td>{evento.minuto}</td>
                            <td>{evento.descripcion}</td>
                            <td>
                                <button className="button is-primary" onClick={() => navigate(`/evento/editar/${evento.id}`)}>Editar</button>
                            </td>
                            <td>
                                <button className="button is-danger" onClick={()=>{
                                    eliminar(evento.id)
                                }}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button className="button is-success" onClick={() => navigate(`/crearEvento`)}>Crear</button>
        </>

    );
}

export default VerEvento;