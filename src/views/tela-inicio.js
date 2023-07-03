import { useNavigate} from 'react-router-dom';

import axios from 'axios';
import React from 'react';
import Card from '../components/card';
import "../styles.css";

function TelaInicio() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const navegarFunc = () => {
        navigate(`/listagem-funcionarios`);
    };
    const navegarFor = () => {
        navigate(`/listagem-fornecedores`);
    };
    const navegarProd = () => {
        navigate(`/listagem-produtos`);
    };
    const navegarVend = () => {
        navigate(`/listagem-vendas`);
    };
    const navegarClie = () => {
        navigate(`/listagem-clientes`);
    };
    const navegarPedi = () => {
        navigate(`/listagem-pedidos`);
    };
    const navegarRVend = () => {
        navigate(`/realizar-venda`)
    }


  return (
    <div className='container'>
      <Card title='Menu Inicial'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'> 
                <div className="btn-toolbar " role="toolbar" aria-label="Toolbar with button groups">
                    <div className="d-grid gap-3">
                        <div className="me-2" role="group" >
                            <button
                                    onClick={() => navegarFunc()}
                                    type='button'
                                    className="btn btn-primary btn-lg me-2"
                                >
                                Funcionários
                            </button>
                            
                            <button
                                    onClick={() => navegarFor()}
                                    type='button'
                                    className="btn btn-primary btn-lg me-2"
                                >
                                Fornecedores
                            </button>
                            
                            <button
                                    onClick={() => navegarProd()}
                                    type='button'
                                    className="btn btn-primary btn-lg me-2"
                                >
                                Produtos
                            </button>
                        </div>
                        
                        <div className="me-2" role="group">
                            <button
                                onClick={() => navegarVend()}
                                type='button'
                                className="btn btn-primary btn-lg me-2"
                            >
                            Vendas
                            </button>
                        
                            <button
                                onClick={() => navegarClie()}
                                type='button'
                                className="btn btn-primary btn-lg me-2"
                            >
                            Clientes
                            </button>
                        
                            <button
                                onClick={() => navegarPedi()}
                                type='button'
                                className="btn btn-primary btn-lg me-2"
                            >
                            Pedidos
                            </button>
                        </div>

                        <div className="me-2" role="group">
                            <button
                                onClick={() => navegarRVend()}
                                type='button'
                                className="btn btn-warning btn-lg me-2"
                            >
                            Realizar Venda
                            </button>
                        </div>
                    </div>
                </div>                  
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default TelaInicio;