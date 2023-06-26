import React, { useState, useEffect } from 'react';

import Card from '../components/card';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
//import EditIcon from '@mui/icons-material/Edit';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

const baseURL = `${BASE_URL}/vendas`;

function DetalhesVenda() {
    const navigate = useNavigate();
    const { idParam } = useParams();

    const [dados, setDados] = React.useState(null);
    const [dadosProdutos, setDadosProdutos] = React.useState(null);
    const [dadosClientes, setDadosClientes] = React.useState(null);
    const [dadosFuncionarios, setDadosFuncionarios] = React.useState(null);
    const [dadosProdutosVenda, setDadosProdutosVenda] = React.useState(null);
    const [itensPedido, setItensPedido] = useState([]);

    const [id, setId] = useState(0);
    const [dataPedido, setDataPedido] = useState(0);
    const [dataEntrega, setDataEntrega] = useState(0);
    const [idGerente, setIdGerente] = useState(0);
    const [idFornecedor, setIdFornecedor] = useState(0);
    const [idProduto, setIdProduto] = useState(0);
    const [quantidade, setQuantidade] = useState(0);
    const [precoTotal, setPrecoTotal] = useState(0);

    useEffect(() => {
        axios.get(`${baseURL}/${idParam}`).then((response) => {
            setDados(response.data);
        });
    }, []);

    function inicializar() {

        setId(dados.id);
        setIdFuncionario(dados.idFuncionario);
        setIdCliente(dados.idCliente);
        setPrecoTotal(dados.precoTotal);
        setDataEntrega(dados.dataEntrega);
        setDataPedido(dados.dataPedido);

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

    if (!dados) return null;
    if (!dadosProdutos) return null;
    if (!dadosProdutosVenda) return null;

    return (
        <div className='container'>
            <Card title='Detalhes do Venda'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='bs-component'>
                            <table className='table table-hover'>
                                <thead>
                                    <tr>
                                        <th scope='col'>Venda</th>
                                        <th scope='col'>Data Venda</th>
                                        <th scope='col'>Valor Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr key={id}>
                                        <td>Venda: {id}</td>
                                        <td>{dataVenda}</td>
                                        <td>R${precoTotal}</td>
                                    </tr>
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