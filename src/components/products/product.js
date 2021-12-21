import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios'


const Product = ({product}) => {

    const deleteProduct = id =>{
          Swal.fire({
            title: 'Estas Seguro?',
            text: "El Producto Eliminado no se puede recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar'
          }).then((result) => {
            if (result.isConfirmed) {
              //llamado a xios
              clienteAxios.delete(`/products/${id}`)
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
    
    const {_id,nombre,precio,imagen} = product;
    return (  

        <li className="producto">
        <div className="info-producto">
            <p className="nombre">{nombre}</p>
            <p className="precio">{precio}</p>
            { imagen ? ( <img src={`http://localhost:5000/${imagen}`} />) : null}
        </div>
        <div className="acciones">
            <Link to={`/productos/EditClient/${_id}`} className="btn btn-azul">
                <i className="fas fa-pen-alt"></i>
                Editar Producto
            </Link>

            <button type="button" className="btn btn-rojo btn-eliminar"
            onClick= {() => (deleteProduct(_id))}
            >
                <i className="fas fa-times"></i>
                Eliminar Cliente
            </button>
        </div>
    </li>

    );
}
 
export default Product;

