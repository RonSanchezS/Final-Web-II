import React from 'react'
import { useNavigate } from 'react-router-dom';
import VerGrupoPorColumna from './CRUD/Grupo/VerColumnas';
import PartidoRandom from './CRUD/Partido/partidoRandom';
import Imagen from './Imagen/Imagen';


const Inicio = () => {
    const navigate = useNavigate();


    return (<>
        <div className='debil'>
            <div className='glass'>
                <div>
                    <div className="hero-body">
                        <p className="title">
                            8 Grupos
                        </p>
                        <p className="subtitle">
                            64 oportunidades de ser campeón
                        </p>
                    </div>
                </div>
            </div>
            <div id='grupos'>
                <VerGrupoPorColumna></VerGrupoPorColumna>
            </div>
        </div>
        <Imagen className='imagenz' nombreDeRecurso={'qatar'} nombreDeCarpeta={'noimportant'}></Imagen>
        <div className='wrapper'>
            <Imagen className='hola' nombreDeRecurso={'futo'} nombreDeCarpeta={'noimportant'}></Imagen>
            <div className='banner' onClick={() => {
                navigate('/verpartidos')
            }}>
                <div className="hero-body">
                    <p className="title">
                        Los partidos mas emocionantes de la historia
                    </p>
                    <p className="subtitle">
                        Solo en esta pagina
                    </p>
                </div>
                <PartidoRandom />

            </div>
        </div>
        <div id='idolos' className='columns'>
            <Imagen className='column' nombreDeRecurso={'chobi'} nombreDeCarpeta={'players'}></Imagen>
            <Imagen className='column' nombreDeRecurso={'lucho'} nombreDeCarpeta={'players'}></Imagen>
            <Imagen className='column' nombreDeRecurso={'messi'} nombreDeCarpeta={'players'}></Imagen>
        </div>
        <div id="sector7" className="hero is-link" onClick={() => {
            navigate('/verequipos')
        }}>
            <div className="hero-body">
                <p className="title">
                    Tus idolos en el mundial
                </p>
                <p className="subtitle">
                    En un mismo lugar
                </p>
            </div>

        </div>



    </>);
}

export default Inicio;