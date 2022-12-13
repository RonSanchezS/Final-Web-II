import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import PartidoRandom from './partidoRandom';
const CrearPartido = () => {

    const { id } = useParams();

    const [listaEquipos, setlistaEquipos] = useState([])
    const [listaGrupos, setlistaGrupos] = useState([])
    const [partido, setpartidoRandom] = useState([])

    const navigate = useNavigate();

    const [equipo1, setequipo1] = useState(1)
    const [equipo2, setequipo2] = useState(2)
    const [grupo_id, setgrupo_id] = useState(1)
    const [fecha, setfecha] = useState([])
    const [horaInicio, sethoraInicio] = useState([])
    const [horaFin, sethoraFin] = useState([])
    const [estado, setestado] = useState(0)
    const [golesEquipo1, setgolesEquipo1] = useState(0)
    const [golesEquipo2, setgolesEquipo2] = useState(0)



    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
        fetchEquipos();
        fetchGrupos();
        if (id) {
            fetchPartido();
        }
        verificarPorID()
    }, [])


    const verificarPorID = () => {
        if (id) {
            console.log(partido)
        }
    }

    const fetchPartido = () => {
        axios.get(`http://localhost:8000/partidos/${id}`)
            .then(res => {
                setpartidoRandom(res.data)
                setequipo1(res.data.equipo1)
                setequipo2(res.data.equipo2)
                setgrupo_id(res.data.grupo_id)
                setfecha(res.data.fecha)
                sethoraInicio(res.data.horaInicio)
                sethoraFin(res.data.horaFin)
                setestado(res.data.estado)
                setgolesEquipo1(res.data.golesEquipo1)
                setgolesEquipo2(res.data.golesEquipo2)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const fetchGrupos = () => {
        axios.get('http://localhost:8000/grupos')
            .then(res => {
                setlistaGrupos(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const fetchEquipos = () => {
        axios.get('http://localhost:8000/equipos')
            .then(res => {
                setlistaEquipos(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const noSonIguales = () => {
        return equipo1 !== equipo2
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (noSonIguales) {
            if (id) {
                console.log('actualizar')
                //get selected element from selectEquipo1
                var selectEquipo1 = document.getElementById("selectEquipo1");
                var selectedEquipo1 = selectEquipo1.options[selectEquipo1.selectedIndex].value;
                //get selected element from selectEquipo2
                var selectEquipo2 = document.getElementById("selectEquipo2");
                var selectedEquipo2 = selectEquipo2.options[selectEquipo2.selectedIndex].value;
                console.log(selectedEquipo1)
                console.log(selectedEquipo2)
                console.log(grupo_id)
                console.log(fecha)
                console.log(horaInicio)
                console.log(horaFin)
                console.log(estado)
                console.log(golesEquipo1)
                console.log(golesEquipo2)
                console.log(`'Authorization': 'Bearer ' + ${localStorage.getItem('token')}`)
                axios.put(`http://localhost:8000/api/partidos/${id}`, {
                    equipo1_id: selectedEquipo1,
                    equipo2_id: selectedEquipo2,
                    grupo_id: grupo_id,
                    fecha: fecha,
                    horaInicio: horaInicio,
                    horaFin: horaFin,
                    estado: estado,
                    golesEquipo1: golesEquipo1,
                    golesEquipo2: golesEquipo2
                }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')} `
                    }
                }
                )
                    .then(res => {
                        console.log(res)
                        navigate('/')
                    })
                    .catch(err => {
                        console.log(err)
                    })


            } else {

                axios.post('http://localhost:8000/api/partidos/ ', {
                    equipo1_id: equipo1,
                    equipo2_id: equipo2,
                    grupo_id: grupo_id,
                    fecha: fecha,
                    horaInicio: horaInicio,
                    horaFin: horaFin,
                    estado: estado,
                    golesEquipo1: golesEquipo1,
                    golesEquipo2: golesEquipo2
                }, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
                    .then(res => {
                        navigate('/');
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        }

    }

    const deselect = (e) => {
        e.preventDefault();
        var elements = document.getElementById("selectEquipo1").options;

        for (var i = 0; i < elements.length; i++) {
            elements[i].selected = elements[0];
        }
        var elements = document.getElementById("selectEquipo2").options;

        for (var i = 0; i < elements.length; i++) {
            elements[i].selected = elements[0];
        }
    }

    return (<>
        <div className="columns is-mobile ">
            <div className='column is-half'>
                <form method='post' onSubmit={handleSubmit}>
                    <div className="field">
                        <label className="label">ID del equipo 1</label>
                        <div className="control">
                            <select name='equipo1_id' id="selectEquipo1" onChange={(e) => { setequipo1(e.target.value) }}>
                                <option value={0} disabled>Selecciona el equipo local</option>
                                {listaEquipos.map((equipo) => (
                                    <>
                                        {equipo.grupo_id == grupo_id ?
                                            <option value={equipo.id} selected={equipo.id == partido.equipo1_id ? true : false}>{equipo.nombre}</option>
                                            :
                                            <option value={equipo.id} selected={equipo.id == partido.equipo1_id ? true : false} disabled>{equipo.nombre}
                                            </option>}

                                    </>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">ID del equipo 2</label>
                        <div className="control">
                            <select name='equipo2_id' id='selectEquipo2' onChange={(e) => { setequipo2(e.target.value) }}>
                                <option value={0} disabled>Selecciona el equipo visitante</option>

                                {listaEquipos.map((equipo) => (

                                    <>
                                        {equipo.grupo_id == grupo_id ?
                                            <option value={equipo.id} selected={equipo.id == partido.equipo2_id ? true : false}>{equipo.nombre}</option>
                                            :
                                            <option value={equipo.id} selected={equipo.id == partido.equipo3_id ? true : false} disabled>{equipo.nombre}
                                            </option>}                                    </>

                                ))}
                            </select>
                        </div>
                    </div>
                    {equipo1 == equipo2 ? <p className='has-text-danger	'>Los equipos local y visitantes no pueden ser iguales</p> : <p></p>}
                    <div className="field">
                        <label className="label">Grupo:</label>
                        <div className="control">
                            <select name='grupo_id' onChange={(e) => {
                                setgrupo_id(e.target.value)
                                setequipo1(0)
                                setequipo2(0)
                                deselect()
                                //deselect equipo1_id and equipo2_id

                            }}>
                                {listaGrupos.map((grupo) => (
                                    <option key={grupo.id} value={grupo.id}>{grupo.nombre}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Fecha</label>
                        <div className="control">
                            <input required type={"date"} placeholder="Fecha" name='fecha' defaultValue={partido.fecha} onChange={(e) => { setfecha(e.target.value) }}></input>

                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Hora de inicio</label>
                        <div className="control">
                            <input required type={"text"} placeholder="Hora de inicio" name='horaInicio' onChange={(e) => { sethoraInicio(e.target.value) }}
                                defaultValue={partido.horaInicio}></input>

                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Hora de fin</label>
                        <div className="control">
                            <input required type={"text"} placeholder="Hora de fin" name='horaFin' defaultValue={partido.horaFin} onChange={(e) => { sethoraFin(e.target.value) }}></input>

                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Estado del partido</label>
                        <div className="control">
                            <select name='estado' onChange={(e) => { setestado(e.target.value) }}>
                                <option value={0}>Sin comenzar</option>
                                <option value={1}>En curso</option>
                                <option value={-1}>Finalizado</option>
                            </select>

                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Goles de local</label>
                        <div className="control">
                            <input required type={"number"} placeholder="Goles del equipo 1" onChange={(e) => { setgolesEquipo1(e.target.value) }}
                                name='golesEquipo1' defaultValue={partido.golesEquipo1}></input>

                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Goles de los visitantes</label>
                        <div className="control">
                            <input required type={"number"} placeholder="Goles del equipo 2" onChange={(e) => { setgolesEquipo2(e.target.value) }} name='golesEquipo2' defaultValue={partido.golesEquipo2}></input>

                        </div>
                    </div>
                    {id ? <button type='submit' className="button is-info">Editar partido</button> : <button type='submit' className="button is-info">Crear nuevo partido</button>}

                </form>
            </div>
        </div >
    </>);
}

export default CrearPartido;