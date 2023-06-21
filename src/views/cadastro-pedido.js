import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastrarPedido() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/pedidos`;

  const [id, setId] = useState(0);
  const [dataPedido, setDataPedido] = useState(0);
  const [dataEntrega, setDataEntrega] = useState(0);
  const [idGerente, setIdGerente] = useState(0);
  const [idFornecedor, setIdFornecedor] = useState(0);
  const [idProduto, setIdProduto] = useState(0);
  const [quantidade, setQuantidade] = useState(0);

  const [dados, setDados] = React.useState([]);

  const [itensProduto, setItensProduto] = useState([]);

  function inicializar() {
    if (idParam == null) {
      setId(0);
      setIdProduto(0);
      setIdGerente(0);
      setIdFornecedor(0);
      setDataEntrega('');
      setDataPedido('');
    } else {
      setId(dados.id);
      setIdProduto(dados.idProduto);
      setIdGerente(dados.idGerente);
      setIdFornecedor(dados.idFornecedor);
      setDataEntrega(dados.dataEntrega);
      setDataPedido(dados.dataPedido);
    }
  }

  async function salvar() {
    let data = { id, dataEntrega, dataPedido, idGerente, idFornecedor, idProduto, itensProduto };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Pedido realizado com sucesso!`);
          navigate(`/listagem-Pedidos`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    } else {
      await axios
        .put(`${baseURL}/${idParam}`, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Pedido ${id} alterado com sucesso!`);
          navigate(`/listagem-Pedidos`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    }
  }

  async function buscar() {
    await axios.get(`${baseURL}/${idParam}`).then((response) => {
      setDados(response.data);
    });
    setId(dados.id);
    setDataEntrega(dados.dataEntrega);
    setDataPedido(dados.dataPedido);
    setIdGerente(dados.idGerente);
    setIdFornecedor(dados.idFornecedor);
    setIdProduto(dados.idProduto);
    setItensProduto(dados.itensProduto);
  }

  const cadastrarFornecedor = () => {
    navigate(`/cadastro-fornecedor`);
  };

  const [dadosGerentes, setDadosGerentes] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/gerentes`).then((response) => {
      setDadosGerentes(response.data);
    });
  }, []);

  const [dadosFornecedores, setDadosFornecedors] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/fornecedores`).then((response) => {
      setDadosFornecedors(response.data);
    });
  }, []);

  const [dadosMetodoPagamentos, setDadosMetodoPagamentos] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/metodoPagamentos`).then((response) => {
      setDadosMetodoPagamentos(response.data);
    });
  }, []);

  const [dadosProdutos, setDadosProdutos] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/produtos`).then((response) => {
      setDadosProdutos(response.data);
    });
  }, []);

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;
  if (!dadosGerentes) return null;
  if (!dadosFornecedores) return null;
  if (!dadosProdutos) return null;

  const adicionarItem = () => {
    const novoItem = {
      produto: { nome: '', quantidade: 0 },
    };
    setItensProduto([...itensProduto, novoItem]);
  };

  const removerItem = (index) => {
    const novosItens = [...itensProduto];
    novosItens.splice(index, 1);
    setItensProduto(novosItens);
  };

  return (
    <div className='container'>
      <Card title='Realizar Pedidos'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Produto: *' htmlFor='selectProduto'>
                <select
                  className='form-select'
                  id='selectProduto'
                  name='idProduto'
                  value={idProduto}
                  onChange={(e) => setIdProduto(e.target.value)}
                >
                  <option key='0' value='0'></option>
                  {dadosProdutos.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>
  
              <FormGroup label='Fornecedor: *' htmlFor='selectFornecedor'>
                <select
                  className='form-select'
                  id='selectFornecedor'
                  name='idFornecedor'
                  value={idFornecedor}
                  onChange={(e) => setIdFornecedor(e.target.value)}
                >
                  <option key='0' value='0'></option>
                  {dadosFornecedores.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>
  
              <FormGroup label='Data do Pedido: *' htmlFor='inputDataPedido'>
                <input
                  type='date'
                  className='form-control'
                  id='inputDataPedido'
                  name='dataPedido'
                  value={dataPedido}
                  onChange={(e) => setDataPedido(e.target.value)}
                />
              </FormGroup>
  
              <FormGroup label='Data da Entrega: *' htmlFor='inputDataEntrega'>
                <input
                  type='date'
                  className='form-control'
                  id='inputDataEntrega'
                  name='dataEntrega'
                  value={dataEntrega}
                  onChange={(e) => setDataEntrega(e.target.value)}
                />
              </FormGroup>
  
              {/* Renderizar os itens de pedido */}
              {itensProduto.length > 0 && (
                <div>
                  <h4>Itens do Pedido:</h4>
                  <ul>
                    {itensProduto.map((item, index) => (
                      <li key={index}>
                        {item.produto.nome} - Quantidade: {item.quantidade} - Valor Total: {item.valorTotal}
                        <button
                          onClick={() => removerItem(index)}
                          type='button'
                          className='btn btn-sm btn-danger'
                          style={{ marginLeft: '10px' }}
                        >
                          Remover
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
  
              <FormGroup label='Quantidade: *' htmlFor='inputQuantidade'>
                <input
                  type='number'
                  className='form-control'
                  id='inputQuantidade'
                  name='quantidade'
                  value={quantidade}
                  onChange={(e) => setQuantidade(e.target.value)}
                />
              </FormGroup>
  
              <Stack spacing={1} padding={1} direction='row'>
                <button onClick={adicionarItem} type='button' className='btn btn-sm btn-success'>
                  Adicionar Item
                </button>
              </Stack>
  
              <button onClick={salvar} type='button' className='btn btn-success'>
                Salvar
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
  
}

export default CadastrarPedido;
