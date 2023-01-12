import React from 'react';

import { Route, Routes, BrowserRouter } from 'react-router-dom';
import CadastroPedido from './views/cadastro-pedido';
import CadastroFuncionario from './views/cadastro-funcionario';
import ListagemFuncionarios from './views/listagem-funcionarios';
import CadastroProduto from './views/cadastro-produto';
import CadastroFornecedor from './views/cadastro-fornecedor';
import CadastroCliente from './views/cadastro-cliente';
import CadastroTamanho from './views/cadastro-tamanho';
import CadastroCor from './views/cadastro-cor';
import CadastroDepartamento from './views/cadastro-departamento';
import RealizarVenda from './views/realizar-venda';

function Rotas(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/cadastro-pedido' element={<CadastroPedido />} />
        <Route path='/cadastro-funcionario' element={<CadastroFuncionario />} />
        <Route path='/listagem-funcionarios' element={<ListagemFuncionarios />} />
        <Route path='/cadastro-produto' element={<CadastroProduto />} />
        <Route path='/cadastro-fornecedor' element={<CadastroFornecedor />} />
        <Route path='/cadastro-cliente' element={<CadastroCliente />} />
        <Route path='/cadastro-tamanho' element={<CadastroTamanho />} />
        <Route path='/cadastro-cor' element={<CadastroCor />} />
        <Route path='/cadastro-departamento' element={<CadastroDepartamento />} />
        <Route path='/realizar-venda' element={<RealizarVenda />} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default Rotas;