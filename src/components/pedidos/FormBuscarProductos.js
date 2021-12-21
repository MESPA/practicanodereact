import React from 'react';

function FormBuscarProductos(props) {
    
    return(
        <form 
        onSubmit={props.buscarProductos}
        >
                <legend>Busca un Producto y agrega una cantidad</legend>

                <div class="campo">
                    <label>Productos:</label>
                    <input type="text" placeholder="Nombre Productos" name="productos" onChange={props.leerDaosBusqueda}/>
                </div>
                <input type="submit" className ="btn btn-azul btn-block" value="Buscar Producto"/>
         </form>
    )
}

export default FormBuscarProductos;