import React ,{useEffect,useState,Fragment} from 'react';
import clienteAxios from '../../config/axios'
import FormBuscarProductos from './FormBuscarProductos'


function NewPedidos(props) {

    //extraer id
    const {id} = props.match.params;

    //useState id
    const [client, Saveclient] = useState([]);
    
    // useEffect consultar api
    useEffect(() => {
        // cunsultar api
        const consultarApi = async () => {
            const consultarcliente = await clienteAxios.get(`/clients/${id}`)
            Saveclient(consultarcliente.data);
        }
        consultarApi();
    },[])


    const buscarProductos = () => {

    }

    const leerDaosBusqueda = () => {

    }

    return(

        <Fragment>
            <h2>Nuevo Pedido</h2>
        <form >

            
        <div class="ficha-cliente">
                <h3>Datos de Cliente</h3>
                <p>Nombres: {client.nombre}  {client.apellido}</p>
                <p>Telefonos: {client.telefono}  </p>
            </div>
        

        <FormBuscarProductos
         buscarProductos = { buscarProductos }
         leerDaosBusqueda = {leerDaosBusqueda}
        />

        <ul className="resumen">
            <li>
                <div className="texto-producto">
                    <p className="nombre">Macbook Pro</p>
                    <p className="precio">$250</p>
                </div>
                <div className="acciones">
                    <div className="contenedor-cantidad">
                        <i className="fas fa-minus"></i>
                        <input type="text" name="cantidad" />
                        <i className="fas fa-plus"></i>
                    </div>
                    <button type="button" className="btn btn-rojo">
                        <i className="fas fa-minus-circle"></i>
                            Eliminar Producto
                    </button>
                </div>
            </li>
           
        </ul>
        <div className="campo">
            <label>Total:</label>
            <input type="number" name="precio" placeholder="Precio" readonly="readonly" />
        </div>
        <div className="enviar">
            <input type="submit" className="btn btn-azul" value="Agregar Pedido"/>
        </div>
    </form>

        </Fragment>

    );
}
 
export default NewPedidos;