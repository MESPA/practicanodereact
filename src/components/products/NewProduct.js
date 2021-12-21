import React, {Fragment,useState} from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios'
import { withRouter } from 'react-router';

const NewProduct = ({history}) => {

    //products = state , saveproduct = setState
    const [product,SaveProduct] = useState({
        nombre:'',
        precio:''
    });

    //Archivos = state , saveArchivo = setArchivo
    const [archivo, saveArchivo] = useState('');

    //almacena EL NUEVO producto en la base de datos
    const AddProduct = async e => {
            e.preventDefault();
            // crear un forrdata para subir las imagenes y archivo como se probo en postman
            const formData = new FormData();
            formData.append('nombre',product.nombre,);
            formData.append('precio',product.precio,);
            formData.append('imagen',archivo,);
        //almacenar en la base de datos imagenes
        try {

            const res = await clienteAxios.post('/products', formData,{
                headers:{
                    'Content-Type' : 'multipart/form-data'
                }
            });

            //lanzar alerta
            if(res.status === 200)
            {
                Swal.fire(
                    'Producto agregado con exito',
                    res.data.message ,
                    'success'
                  )
            }
                 //redireccionar en react
        history.push('/productos')
            //console.log(res)
            
        } catch (error) {
            console.log(error)
            Swal.fire({
                type:'hubo un error',
                title:'Hubo un error',
                text:'vuelva a intentarlo'
            })
        }

            
            

    }

    //read date the form
    const LeerInfProduct = e =>{
        SaveProduct({
            //obtener un acopia del starte
            ...product,
            [e.target.name]: e.target.value
        })

    }
    //leer  in  of the archive
    const LeerInfArchivo = e =>{

        saveArchivo(e.target.files[0])
    }

    return (  

      <Fragment>
            <h2>
            Nuevo Productos
        </h2>
        <form onSubmit ={AddProduct} >
        <legend>Llena todos los campos</legend>

        <div className="campo">
            <label>Nombre:</label>
            <input type="text" placeholder="Nombre Producto" name="nombre"
            onChange={LeerInfProduct}
            />
        </div>

        <div className="campo">
            <label>Precio:</label>
            <input type="number" name="precio" min="0.00" step="0.01" placeholder="Precio" 
            onChange={LeerInfProduct}
            />
        </div>
    
        <div className="campo">
            <label>Imagen:</label>
            <input type="file"  name="imagen" 
            onChange={LeerInfArchivo}
            />
        </div>

        <div className="enviar">
                <input type="submit" className="btn btn-azul" value="Agregar Producto"/>
        </div>
    </form>
      </Fragment>

    );
}
 
export default withRouter(NewProduct);