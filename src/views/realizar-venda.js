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
  const [valorTotal, setValorTotal] = useState(0);
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
      setItensVenda([...itensVenda, { produto: itemSelecionado, quantidade }]);
    }
  };

  const removerItem = (item) => {
    const novaLista = itensVenda.filter((i) => i !== item);
    setItensVenda(novaLista);
  };

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
    const vendaData = {
      idFuncionario,
      idCliente,
      idMetodoPagamento,
      valorTotal,
    };

    try {
      const response = await axios.post(baseURL, vendaData);
      const vendaId = response.data.id;

      const produtoVendaDataList = itensVenda.map((item) => ({
        produto: item.produto,
        venda: { id: vendaId },
        quantidade: item.quantidade,
      }));

      await axios.post(`${BASE_URL}/produtoVenda/batch`, produtoVendaDataList);

      mensagemSucesso('Venda realizada com sucesso!');
      navigate(`/listagem-vendas`);
    } catch (error) {
      mensagemErro(error.response.data);
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
    await axios.get(`${BASE_URL}/metodoPagamentos`).then((response) => {
      setDadosMetodoPagamentos(response.data);
    });
  }

  async function buscarProdutos() {
    await axios.get(`${BASE_URL}/produtos`).then((response) => {
      setDadosProdutos(response.data);
    });
  }

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
                {produto.nome}
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

      <button
        className="btn btn-primary"
        onClick={adicionarItemVenda}
        disabled={!idProduto || quantidade <= 0}
      >
        Adicionar Item
      </button>

      {itensVenda.length > 0 && (
        <div>
          <h4>Itens da Venda:</h4>
          <ul>
            {itensVenda.map((item, index) => (
              <li key={index}>
                {item.produto.nome} - Quantidade: {item.quantidade}
                <button onClick={() => removerItem(item)}>Remover</button>
              </li>
            ))}
          </ul>
        </div>
      )}


      <button
        onClick={salvar}
        type="button"
        className="btn btn-success"
      >
        Realizar Venda
      </button>
      <button
        onClick={inicializar}
        type="button"
        className="btn btn-danger"
      >
        Cancelar
      </button>

    </Card >
  );
}


export default RealizarVenda;
