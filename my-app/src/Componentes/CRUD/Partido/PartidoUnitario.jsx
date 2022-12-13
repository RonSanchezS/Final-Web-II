import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Imagen from '../../Imagen/Imagen';
const PartidoUnitario = () => {

    const [partido, setPartido] = useState({});
    const [horaConvertida, sethoraConvertida] = useState("");

    const { id } = useParams();

    const navigate = useNavigate()

    useEffect(() => {
        //execute a function every 5 seconds
fetchPartidoPorID();


    }, [])

    const fetchPartidoPorID = () => {
setInterval(() => {
    fetch(`http://localhost:8000/api/partidos/${id}`)
            .then(res => res.json())
            .then(res => {
                setPartido(res);
                console.log(partido);
                var date = new Date();
                var hora = date.getHours();
                var minutos = date.getMinutes();
                var segundos = date.getSeconds();
                minutos = minutos < 10 ? '0' + minutos : minutos;
                var strTime = hora + ':' + minutos + ':' + segundos;
                sethoraConvertida(strTime)

                var horaInicio = res.data.horaInicio;
                var horaInicioConvertida = horaInicio.split(':');
                var horaInicioConvertidaEnSegundos = (+horaInicioConvertida[0]) * 60 * 60 + (+horaInicioConvertida[1]) * 60 + (+horaInicioConvertida[2]);
                var horaConvertidaEnSegundos = (+hora) * 60 * 60 + (+minutos) * 60 + (+segundos);
                var diferencia = horaConvertidaEnSegundos - horaInicioConvertidaEnSegundos;

                var minutosDiferencia = Math.floor(diferencia / 60);
                sethoraConvertida(minutosDiferencia)
            }).catch(err => {

            })
}, 1000);
    
    }

    return (<>
        <div className="card">
            <div className="card-content">
                <div className="content">
                    <div className="columns is-mobile ">
                        <div className='column is-half'>
                            Partido iniciado el {partido.fecha} a las {partido.horaInicio}
                        </div>
                        <div className='column is-half'>
                            {partido.estado != 0 && partido.estado != -1 && <div className="notification is-success">  Partido en curso,
                                elapsados {horaConvertida + " "}
                                minutos</div>}
                            <button className='button is-primary' onClick={()=>{
                                navigate(`/evento/crear/${id}`)
                            }}>
                                Crear eventos para este partido
                            </button>
                        </div>
                    </div>
                    <div className='column is-full'>Resultado preliminar:</div>
                    <div className="columns is-gapless ">
                        <div className='column is-third'>
                            <div className="has-text-centered">
                                {partido.golesEquipo1}
                            </div>
                        </div>

                        <div className='column is-third'>
                            <div className="has-text-centered">
                                {partido.golesEquipo2}
                            </div>
                        </div>
                    </div>
                    <div className='columns '>
                        <div className='column is-half has-text-centered'>
                            <div className='holder'>
                                <Imagen nombreDeRecurso={partido.equipo1_id} nombreDeCarpeta={'icons'}></Imagen>
                            </div>
                            <div className='content is-small'>
                                <ul>
                                    {partido.eventos && partido.eventos.map((evento) => (
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
                        <div className='column is-half  has-text-centered'>
                            <div className='holder'>
                                <Imagen nombreDeRecurso={partido.equipo2_id} nombreDeCarpeta={'icons'}></Imagen>
                            </div>
                            <div className='content is-small'>
                                <ul>
                                    {partido.eventos && partido.eventos.map((evento) => (
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


    </>);
}

export default PartidoUnitario;