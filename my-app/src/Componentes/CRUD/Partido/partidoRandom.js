import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Imagen from '../../Imagen/Imagen';
const PartidoRandom = () => {
    const [partidoRandom, setpartidoRandom] = useState([])


    const [horaConvertida, sethoraConvertida] = useState('')
  
    const navigate = useNavigate();

    useEffect(() => {
        fetchPartidoRandom();

    }, [])



    const fetchPartidoRandom = () => {
        axios.get('http://127.0.0.1:8000/partidoRandom')
            .then(res => {
                setpartidoRandom(res.data)
                //console log the current hour
                var date = new Date();
                var hora = date.getHours();
                var minutos = date.getMinutes();
                var segundos = date.getSeconds();
                minutos = minutos < 10 ? '0' + minutos : minutos;
                var strTime = hora + ':' + minutos + ':' + segundos;
                sethoraConvertida(strTime)
                console.log(strTime)

                //console log the difference between the current hour and horaInicio of the match
                var horaInicio = res.data.horaInicio;
                var horaInicioConvertida = horaInicio.split(':');
                var horaInicioConvertidaEnSegundos = (+horaInicioConvertida[0]) * 60 * 60 + (+horaInicioConvertida[1]) * 60 + (+horaInicioConvertida[2]);
                var horaConvertidaEnSegundos = (+hora) * 60 * 60 + (+minutos) * 60 + (+segundos);
                var diferencia = horaConvertidaEnSegundos - horaInicioConvertidaEnSegundos;
           
                var minutosDiferencia = Math.floor(diferencia / 60);
                
                sethoraConvertida(minutosDiferencia)

            }).then(() => {


            })
            .catch(err => {
                console.log(err)
            })

    }

    return (
        <>

            {partidoRandom &&
                <>

                    <div class="card" onClick={(e)=>{
                        e.stopPropagation();
                        navigate(`/partidos/${partidoRandom.id}`)
                    }}>
                        <div class="card-content">
                            <div class="content">
                                <div className="columns is-mobile ">
                                    <div className='column is-half'>
                                        Partido iniciado el {partidoRandom.fecha} a las {partidoRandom.horaInicio}
                                    </div>
                                    <div className='column is-half'>
                                        {partidoRandom.estado != 0 && <div className="notification is-success">  Partido en curso,
                                            elapsados {horaConvertida+" "}
                                             minutos</div>}
                                    </div>
                                </div>
                                <div className='column is-full'>Resultado preliminar:</div>
                                <div className="columns is-gapless ">
                                    <div className='column is-third'>
                                        <div className="has-text-centered">
                                            {partidoRandom.golesEquipo1}
                                        </div>
                                    </div>
                                    <div className='column is-third'>
                                        <div className="has-text-centered">
                                            -
                                        </div>
                                    </div>
                                    <div className='column is-third'>
                                        <div className="has-text-centered">
                                            {partidoRandom.golesEquipo2}
                                        </div>
                                    </div>
                                </div>
                                <div className='columns'>
                                    <div className='column is-half'>
                                        <div className='holder'>
                                            <Imagen nombreDeRecurso={partidoRandom.equipo1_id} nombreDeCarpeta={'icons'}></Imagen>
                                            <p>Equipo 1</p>
                                        </div>
                                        <p className='subtitle'>Lado izquierdo</p>
                                        <div className='content is-small'>
                                            <ul>
                                                {partidoRandom.eventos && partidoRandom.eventos.map((evento) => (
                                                    <div>
                                                        {evento.lado == 1 && <li key={evento.id}>
                                                            {evento.lado == 1 && evento.minuto} {evento.lado == 1 && evento.descripcion}
                                                        </li>}

                                                    </div>


                                                ))
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                    <div className='column is-half'>
                                        <div className='holder'>
                                            <Imagen nombreDeRecurso={partidoRandom.equipo2_id} nombreDeCarpeta={'icons'}></Imagen>
                                            <p>Equipo 2</p>
                                        </div>
                                        <p className='subtitle'>Lado derecho</p>
                                        <div className='content is-small'>
                                            <ul>
                                                {partidoRandom.eventos && partidoRandom.eventos.map((evento) => (
                                                    <div>
                                                        {evento.lado == 2 && <li key={evento.id}>
                                                            {evento.lado == 2 && evento.minuto} {evento.lado == 2 && evento.descripcion}
                                                        </li>}

                                                    </div>


                                                ))
                                                }
                                            </ul>
                                        </div>

                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </>
            }



        </>);
}

export default PartidoRandom;