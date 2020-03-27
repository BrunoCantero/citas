import React, { Fragment, useState } from 'react';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';


const Formulario = ({crearCita}) => {
    //crear state de citas
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    }); 

    const [error, actualizarError] = useState(false);
    //actualizar cada que el usuario escribe en un input
    const actualizarState = e => {
        actualizarCita({
            ...cita,
            [e.target.name] : e.target.value
        })
    }

    

    //extraer los valores

    const {mascota, propietario, fecha, hora, sintomas} = cita;

    //cuando el usuario envia el formulario

    const submitCita = e => {
        e.preventDefault();
        
        //validar campos
        if(mascota.trim() === '' || propietario.trim() ==='' || fecha.trim() === '' || hora.trim() === '' || 
        sintomas.trim() === ''){
            actualizarError(true);
            return;
        }

        //eliminar mensaje previo

        actualizarError(false);

        //asignar id
        cita.id = uuid();

        //crear la cita
        crearCita(cita);

        //reiniciar el form
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })
    }

    return (
        <Fragment>
            <h2>crear cita</h2>

                {error ? <p className="alerta-error" >todos los campos son obligatorios</p>  : null}
                <form 
                    onSubmit={submitCita}
                >
                <label>nombre mascota</label>
                <input 
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="nombre mascota"
                    onChange={actualizarState}
                    value={mascota}
                />
                <label>dueño</label>
                <input 
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="nombre dueño"
                    onChange={actualizarState}
                    value={propietario}
                />
                <label>Fecha</label>
                <input 
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />
                <label>Hora</label>
                <input 
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />
                <label>Sintomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={actualizarState}
                    value={sintomas}
                >
                </textarea>
                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar Cita</button>
                </form>
        </Fragment>
    )
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired,
}

export default Formulario;