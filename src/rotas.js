import React from 'react';

import { Route, Routes, BrowserRouter } from 'react-router-dom';

import CadastroPedido from './views/cadastro-pedido';

import CadastroGerente from './views/cadastro-gerente';
import CadastroFuncionario from './views/cadastro-funcionario';
import ListagemFuncionarios from './views/listagem-funcionarios';

import CadastroProduto from './views/cadastro-produto';

import CadastroFornecedor from './views/cadastro-fornecedor';
import ListagemFornecedores from './views/listagem-fornecedores';

import CadastroCliente from './views/cadastro-cliente';
import ListagemClientes from './views/listagem-clientes';

import ListagemTamanhos from './views/listagem-tamanhos';
import CadastroTamanho from './views/cadastro-tamanho';

import ListagemCores from './views/listagem-cores';
import CadastroCor from './views/cadastro-cor';

import ListagemDepartamentos from './views/listagem-departamentos';
import CadastroDepartamento from './views/cadastro-departamento';

import RealizarVenda from './views/realizar-venda';

function Rotas(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/cadastro-pedido/:idParam' element={<CadastroPedido />} />
        <Route path='/cadastro-produto/:idParam' element={<CadastroProduto />} />
        <Route path='/cadastro-produto/' element={<CadastroProduto />} />
        <Route path='/realizar-venda' element={<RealizarVenda />} />

        <Route path='/cadastro-gerente/:idParam' element={<CadastroGerente />} />
        <Route path='/cadastro-gerente/' element={<CadastroGerente />} />
        <Route path='/cadastro-funcionario/:idParam' element={<CadastroFuncionario />} />
        <Route path='/cadastro-funcionario/' element={<CadastroFuncionario />} />
        <Route path='/listagem-funcionarios' element={<ListagemFuncionarios />} />


        <Route path='/cadastro-fornecedor/:idParam' element={<CadastroFornecedor />} />
        <Route path='/cadastro-fornecedor/' element={<CadastroFornecedor />} />
        <Route path='/listagem-fornecedores' element={<ListagemFornecedores />} />

        <Route path='/cadastro-cliente/:idParam' element={<CadastroCliente />} />
        <Route path='/cadastro-cliente/' element={<CadastroCliente />} />
        <Route path='/listagem-clientes' element={<ListagemClientes />} />

        <Route path='/cadastro-tamanho/:idParam' element={<CadastroTamanho />} />
        <Route path='/cadastro-tamanho/' element={<CadastroTamanho />} />
        <Route path='/listagem-tamanhos' element={<ListagemTamanhos />} />

        <Route path='/cadastro-cor/:idParam' element={<CadastroCor />} />
        <Route path='/cadastro-cor/' element={<CadastroCor />} />
        <Route path='/listagem-cores/' element={<ListagemCores />} />

        <Route path='/cadastro-departamento/:idParam' element={<CadastroDepartamento />} />
        <Route path='/cadastro-departamento/' element={<CadastroDepartamento />} />
        <Route path='/listagem-departamentos' element={<ListagemDepartamentos />} />

      </Routes>
      
    </BrowserRouter>
  );
}

export default Rotas;