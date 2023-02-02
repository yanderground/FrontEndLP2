import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL, BASE_URL_2, BASE_URL_3 } from '../config/axios';

function RealizarVenda() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL_3}/vendas`;

  const [id, setId] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);
  const [idFuncionario, setIdFuncionario] = useState(0);
  const [idCliente, setIdCliente] = useState(0);
  const [idMetodoPagamento, setIdMetodoPagamento] = useState(0);
  const [idProduto, setIdProduto] = useState(0);

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId(0);
      setIdProduto(0);
      setIdFuncionario(0);
      setIdCliente(0);
      setIdMetodoPagamento(0);
      setValorTotal(0);
    } else {
      setId(dados.id);
      setIdProduto(dados.idProduto);
      setIdFuncionario(dados.idFuncionario);
      setIdCliente(dados.idCliente);
      setIdMetodoPagamento(dados.idMetodoPagamento);
      setValorTotal(dados.valorTotal);
    }
  }

  async function salvar() {
    let data = { id, valorTotal, idFuncionario, idCliente, idMetodoPagamento, idProduto };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Venda relizada com sucesso!`);
          navigate(`/listagem-vendas`);
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
          mensagemSucesso(`Venda ${id} alterado com sucesso!`);
          navigate(`/listagem-vendas`);
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
    setValorTotal(dados.ValorTotal);
    setIdFuncionario(dados.idFuncionario);
    setIdCliente(dados.idCliente);
    setIdMetodoPagamento(dados.idMetodoPagamento);
    setIdProduto(dados.idProduto);
  }

   const cadastrarCliente = () => {
    navigate(`/cadastro-cliente`);
  };

  const [dadosFuncionarios, setDadosFuncionarios] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/funcionarios`).then((response) => {
      setDadosFuncionarios(response.data);
    });
  }, []);

  const [dadosClientes, setDadosClientes] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/clientes`).then((response) => {
      setDadosClientes(response.data);
    });
  }, []);

  const [dadosMetodoPagamentos, setDadosMetodoPagamentos] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL_3}/metodoPagamentos`).then((response) => {
      setDadosMetodoPagamentos(response.data);
    });
  }, []);

  const [dadosProdutos, setDadosProdutos] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL_2}/produtos`).then((response) => {
      setDadosProdutos(response.data);
    });
  }, []);

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;
  if (!dadosFuncionarios) return null;
  if (!dadosClientes) return null;
  if (!dadosMetodoPagamentos) return null;
  if (!dadosProdutos) return null;

  return (
    <div className='container'>
      <Card title='Realizar Vendas'>
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
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosProdutos.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>

              <FormGroup label='Cliente: *' htmlFor='selectCliente'>
                <select
                  className='form-select'
                  id='selectCliente'
                  name='idCliente'
                  value={idCliente}
                  onChange={(e) => setIdCliente(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' Ainda não é cadastrado?'}
                  </option>
                  {dadosClientes.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>

              <Stack spacing={1} padding={1} direction='row'>
                <button
                  onClick={cadastrarCliente}
                  type='button'
                  className='btn btn-info'
                >
                  Cadastrar Cliente
                </button>
              </Stack>
              
              <FormGroup label='Metodo de Pagamento: *' htmlFor='selectMetodoPagamento'>
                <select
                  className='form-select'
                  id='selectMetodoPagamento'
                  name='idMetodoPagamento'
                  value={idMetodoPagamento}
                  onChange={(e) => setIdMetodoPagamento(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosMetodoPagamentos.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.titulo}
                    </option>
                  ))}
                </select>
              </FormGroup>

              <FormGroup label='Valor Total: *' htmlFor='inputValorTotal'>
                <input
                  type='text'
                  id='inputValorTotal'
                  value={valorTotal}
                  className='form-control'
                  name='ValorTotal'
                  onChange={(e) => setValorTotal(e.target.value)}
                />
                </FormGroup>

              <Stack spacing={1} padding={1} direction='row'>
                <button
                  onClick={salvar}
                  type='button'
                  className='btn btn-success'
                >
                  Finalizar Venda
                </button>
                <button
                  onClick={inicializar}
                  type='button'
                  className='btn btn-danger'
                >
                  Cancelar
                </button>
              </Stack>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default RealizarVenda;
