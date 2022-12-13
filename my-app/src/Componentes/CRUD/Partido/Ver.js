import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Imagen from '../../Imagen/Imagen';
const VerPartido = () => {

    const [listaPArtidos, setlistaPArtidos] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        fetchPartidos();

        return () => {

        }
    }, [])

    const fetchPartidos = () => {

        axios.get('http://localhost:8000/api/partidos')
            .then(res => {
                setlistaPArtidos(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }


    const eliminarPartido = (id) => {
        axios.delete(`http://localhost:8000/api/partidos/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                console.log(res)
                fetchPartidos();

            }).then(
                navigate('/')
            )
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <>
            <div className='gruposIndividuales'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID del partido</th>
                            <th>Equipo local</th>
                            <th>Equipo visitante</th>
                            <th>Fecha</th>
                            <th>Hora de inicio</th>
                            <th>Hora de finalizacion</th>
                            <th>Estado del partido</th>
                            <th>Goles del equipo visitante</th>
                            <th>Goles del equipo local</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaPArtidos.map((partido) => (
                            <tr key={partido.id}>
                                <td>{partido.id}</td>
                                <td>
                                    <div className='miniIconosDePaises'>
                                        <Imagen nombreDeCarpeta={'icons'} nombreDeRecurso={partido.equipo1_id}></Imagen>
                                    </div>
                                </td>
                                <td>
                                    <div className='miniIconosDePaises'>
                                        <Imagen nombreDeCarpeta={'icons'} nombreDeRecurso={partido.equipo2_id}></Imagen>
                                    </div>
                                </td>
                                <td>{partido.fecha}</td>
                                <td>{partido.horaInicio}</td>
                                <td>{partido.horaFin}</td>
                                <td>{partido.estado}</td>
                                <td>{partido.golesEquipo1}</td>
                                <td>{partido.golesEquipo2}</td>
                                {localStorage.getItem('token') && <> <td>
                                    <button className="button is-primary" onClick={() => navigate(`/partido/editar/${partido.id}`)}>Editar</button>
                                </td>
                                    <td>
                                        <button className="button is-danger" onClick={() => {
                                            eliminarPartido(partido.id)
                                        }}>Eliminar</button>
                                    </td></>}

                            </tr>
                        ))}
                    </tbody>
                </table>
                {localStorage.getItem('token') && <button className='button is-primary' onClick={() => {
                    navigate('/crearpartido')
                }}>Colocar un partido</button>}
            </div>
        </>


    );
}

export default VerPartido;