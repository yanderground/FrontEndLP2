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
  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/pedidos`;

  const [dataPedido, setDataPedido] = useState(0);
  const [dataEntrega, setDataEntrega] = useState(0);
  const [idGerente, setIdGerente] = useState(0);
  const [idFornecedor, setIdFornecedor] = useState(0);
  const [idProduto, setIdProduto] = useState(0);
  const [quantidade, setQuantidade] = useState(0);
  const [precoTotal, setPrecoTotal] = useState(0);

  const [dados] = useState([]);
  const [itensPedido, setItensPedido] = useState([]);

  const [dadosGerentes, setDadosGerentes] = useState(null);
  const [dadosFornecedores, setDadosFornecedors] = useState(null);
  const [dadosProdutos, setDadosProdutos] = useState(null);

  useEffect(() => {
    inicializar(); // eslint-disable-next-line
    buscarGerentes(); // eslint-disable-next-line
    buscarProdutos(); // eslint-disable-next-line
    buscarFornecedores(); // eslint-disable-next-line
  }, [idParam]);

  function inicializar() {
    if (idParam == null) {
      setIdGerente(0);
      setIdFornecedor(0);
      setPrecoTotal(0);
      setDataEntrega('');
      setDataPedido('');

    } else {
      setIdGerente(dados.idGerente);
      setIdFornecedor(dados.idFornecedor);
      setPrecoTotal(dados.precoTotal);
      setDataEntrega(dados.dataEntrega);
      setDataPedido(dados.dataPedido);
    }
  }

  async function buscarProdutos() {
    await axios.get(`${BASE_URL}/produtos`).then(async (response) => {
      const produtos = response.data;
      const produtosCompletos = await Promise.all(
        produtos.map(async (produto) => {
          const corResponse = await axios.get(
            `${BASE_URL}/cores/${produto.idCor}`
          );
          const tamanhoResponse = await axios.get(
            `${BASE_URL}/tamanhos/${produto.idTamanho}`
          );
          const generoResponse = await axios.get(
            `${BASE_URL}/generos/${produto.idGenero}`
          );
          const cor = corResponse.data.nomeCor;
          const tamanho = tamanhoResponse.data.nomeTamanho;
          const genero = generoResponse.data.nomeGenero;
          return {
            ...produto,
            cor,
            tamanho,
            genero,
          };
        })
      );

      setDadosProdutos(produtosCompletos);
    });
  }

  async function salvar() {
    const pedidoData = {
      idGerente,
      idFornecedor,
      dataPedido: new Date(dataPedido).toISOString(),
      dataEntrega: new Date(dataEntrega).toISOString(),
      precoTotal,
    };
    const data = JSON.stringify(pedidoData);
    try {
      const response = await axios.post(baseURL, data, {
        headers: { 'Content-Type': 'application/json' },
      });
      const pedidoId = response.data.id;
      const pedidoProdutoDataList = itensPedido.map((item) => ({
        idProduto: item.produto.id,
        idPedido: pedidoId,
        //if(item.produto.quantidadeMin <= item.quantidade && item.produto.quantidadeMax >= item.quantidade){
          quantidade: item.quantidade,
        //}
      }));
      for (const pedidoProdutoData of pedidoProdutoDataList) {
        try {
          await axios.post(`${BASE_URL}/produtos-pedido`, pedidoProdutoData, {
            headers: { 'Content-Type': 'application/json' },
          });
        } catch (error) {
          mensagemErro(error.response.data);
        }
      }

      mensagemSucesso('Pedido realizado com sucesso!');
      navigate(`/listagem-pedidos`);
    } catch (error) {
      console.log(error)
      mensagemErro(error.response.data);
    }
  }

  async function buscarGerentes() {
    axios.get(`${BASE_URL}/gerentes`).then((response) => {
      setDadosGerentes(response.data);
    });
  };

  async function buscarFornecedores() {
    axios.get(`${BASE_URL}/fornecedores`).then((response) => {
      setDadosFornecedors(response.data);
    });
  };

  if (!dados) return null;
  if (!dadosGerentes) return null;
  if (!dadosFornecedores) return null;
  if (!dadosProdutos) return null;

  const adicionarItemPedido = () => {
    const itemSelecionado = dadosProdutos.find((dado) => dado.id === idProduto);

    if (itemSelecionado) {
      const itemPedido = {
        produto: itemSelecionado,
        quantidade,
        valorUnitario: itemSelecionado.precoUnitario,
      };

      setItensPedido([...itensPedido, itemPedido]);
    }
  };

  const removerItem = (item) => {
    const novaLista = itensPedido.filter((i) => i !== item);
    setItensPedido(novaLista);
  };

  return (
    <div className='container'>
      <Card title='Realizar Pedidos'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Gerente: *' htmlFor='selectGerente'>
                <select
                  className='form-select'
                  id='selectGerente'
                  name='idGerente'
                  value={idGerente}
                  onChange={(e) => setIdGerente(e.target.value)}
                >
                  <option value={0}>Selecione...</option>
                  {dadosGerentes.map((dado) => (
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
                  <option value={0}>Selecione...</option>
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

              <FormGroup label="Produto">
                <select
                  className="form-control"
                  value={idProduto}
                  onChange={(e) => setIdProduto(Number(e.target.value))}
                >
                  <option value={0}>Selecione...</option>
                  {dadosProdutos &&
                    dadosProdutos.map((produto) => (

                      <option key={produto.id} value={produto.id}>
                        {produto.nome} - {produto.cor} - {produto.tamanho} - {produto.genero}
                      </option>
                    ))}
                </select>
              </FormGroup>

              <FormGroup label='Quantidade: *' htmlFor='inputQuantidade'>
                <input
                  type='number'
                  className='form-control'
                  id='inputQuantidade'
                  name='quantidade'
                  value={quantidade}
                  onChange={(e) => setQuantidade(Number(e.target.value))}
                />
              </FormGroup>
              <Stack spacing={1} padding={1} direction='row'>
                {/* Renderizar os itens de pedido */}
                {itensPedido.length > 0 && (
                  <div>
                    <h4>Itens do Pedido:</h4>
                    <ul>
                      {itensPedido.map((item, index) => (
                        <li key={index}>
                          {item.produto.nome} {item.produto.cor} {item.produto.tamanho} {item.produto.genero} - Quantidade: {item.quantidade}
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
              </Stack>

              <Stack spacing={1} padding={1} direction='row'>
                <button onClick={adicionarItemPedido} type='button' className='btn btn-sm btn-success'>
                  Adicionar Item
                </button>
              </Stack>
              <FormGroup label='Valor Total: *' htmlFor='inputprecoTotal'>
                <input
                  type='number'
                  className='form-control'
                  id='inputprecoTotal'
                  name='precoTotal'
                  value={precoTotal}
                  onChange={(e) => setPrecoTotal(e.target.value)}
                />
              </FormGroup>
              <Stack spacing={1} padding={1} direction='row'>
                <button onClick={salvar} type='button' className='btn btn-success'>
                  Salvar
                </button>
              </Stack>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CadastrarPedido;