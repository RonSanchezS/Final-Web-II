import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
const VerGrupoPorColumna = () => {

    const [listaGrupos, setlistaGrupos] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        fetchGrupos();

        return () => {

        }
    }, [])

    const fetchGrupos = () => {
        axios.get('http://localhost:8000/grupos')
            .then(res => {
                setlistaGrupos(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <>


            <div className='columns is-multiline is-mobile'>

                {listaGrupos.map((grupo) => (
                    <div className='column is-one-quarter' onClick={() => {
                        navigate(`/grupo/${grupo.id}`)
                    }}>
                        <div className='bordecitos'>

                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>{grupo.nombre}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr key={grupo.id}>
                                        {grupo.equipos.map((equipo) => (
                                            <tr key={equipo.id}>
                                                <td>{equipo.nombre}</td>
                                            </tr>
                                        ))}

                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                ))}
            </div>

        </>
    );
}

export default VerGrupoPorColumna;