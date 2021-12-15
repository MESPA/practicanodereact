import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

function Client  ({cliente})  {
   

    //extraer problema
    const {_id, nombre,apellido,empresa,email,telefono}=cliente;

    const eliminarCliente= id =>{
        Swal.fire({
            title: 'Estas Seguro?',
            text: "On Cliente Eliminado no se puede recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar'
          }).then((result) => {
            if (result.isConfirmed) {
              //llamado a xios
              clienteAxios.delete(`/clients/${id}`)
              .then(res => {
                Swal.fire(
                    'Eliminado!',
                   res.data.message
                   ,
                    'success'
                  )
              })

            }
          })
    }
    return (  

        <li className="cliente">
        <div className="info-cliente">
            <p className="nombre">{nombre} {apellido}</p>
            <p className="empresa">{empresa}</p>
            <p>{email}</p>
            <p>Tel: {telefono}</p>
        </div>
        <div className="acciones">
                 {/** pasasr el id con `` esas comillas*/}
            <Link to={`/clientes/EditClient/${_id}`} className="btn btn-azul">
                <i className="fas fa-pen-alt"></i>
                Editar Cliente
            </Link>
            {/**para pasar el id y eliminar la seleccionada*/}
            <button type="button" className="btn btn-rojo btn-eliminar"
            onClick={()=>eliminarCliente(_id)}
            >
                <i className="fas fa-times"></i>
                Eliminar Cliente
            </button>
        </div>
    </li>
    );
}
 
export default Client;