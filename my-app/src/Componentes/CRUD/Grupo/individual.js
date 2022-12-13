import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Imagen from '../../Imagen/Imagen';
const VerGrupoIndividual = () => {

    const { id } = useParams();

    const [listaTabla, setlistaTabla] = useState([]);
    //listaTabla has id, Equipo, PTS, PJ, V, E, D, GF, GC, DIF
    useEffect(() => {
       fetchTablaDelGrupo   ();
    })




    //make a function that returns the total of matches played by a team



    const fetchTablaDelGrupo = () => {
        setInterval(() => {
            axios.get(`http://localhost:8000/grupo/${id}/puntuacion/`)
            .then(res => {
                setlistaTabla(res.data)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
                
            })
        }, 1000)
        
    }
    return (<>
        <div className='gruposIndividuales'>
            <div className='columns is-centered'>
                <div className='imgLogo'>
                    <img src={`http://localhost:8000/img/noimportant/logo.png`}></img>

                </div>
            </div>
            <div className='columns is-mobile'>
                <div className='column is-full'>
                    <table className='table is-fullwidth'>
                        <thead>
                            <tr>
                                <th>Bandera</th>
                                <th>Nombre</th>
                                <th>PTS</th>
                                <th>PJ</th>
                                <th>V</th>
                                <th>E</th>
                                <th>D</th>
                                <th>GF</th>
                                <th>GC</th>
                                <th>DIF</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaTabla && listaTabla.map((equipo) => (
                                <tr key={equipo.id}>
                                    <td >
                                        <div className='miniIconosDePaises'>
                                            <Imagen nombreDeCarpeta={'icons'} nombreDeRecurso={equipo.id}></Imagen>
                                        </div>
                                    </td>
                                    <td >{equipo.Equipo}</td>
                                    <td >{equipo.PTS}</td>
                                    <td >{equipo.PJ}</td>
                                    <td >{equipo.V}</td>
                                    <td >{equipo.E}</td>
                                    <td >{equipo.D}</td>
                                    <td >{equipo.GF}</td>
                                    <td >{equipo.GC}</td>
                                    <td >{equipo.DIF}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    </>);
}
export default VerGrupoIndividual;