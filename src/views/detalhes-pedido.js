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

const baseURL = `${BASE_URL}/pedidos`;

function DetalhesPedido() {
    const navigate = useNavigate();
    const { idParam } = useParams();

    const [dados, setDados] = React.useState(null);
    const [dadosProdutos, setDadosProdutos] = React.useState(null);
    const [dadosProdutosPedido, setDadosProdutosPedido] = React.useState(null);

    useEffect(() => {
        axios.get(`${baseURL}/${idParam}`).then((response) => {
            setDados(response.data);
        });
        axios.get(`${BASE_URL}/produtos`).then((response) => {
            setDadosProdutos(response.data);
        });
        axios.get(`${BASE_URL}/produtos-pedido`).then((response) => {
            setDadosProdutosPedido(response.data);
        });
    }, []);

    if (!dados) return null;
    if (!dadosProdutos) return null;
    if (!dadosProdutosPedido) return null;

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
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr key={dados.id}>
                                        <td>Pedido: {dados.id}</td>
                                        <td>{dados.dataPedido}</td>
                                        <td>{dados.dataEntrega}</td>
                                        <td>R${dados.precoTotal}</td>
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



export default DetalhesPedido;