import React ,{Fragment}from 'react';
//routing
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
//layout
import Header from  './components/layout/Header'
import Navegation from  './components/layout/navegation'

/**componentes */
import Clientes from './components/clients/clientes';
import NewClient from './components/clients/NewClient';
import EditClient from './components/clients/EditClient';


import Pedidos from './components/pedidos/pedidos';
import Productos from './components/products/products';

function App() {

  return (
    <Router>    
        <Fragment>
          <Header />
          <div className="grid contenedor contenido-principal">
          <Navegation />
              <main className="caja-contenido col-9">
              {/**Todo routing a los diferentes componentes */}
                <Switch>
                  <Route exact path="/" component={Clientes}/>
                  <Route exact path="/clientes/NewClient" component={NewClient}/>
                  <Route exact path="/clientes/EditClient/:id" component={EditClient}/>

                  <Route exact path="/productos" component={Productos}/> 

                  <Route exact path="/pedidos" component={Pedidos}/>
                </Switch>

              </main>
          </div>
        </Fragment>
    </Router>

   
  )

}


export default App;
