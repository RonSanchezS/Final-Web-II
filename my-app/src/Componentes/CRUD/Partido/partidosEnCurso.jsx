import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Imagen from '../../Imagen/Imagen';
import PartidoActual from './partidoActual';
const PartidosEnCurso = () => {
    const [listaPartidosEnCurso, setlistaPartidosEnCurso] = useState([])
    const [listaPartidosTerminados, setlistaPartidosTerminados] = useState([])
    //listaPartidosFuturos
    const [listaPartidosFuturos, setlistaPartidosFuturos] = useState([])

    const navigate = useNavigate()

    useEffect(() => {

        fetchPartidosFuturos()
        fetchPartidosEnCurso();
        fetchPartidosTerminados();

    }, [])


    const fetchPartidosFuturos = () => {
        axios.get('http://localhost:8000/api/partidosSinEmpezar')
            .then(res => {
                setlistaPartidosFuturos(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const fetchPartidosTerminados = () => {
        axios.get('http://localhost:8000/api/partidosTerminados')
            .then(res => {
                setlistaPartidosTerminados(res.data)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }


    const fetchPartidosEnCurso = () => {
        setInterval(() => {
            axios.get('http://localhost:8000/api/partidosenCurso')
                .then(res => {
                    setlistaPartidosEnCurso(res.data)
                })
            axios.get('http://localhost:8000/api/partidosenCurso')
                .then(res => {
                    setlistaPartidosEnCurso(res.data)
                })
                .catch(err => {
                    console.log(err)
                }).catch(err => {
                    console.log(err)
                })
        }, 1000);

    }

    return (
        <>
            <div className="col-12">
                <h1>Partidos en curso</h1>
                {listaPartidosEnCurso.map((partido) => {
                    return <PartidoActual partido={partido} />
                })}
            </div>



            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>Partidos terminados</h1>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Equipo Local</th>
                                    <th scope="col">Equipo Visitante</th>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Grupo</th>
                                    <th scope="col">Goles equipo 1</th>
                                    <th scope="col">Goles equipo 2</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaPartidosTerminados.map((partido) => (
                                    <tr key={partido.id} onClick={() => {
                                        console.log(partido)
                                        navigate(`/partido/${partido.id}`)
                                    }}>
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
                                        <td>{partido.grupo_id}</td>
                                        <td>{partido.golesEquipo1}</td>
                                        <td>{partido.golesEquipo2}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>Partidos por comenzar</h1>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Equipo Local</th>
                                    <th scope="col">Equipo Visitante</th>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Grupo</th>

                                </tr>
                            </thead>
                            <tbody>
                                {listaPartidosFuturos.map((partido) => (
                                    <tr key={partido.id}>
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
                                        <td>{partido.grupo_id}</td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PartidosEnCurso;