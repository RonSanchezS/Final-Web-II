import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
const CrearEquipo = () => {

    const { id = 0 } = useParams();
    const navigate = useNavigate();

    const [listaGrupos, setlistaGrupos] = useState([]);

    useEffect(() => {
        //check for access token
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
        
        fetchPorId();
        fetchGrupos();
    }, [])

    const handleSubmit = event => {
        event.preventDefault();

        // 👇️ redirect to /contacts
        navigate('/');
    };

    const fetchGrupos = () => {
        axios.get('http://localhost:8000/grupos')
            .then(res => {
                setlistaGrupos(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const fetchPorId = () => {
        axios.get(`http://localhost:8000/equipos/${id}`)
            .then(res => {
                setnombre(res.data.nombre)
                setIcono(res.data.icono)
                setidGrupo(res.data.grupo_id)
                //get grupoid and set it to select
                document.getElementById('grupoid').value = res.data.grupo_id;
            })
            .catch(err => {
                console.log(err)
            })
    }

    const [nombre, setnombre] = useState('')
    const [Icono, setIcono] = useState('')
    const [idGrupo, setidGrupo] = useState('1')

    const habdleSubmit = (e) => {
        e.preventDefault();
        if (id != 0) {
            axios.put(`http://localhost:8000/api/equipos/${id}`, {
                nombre: nombre,
                icono: Icono,
                grupo_id: idGrupo
            }, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
                })
                .then(res => {
                    navigate('/');
                })
                .catch(err => {
                    return <>Error</>

                })
        } else {
            e.preventDefault();
            const data = {
                nombre: nombre,
                icono: 0,
                grupo_id: idGrupo
            }
            axios.post('http://localhost:8000/api/equipos', data, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
                })
                .then(res => {
                    navigate('/')
                }
                )
                .catch(err => {
                    console.log(err)
                }
                )
        }
    }

    return (
        <div>
            <form method='post' onSubmit={habdleSubmit}>
                <input type='hidden' name='id' value={id} />
                <div className="field">
                    <label className="label">Nombre</label>
                    <div className="control">
                        <input type={"text"} name="nombre" placeholder="Nombre" defaultValue={nombre}
                            onChange={(e) => setnombre(e.target.value)}
                        />
                    </div>
                </div>
                <input type={"hidden"} name="icono" placeholder="Icono" defaultValue={0}
                />

                <div className="field">
                    <label className="label">Grupo</label>
                    <div className="control">
                        <div className="select">
                            <select name="grupo_id" id="grupoid" placeholder="Grupo"
                                onChange={(e) => setidGrupo(e.target.value)}

                            >
                                {listaGrupos.map((grupo) => (

                                    <option key={grupo.id} value={grupo.id} defaultValue>{grupo.nombre}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className='field'>
                    <div className='control'>
                        {id != 0 ? <button type="submit" >Actualizar equipo existente</button> : <button type="submit" >Crear equipo nuevo</button>}
                    </div>
                </div>
            </form>
        </div>);
}

export default CrearEquipo;