import React from 'react';
import 'bootswatch/dist/flatly/bootstrap.css';
import './custom.css';
import 'toastr/build/toastr.min';
import 'toastr/build/toastr.css';
import Navbar from './components/navbar.js';
import Rotas from './rotas.js';

import CadastroFuncionario from './views/cadastro-funcionario';
import CadastroFornecedor from './views/cadastro-fornecedor';
import CadastroProduto from './views/cadastro-produto';
import CadastroPedido from './views/cadastro-pedido';

class App extends React.Component {
  render() {
    return (
      
        <div className='container'>
        <Rotas />
        <Navbar />
        </div>
      
      
    );
  }
}

export default App;
