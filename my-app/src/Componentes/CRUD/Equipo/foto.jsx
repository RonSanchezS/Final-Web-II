import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import {Button, Card, Form, FormControl} from 'react-bootstrap';

const Foto = () => {
    const { id } = useParams();



    const [nombre, setnombre] = useState([]);

    useEffect(() => {
        //get token
        if(!localStorage.getItem('token')){
            navigate('/login')
        }

        try {
        } catch (err) {
            setnombre("album");
        }

    })




    const navigate = useNavigate();
    const [imagen, setImagen] = useState(null);
    const [validated, setValidated] = useState(false);
    const [errors, setErrors] = useState({});
    const uploadPhoto = () => {
        const formData = new FormData();
        formData.append('imagen', imagen);
        axios.post(`http://localhost:8000/api/xxx/${id}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }
        ).then(res => {
            console.log(res);
            navigate('/');
           
        }
        ).catch(err => {
            console.log(err);
        });
    }
    const handleSubmit = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();
       
        uploadPhoto();
    }
    return (
        <>
            <Card className='mt-3 mb-3'>
                <Card.Body>
                    <Card.Title><h1>Foto de {nombre} con id {id}</h1></Card.Title>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>

                        <div>
                            <div>
                                <label>Seleccione su Foto:</label>
                                <FormControl type="file" isInvalid={!!errors.imagen} required className='form-control' onChange={(e) => {
                                    setImagen(e.target.files[0]);
                                }} />
                                <Form.Control.Feedback type="invalid">
                                    {errors.imagen}
                                </Form.Control.Feedback>
                            </div>
                            <div>
                                <Button className='mt-2' type="submit">Subir foto</Button>
                            </div>
                        </div>
                    </Form>
                </Card.Body>
            </Card>     
        </>
    );
}


export default Foto;