import React,{Fragment,useState,useEffect} from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios'
import { withRouter } from 'react-router';

const EditProduct = (props) => {

    //obtener id
    const {id} = props.match.params;
    //producto = state , saveproduct = actualizar 
    const [product,saveproduct] = useState({
        nombre:'',
        precio:'',
        imagen:''
      
    })


    //Archivos = state , saveArchivo = setArchivo
    const [archivo, saveArchivo] = useState('');
    //consultApi para traer producto Editar

    const consultaApi = async () => {
        const productsconsult = await clienteAxios.get(`/products/${id}`)
        console.log(productsconsult.data)

        saveproduct (productsconsult.data)
    }

    //use useEfect
    useEffect(() =>{
        consultaApi();
    },[])

    //read date the form
    const LeerInfProduct = e =>{
        saveproduct({
            //obtener un acopia del starte
            ...product,
            [e.target.name]: e.target.value
        })

    }
    //leer  in  of the archive
    const LeerInfArchivo = e =>{

        saveArchivo(e.target.files[0])
    }

    const ActualizarProduct = async e =>{
        e.preventDefault();
        //enviar data para guardar el
    
        const formData = new FormData();
            formData.append('nombre',product.nombre,);
            formData.append('precio',product.precio,);
            formData.append('imagen',archivo,);
        //almacenar en la base de datos imagenes
        try {

            const res = await clienteAxios.put(`/products/${id}`, formData,{
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
                 props.history.push('/productos')
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

    const {nombre,precio,imagen} = product

    return (  

    <Fragment>
    <h2>
           Editar Productos
        </h2>

        <form onSubmit ={ActualizarProduct} >
        <legend>Llena todos los campos</legend>

        <div className="campo">
            <label>Nombre:</label>
            <input type="text" placeholder="Nombre Producto" name="nombre"
            onChange={LeerInfProduct}
            value= {nombre}
            />
        </div>

        <div className="campo">
            <label>Precio:</label>
            <input type="number" name="precio" min="0.00" step="0.01" placeholder="Precio" 
            onChange={LeerInfProduct}
           value= {precio}
           
            />
        </div>
    
        <div className="campo">
            <label>Imagen:</label>
            {/* editar imagen*/}
            { imagen ? ( <img src={`http://localhost:5000/${imagen}`} alt="imagen" width="300" />) : null}
            <input type="file"  name="imagen" 
            onChange={LeerInfArchivo}
           // value= {product.imagen}
          
            />
        </div>

        <div className="enviar">
                <input type="submit" className="btn btn-azul" value="Agregar Producto"/>
        </div>
    </form>

    </Fragment>

    );
}
 
export default withRouter(EditProduct);