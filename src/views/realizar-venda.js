import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function RealizarVenda() {
  const { idParam } = useParams();
  const navigate = useNavigate();
  const baseURL = `${BASE_URL}/vendas`;

  const [id, setId] = useState(0);
  const [precoTotal, setPrecoTotal] = useState(0);
  const [idFuncionario, setIdFuncionario] = useState(0);
  const [idCliente, setIdCliente] = useState(0);
  const [idMetodoPagamento, setIdMetodoPagamento] = useState(0);
  const [idProduto, setIdProduto] = useState(0);

  const [quantidade, setQuantidade] = useState(0);
  const [itensVenda, setItensVenda] = useState([]);

  const [dados, setDados] = React.useState([]);
  const [dadosFuncionarios, setDadosFuncionarios] = React.useState(null);
  const [dadosClientes, setDadosClientes] = React.useState(null);
  const [dadosMetodoPagamentos, setDadosMetodoPagamentos] = React.useState(null);
  const [dadosProdutos, setDadosProdutos] = React.useState(null);

  const adicionarItemVenda = () => {
    const itemSelecionado = dadosProdutos.find((dado) => dado.id === idProduto);

    if (itemSelecionado) {
      const itemVenda = {
        produto: itemSelecionado,
        quantidade,
        valorUnitario: itemSelecionado.precoUnitario,
      };

      setItensVenda([...itensVenda, itemVenda]);
    }
  };

  const removerItem = (item) => {
    const novaLista = itensVenda.filter((i) => i !== item);
    setItensVenda(novaLista);
  };

  useEffect(() => {
    inicializar();

    if (idParam) {
      buscar();
    }

    buscarFuncionarios();
    buscarClientes();
    buscarMetodoPagamentos();
    buscarProdutos();
  }, [idParam]);

  function inicializar() {
    if (idParam == null) {
      setId(0);
      setIdFuncionario(0);
      setIdCliente(0);
      setIdMetodoPagamento(0);
      setPrecoTotal(0);
    } else {
      setId(dados.id);
      setIdFuncionario(dados.idFuncionario);
      setIdCliente(dados.idCliente);
      setIdMetodoPagamento(dados.idMetodoPagamento);
      setPrecoTotal(dados.precoTotal);
    }
  }

  async function buscar() {
    await axios.get(`${baseURL}/${idParam}`).then((response) => {
      setDados(response.data);
    });
  }

  async function buscarFuncionarios() {
    await axios.get(`${BASE_URL}/funcionarios`).then((response) => {
      setDadosFuncionarios(response.data);
    });
  }

  async function buscarClientes() {
    await axios.get(`${BASE_URL}/clientes`).then((response) => {
      setDadosClientes(response.data);
    });
  }

  async function buscarMetodoPagamentos() {
    await axios.get(`${BASE_URL}/metodos-pagamento`).then((response) => {
      setDadosMetodoPagamentos(response.data);
    });
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
    const vendaData = {
      idFuncionario,
      idCliente,
      idMetodoPagamento,
      precoTotal,
    };
    const data = JSON.stringify(vendaData);
    try {
      const response = await axios.post(baseURL, data, {
        headers: { 'Content-Type': 'application/json' },
      });
      const vendaId = response.data.id;
  
      const produtoVendaDataList = itensVenda.map((item) => ({
        idProduto: item.produto.id,
        idVenda: vendaId,
        quantidade: item.quantidade,
      }));
      for (const produtoVendaData of produtoVendaDataList) {
        try {
          await axios.post(`${BASE_URL}/produtos-venda`, produtoVendaData, {
            headers: { 'Content-Type': 'application/json' },
          });
        } catch (error) {
          mensagemErro(error.response.data);
        }
      }
  
      mensagemSucesso('Venda realizada com sucesso!');
      navigate(`/listagem-vendas`);
    } catch (error) {
      mensagemErro(error.response.data);
    }
  }
  

  const calcularprecoTotal = () => {
    let total = 0.0;

    for (const item of itensVenda) {
      total += item.produto.precoUnitario * item.quantidade;
    }

    setPrecoTotal(total);
  };

  useEffect(() => {
    calcularprecoTotal();
  }, [itensVenda]);

  return (
    <Card
      id="realizar-venda"
      title="Realizar Venda"
      btnTitle="Realizar Venda"
      onClick={salvar}
    >
      <FormGroup label="Funcionário">
        <select
          className="form-control"
          value={idFuncionario}
          onChange={(e) => setIdFuncionario(Number(e.target.value))}
        >
          <option value={0}>Selecione...</option>
          {dadosFuncionarios &&
            dadosFuncionarios.map((funcionario) => (
              <option key={funcionario.id} value={funcionario.id}>
                {funcionario.nome}
              </option>
            ))}
        </select>
      </FormGroup>

      <FormGroup label="Cliente">
        <select
          className="form-control"
          value={idCliente}
          onChange={(e) => setIdCliente(Number(e.target.value))}
        >
          <option value={0}>Selecione...</option>
          {dadosClientes &&
            dadosClientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nome}
              </option>
            ))}
        </select>
      </FormGroup>

      <FormGroup label="Método de Pagamento">
        <select
          className="form-control"
          value={idMetodoPagamento}
          onChange={(e) => setIdMetodoPagamento(Number(e.target.value))}
        >
          <option value={0}>Selecione...</option>
          {dadosMetodoPagamentos &&
            dadosMetodoPagamentos.map((metodoPagamento) => (
              <option key={metodoPagamento.id} value={metodoPagamento.id}>
                {metodoPagamento.nomeMetodoPagamento}
              </option>
            ))}
        </select>
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

      <FormGroup label="Quantidade">
        <input
          type="number"
          className="form-control"
          value={quantidade}
          onChange={(e) => setQuantidade(Number(e.target.value))}
        />
      </FormGroup>

      <Stack spacing={1} padding={1} direction='row'>
      <button
        className="btn btn-primary"
        onClick={adicionarItemVenda}
        disabled={!idProduto || quantidade <= 0}
      >
        Adicionar Item
      </button>
      </Stack>
      <Stack spacing={1} padding={1} direction='row'>
      {itensVenda.length > 0 && (
        <div>
          <h4>Itens da Venda:</h4>
          <ul>
            {itensVenda.map((item, index) => (
              <li key={index}>
                {item.produto.nome} {item.produto.cor} {item.produto.tamanho} {item.produto.genero}   - Quantidade: {item.quantidade}
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
      <h4>Valor Total: {precoTotal}</h4>
      <Stack spacing={1} padding={1} direction='row'>
      <button
        onClick={salvar}
        type="button"
        className="btn btn-success"
      >
        Realizar Venda
      </button>
      </Stack>
    </Card>
  );
}

export default RealizarVenda;