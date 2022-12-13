import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
const VerGrupo = () => {
    const [listaGrupos, setlistaGrupos] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        fetchGrupos();
        return () => {}
    }, [])

    const fetchGrupos = () => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
            return;
        }
        axios.get('http://localhost:8000/api/grupos')
            .then(res => {
                setlistaGrupos(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const deleteGrupo = (id) => {
        axios.delete(`http://localhost:8000/api/grupos/${id}`,
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(res => {
                fetchGrupos();
            }
            )
            .catch(err => {
                console.log(err)
            }
            )
    }
    return (
        <>
            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                    </tr>
                </thead>
                <tbody>
                    {listaGrupos.map((grupo) => (
                        <tr key={grupo.id}>
                            <td>{grupo.id}</td>
                            <td>{grupo.nombre}</td>
                            <td>
                                <button className="button is-primary" onClick={() => navigate(`/grupo/editar/${grupo.id}`)}>Editar</button>
                            </td>
                            <td>
                                <button className="button is-danger" onClick={() => {
                                    deleteGrupo(grupo.id)
                                }}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className='button is-primary' onClick={() => {
                navigate('/creargrupo')
            }}>Crear</button>
        </>
    );
}

export default VerGrupo;