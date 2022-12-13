import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
const CrearEventoParaPartido = () => {
    const { id } = useParams();

    const [Evento, setEvento] = useState([])
    const [idPartido, setIdPartido] = useState(1)
    const [minuto, setMinuto] = useState('0')
    const [lado, setLado] = useState('1')
    const [descripcion, setDescripcion] = useState('')



    const [listaDePartidos, setlistaDePartidos] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
        fetchPartidos();

    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const partido = {
            partido_id: id,
            minuto: minuto,
            lado: lado,
            descripcion: descripcion
        }

        axios.post('http://localhost:8000/api/eventos/',
            partido, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => {
                navigate('/');
            }).catch(err => {
                console.log(err);
                if (err.response.status === 401) {
                    navigate('/login');
                }
            });
        ;




    }

    const fetchPartidos = () => {
        axios.get('http://localhost:8000/api/partidos')
            .then(res => {
                setlistaDePartidos(res.data)
            }
            )

    }

    return (<>
        <div className='columns is-centered'>
            <div className='manejarUnPoco'>
                <form onSubmit={handleSubmit}>
                    <p>ID del partido</p>
                    <select class="select"  disabled value={id}>
                        {listaDePartidos && listaDePartidos.map((partido) => {
                            return <option value={partido.id}>{partido.id}</option>
                        })}
                    </select>
                    <p>Minuto</p>
                    
                    <input className="input is-rounded" type={"number"} onChange={(e) => { setMinuto(e.target.value) }} required placeholder="minuto" min={0} max={90} defaultValue={Evento.minuto}></input>
                    <p>Lado</p>
                    <select class="select" onChange={(e) => { setLado(e.target.value) }}>
                        <option value="1">Local</option>
                        <option value="2">Visitante</option>
                    </select>
                    <p>Descripcion</p>
                    <input className="input is-rounded" type={"text"} onChange={(e) => { setDescripcion(e.target.value) }} required placeholder="Descripcion" defaultValue={Evento.descripcion}></input>
                    {id ? <button type='sumbit'>Crear evento</button> : <button type='sumbit'>Crear evento</button>}

                </form>
            </div>

        </div>

    </>);
}

export default CrearEventoParaPartido;