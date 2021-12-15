import React,{useEffect,useState,Fragment} from 'react';
import { Link } from 'react-router-dom';
//importar clienteAxios
import clienteAxios from '../../config/axios'
import Client from './client';

const Clientes = () => {
/**inicio de consumo del api */

        //trabajar con el state
        const [clientes, guardarclientes] = useState([])
        
        //query a la api
        const consultaapi = async () => {
           const clienteconsulta = await clienteAxios.get('/clients')
          //colocar resut state
          guardarclientes(clienteconsulta.data)
        }
    

    //useEffect
    useEffect(() => 
    {
        consultaapi();    
    },[clientes]);

    return (  
/**fin de conectarse y consumir la api */
        <Fragment>
            <h2> Clientes </h2>
            < Link to={"/clientes/NewClient"} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                Nuevo Cliente
            </Link>

            <ul className="listado-clientes">

                {clientes.map(cliente =>(
                    <Client
                    key={cliente._id}
                        cliente={cliente}
                    />

                ))}
            </ul>
        </Fragment>
        

    );
}
 
export default Clientes;