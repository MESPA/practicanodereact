import React,{Fragment,useState,useEffect} from 'react';
import clienteAxios from '../../config/axios'
import Swal from 'sweetalert2'
import { withRouter } from 'react-router';

//redireccionar en react
function EditClient (props)  {

    const {id} = props.match.params;

    /** Cliente = state, saveclient = funcion para guardar el state */
    const [clientNew,GuardarClient]= useState({
        nombre:'',
        apellido:'',
        empresa:'',
        email:'',
        telefono:''
    })

   

    //query a la apellido

    const consultaApi = async () =>{
        const clieteconsulta = await clienteAxios.get(`/clients/${id}`);
        //console.log(clieteconsulta.data)
        //colocar en el starte
        GuardarClient(clieteconsulta.data);
    }

    //useEfect cuando el componente cambia

    useEffect(()=>{
        consultaApi();
    },[])
    //leer los datos del Formularios
    const updateState = e =>{

        //almacena lo que escribe el usuario en el starte
        GuardarClient({
            //obtener una copia del state actual
            ...clientNew,
            [e.target.name]: e.target.value
        })

    }

    //enviar datos a la por axios para actualizar el clienteAxios
    const  Actualizarcliente = (e ) =>  {
        e.preventDefault();
        //enviar 
        clienteAxios.put(`/clients/${clientNew._id}`, clientNew)
        .then(res =>{
            if (res.data.code === 11000) {

                console.log('Error en dupicidad de mongo')

                Swal.fire(
                    'Error  al guardar el cliente',
                    'Error en dupicidad de mongo' ,
                    'error'
                  )
                
            } else {
               

                Swal.fire(
                    'Se Guardo el cliente',
                    'Se Actuazo Correctamente',
                    'success'
                  )
            }

            //redireccionar a la raiz
            props.history.push('/');
        })
    }

    //validar formularios
    const validarclient = ()=>{

        const {nombre,apellido,email,empresa,telefono} = clientNew;
        let valido = (!nombre ).length || !apellido.length || !email.length || !empresa.length || !telefono.length;
        //return true o false
        return valido;
    }

   
        //redireccionar en react
       

    

    return (  
        <Fragment>
                  <h1>Editar Cliente</h1>

                   <form onSubmit = {Actualizarcliente}>
                <legend>Verifica todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" 
                    placeholder="Nombre Cliente" 
                    name="nombre"
                    onChange={updateState}
                    //value={clientNew.nombre}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text" 
                    placeholder="Apellido Cliente" 
                    name="apellido" 
                    onChange={updateState}
                    value={clientNew.apellido}
                    />
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text" 
                    placeholder="Empresa Cliente" 
                    name="empresa"
                    onChange={updateState}
                    value={clientNew.empresa}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email" 
                    placeholder="Email Cliente" 
                    name="email"
                    onChange={updateState}
                    value={clientNew.email}
                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="text" 
                    placeholder="Teléfono Cliente" 
                    name="telefono"
                    onChange={updateState}
                    value={clientNew.telefono}
                    />
                </div>

                <div className="enviar">
                        <input type="submit" className="btn btn-azul" value="Guardar Cliente"
                       disabled = {validarclient()}
                        />
                </div>

            </form>
        </Fragment>

    );
}
//redireccionar en react
//HOC es una funtion que toma un componente y retorna un nuevo componente
export default withRouter( EditClient);