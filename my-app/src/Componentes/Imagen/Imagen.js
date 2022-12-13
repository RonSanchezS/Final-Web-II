import React from 'react'
import { useParams } from 'react-router-dom';
const Imagen = ({nombreDeRecurso, nombreDeCarpeta}) => {
    //recieve the parameter from component props

    return (<>
        <img src={`http://localhost:8000/img/${nombreDeCarpeta}/${nombreDeRecurso}.jpg`}></img>
    </>);
}

export default Imagen;