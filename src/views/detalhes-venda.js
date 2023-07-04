import React, { useState, useEffect } from 'react';
import Card from '../components/card';
import '../custom.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../config/axios';
import { format } from 'date-fns';

const baseURL = `${BASE_URL}/vendas`;

function DetalhesVenda() {
  const navigate = useNavigate();
  const { idParam } = useParams();
  const token = sessionStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const [dados, setDados] = useState(null);
  const [produtosVenda, setProdutosVenda] = useState(null);
  const [produtos, setProdutos] = useState(null);
  const [clientes, setClientes] = useState(null);
  const [funcionarios, setFuncionarios] = useState(null);
  const [metodosPagamento, setMetodosPagamento] = useState(null);
  const [cores, setCores] = useState(null);
  const [tamanhos, setTamanhos] = useState(null);
  const [generos, setGeneros] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const [vendaResponse, produtosVendaResponse, produtosResponse, clientesResponse, funcionariosResponse, metodosPagamentoResponse, coresResponse, tamanhosResponse, generosResponse] = await Promise.all([
        axios.get(`${baseURL}/${idParam}`),
        axios.get(`${BASE_URL}/produtos-venda/vendas/${idParam}`),
        axios.get(`${BASE_URL}/produtos`),
        axios.get(`${BASE_URL}/clientes`),
        axios.get(`${BASE_URL}/funcionarios`),
        axios.get(`${BASE_URL}/metodos-pagamento`),
        axios.get(`${BASE_URL}/cores`),
        axios.get(`${BASE_URL}/tamanhos`),
        axios.get(`${BASE_URL}/generos`),
      ]);

      setDados(vendaResponse.data);
      setProdutosVenda(produtosVendaResponse.data);
      setProdutos(produtosResponse.data);
      setClientes(clientesResponse.data);
      setFuncionarios(funcionariosResponse.data);
      setMetodosPagamento(metodosPagamentoResponse.data);
      setCores(coresResponse.data);
      setTamanhos(tamanhosResponse.data);
      setGeneros(generosResponse.data);
    };

    fetchData();
  }, [idParam]);

  if (!dados || !produtosVenda || !produtos || !clientes || !funcionarios || !metodosPagamento || !cores || !tamanhos || !generos) return null;

  return (
    <div className='container'>
      <Card title='Detalhes da Venda'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Venda</th>
                    <th scope='col'>Data Venda</th>
                    <th scope='col'>Preço Total</th>
                    <th scope='col'>Funcionário</th>
                    <th scope='col'>Cliente</th>
                    <th scope='col'>Método de Pagamento</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={dados.id}>
                    <td>Venda: {dados.id}</td>
                    <td>{format(new Date(dados.dataVenda), 'dd/MM/yyyy')}</td>
                    <td>R${dados.precoTotal}</td>
                    <td>{funcionarios.find((funcionario) => funcionario.id === dados.idFuncionario)?.nome}</td>
                    <td>{clientes.find((cliente) => cliente.id === dados.idCliente)?.nome}</td>
                    <td>{metodosPagamento.find((metodoPagamento) => metodoPagamento.id === dados.idMetodoPagamento)?.nomeMetodoPagamento}</td>
                  </tr>
                </tbody>
              </table>

              <h5>Produtos da Venda:</h5>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Produto</th>
                    <th scope='col'>Cor</th>
                    <th scope='col'>Tamanho</th>
                    <th scope='col'>Gênero</th>
                    <th scope='col'>Quantidade</th>
                    <th scope='col'>Preço Unitário</th>
                  </tr>
                </thead>
                <tbody>
                  {produtosVenda.map((produtoVenda) => {
                    const produto = produtos.find((produto) => String(produto.id) === String(produtoVenda.produto.id));
                    const cor =  produto ? cores.find((cor) => cor.id === produto.idCor): null;
                    const tamanho = produto ? tamanhos.find((tamanho) => tamanho.id === produto.idTamanho): null;
                    const genero = produto ? generos.find((genero) => genero.id === produto.idGenero): null;

                    return (
                      <tr key={produtoVenda.id}>
                        <td>{produto?.nome}</td>
                        <td>{cor?.nomeCor}</td>
                        <td>{tamanho?.nomeTamanho}</td>
                        <td>{genero?.nomeGenero}</td>
                        <td>{produtoVenda.quantidade}</td>
                        <td>R${produto.precoUnitario}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default DetalhesVenda;
