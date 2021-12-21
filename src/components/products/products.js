import React,{Fragment,useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import clienteAxios from '../../config/axios'
//llamar componente product
import Product from './product';
//import Spinner  from '../layout/Spinner'

const Productos = () => {


    //productos = state,saveproduct = function for save product the state
    const [products ,SaveProducts] = useState([]);

    //useEffect for consult api when  load
    useEffect(() =>{
        //query to the api
        const consultApi =  async () => {
            const productsconsult = await clienteAxios.get('/products');
            //console.log(productsconsult)

            SaveProducts(productsconsult.data)
        }
        //llamado al api
        consultApi();

    },[products])

    //call Spinner de carga
    //if(!products.length) {return <Spinner/>; }
    

    return (  
        <Fragment>

                
                <h2>Productos</h2>

                    <Link to={'/productos/NewProduct'} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                        Nuevo Producto
                    </Link>

            <ul className="listado-productos">
                {products.map(product => (
                    <Product
                    key={product._id}
                    product={product}
                    />
                ))}

            </ul>
        </Fragment>
    

    );
}
 
export default Productos;