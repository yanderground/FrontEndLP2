import React from 'react';

import { Route, Routes, BrowserRouter } from 'react-router-dom';
import CadastroPedido from './views/cadastro-pedido';
import CadastroFuncionario from './views/cadastro-funcionario';
import CadastroProduto from './views/cadastro-produto';
import CadastroFornecedor from './views/cadastro-fornecedor';

function Rotas(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/cadastro-pedido' element={<CadastroPedido />} />
        <Route path='/cadastro-funcionario' element={<CadastroFuncionario />} />
        <Route path='/cadastro-produto' element={<CadastroProduto />} />
        <Route path='/cadastro-fornecedor' element={<CadastroFornecedor />} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default Rotas;