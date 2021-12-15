import React,{Fragment,useState} from 'react';
import clienteAxios from '../../config/axios'
import Swal from 'sweetalert2'
import { withRouter } from 'react-router';

//redireccionar en react
function NewClient ({history})  {

    /** Cliente = state, saveclient = funcion para guardar el state */
    const [clientNew,SaveClient]= useState({
        nombre:'',
        apellido:'',
        empresa:'',
        email:'',
        telefono:''
    })



    //leer los datos del Formularios
    const updateState = e =>{

        //almacena lo que escribe el usuario en el starte
        SaveClient({
            //obtener una copia del state actual
            ...clientNew,
            [e.target.name]: e.target.value
        })

    
    }

    //validar formularios
    const validarclient = ()=>{

        const {nombre,apellido,email,empresa,telefono} = clientNew;
        let valido = !nombre.length || !apellido.length || !email.length || !empresa.length || !telefono.length;
        //return true o false
        return valido;
    }

    const addcliente = e => {
        e.preventDefault();

        //send peticon
        clienteAxios.post('/clients',clientNew)
        .then(res => {
            if (res.data.code === 11000) {

                console.log('Error en dupicidad de mongo')

                Swal.fire(
                    'Error  al agrego el cliente',
                    'Error en dupicidad de mongo' ,
                    'error'
                  )
                
            } else {
               

                Swal.fire(
                    'Se agrego el cliente',
                    res.data.message,
                    'success'
                  )
            }

            
        })
        //redireccionar en react
        history.push('/')

    }

    return (  
        <Fragment>
                  <h1>Nuevo Cliente</h1>

                   <form  onSubmit={addcliente}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" 
                    placeholder="Nombre Cliente" 
                    name="nombre"
                    onChange={updateState}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text" 
                    placeholder="Apellido Cliente" 
                    name="apellido" 
                    onChange={updateState}
                    />
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text" 
                    placeholder="Empresa Cliente" 
                    name="empresa"
                    onChange={updateState}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email" 
                    placeholder="Email Cliente" 
                    name="email"
                    onChange={updateState}
                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="text" 
                    placeholder="Teléfono Cliente" 
                    name="telefono"
                    onChange={updateState}
                    />
                </div>

                <div className="enviar">
                        <input type="submit" className="btn btn-azul" value="Agregar Cliente"
                       disabled = {validarclient()}
                        />
                </div>

            </form>
        </Fragment>

    );
}
//redireccionar en react
//HOC es una funtion que toma un componente y retorna un nuevo componente
export default withRouter( NewClient);