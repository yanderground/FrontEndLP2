import React, { useState, useEffect } from 'react';
import Card from '../components/card';
import '../custom.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../config/axios';
import { format } from 'date-fns';

const baseURL = `${BASE_URL}/pedidos`;

function DetalhesPedido() {
  const navigate = useNavigate();
  const { idParam } = useParams();
  const token = sessionStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const [dados, setDados] = useState(null);
  const [dadosProdutosPedido, setDadosProdutosPedido] = useState(null);
  const [dadosProdutos, setDadosProdutos] = useState(null);
  const [dadosCores, setDadosCores] = useState(null);
  const [dadosGeneros, setDadosGeneros] = useState(null);
  const [dadosTamanhos, setDadosTamanhos] = useState(null);
  const [gerente, setGerente] = useState(null);
  const [fornecedor, setFornecedor] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const pedidoResponse = await axios.get(`${baseURL}/${idParam}`);
      const [produtosResponse, produtosPedidoResponse, coresResponse, generosResponse, tamanhosResponse, gerenteResponse, fornecedorResponse] = await Promise.all([
        axios.get(`${BASE_URL}/produtos`),
        axios.get(`${BASE_URL}/produtos-pedido/pedidos/${idParam}`),
        axios.get(`${BASE_URL}/cores`),
        axios.get(`${BASE_URL}/generos`),
        axios.get(`${BASE_URL}/tamanhos`),
        axios.get(`${BASE_URL}/gerentes/${pedidoResponse.data.idGerente}`), // substitua "gerenteId" pelo campo correto que identifica o gerente no objeto de pedido
        axios.get(`${BASE_URL}/fornecedores/${pedidoResponse.data.idFornecedor}`), // substitua "fornecedorId" pelo campo correto que identifica o fornecedor no objeto de pedido
      ]);

      setDados(pedidoResponse.data);
      setDadosProdutos(produtosResponse.data);
      setDadosProdutosPedido(produtosPedidoResponse.data);
      setDadosCores(coresResponse.data);
      setDadosGeneros(generosResponse.data);
      setDadosTamanhos(tamanhosResponse.data);
      setGerente(gerenteResponse.data);
      setFornecedor(fornecedorResponse.data);
    };

    fetchData();
  }, [idParam]);

  if (!dados || !dadosProdutos || !dadosProdutosPedido || !dadosCores || !dadosGeneros || !dadosTamanhos || !gerente || !fornecedor) return null;

  return (
    <div className='container'>
      <Card title='Detalhes do Pedido'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Pedidos</th>
                    <th scope='col'>Data Pedido</th>
                    <th scope='col'>Data Entrega</th>
                    <th scope='col'>Valor Total</th>
                    <th scope='col'>Gerente</th>
                    <th scope='col'>Fornecedor</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={dados.id}>
                    <td>Pedido: {dados.id}</td>
                    <td>{format(new Date(dados.dataPedido), 'dd/MM/yyyy')}</td>
                    <td>{format(new Date(dados.dataEntrega), 'dd/MM/yyyy')}</td>
                    <td>R${dados.precoTotal}</td>
                    <td>{gerente.nome}</td> 
                    <td>{fornecedor.nome}</td> 
                  </tr>
                </tbody>
              </table>

              <h5>Produtos do Pedido:</h5>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Produto</th>
                    <th scope='col'>Quantidade</th>
                    <th scope='col'>Cor</th>
                    <th scope='col'>Tamanho</th>
                    <th scope='col'>Gênero</th>
                  </tr>
                </thead>
                <tbody>
                  {dadosProdutosPedido.map((produtoPedido) => {
                    const produto = dadosProdutos.find((produto) => String(produto.id) === String(produtoPedido.produto.id));
                    const cor = produto ? dadosCores.find((cor) => cor.id === produto.idCor) : null;
                    const tamanho = produto ? dadosTamanhos.find((tamanho) => tamanho.id === produto.idTamanho) : null;
                    const genero = produto ? dadosGeneros.find((genero) => genero.id === produto.idGenero) : null;

                    return (
                      <tr key={produtoPedido.id}>
                        <td>{produto?.nome}</td>
                        <td>{produtoPedido.quantidade}</td>
                        <td>{cor?.nomeCor}</td>
                        <td>{tamanho?.nomeTamanho}</td>
                        <td>{genero?.nomeGenero}</td>
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

export default DetalhesPedido;
