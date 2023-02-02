import React, { useEffect } from 'react';

import Card from '../components/card';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import axios from 'axios';
import { BASE_URL_2 } from '../config/axios';

const baseURL = `${BASE_URL_2}/produtos`;
let cor = '';

function ListagemProdutos() {
  const navigate = useNavigate();
  
  const [dados, setDados] = React.useState(null);
  const [dadosDepartamentos, setDadosDepartamentos] = React.useState(null);
  const [dadosGeneros, setDadosGeneros] = React.useState(null);
  const [dadosTamanhos, setDadosTamanhos] = React.useState(null);
  const [dadosCores, setDadosCores] = React.useState('');

useEffect(() => {
    axios.get(baseURL).then((response) => {
      setDados(response.data);
    });
  }, []);

  
  const cadastrar = () => {
    navigate(`/cadastro-produto`);
  };
  
  const editar = (id) => {
    navigate(`/cadastro-produto/${id}`);
  };

  const navegarDep = () => {
    navigate(`/listagem-departamentos`);
  };

  const navegarCor = () => {
    navigate(`/listagem-cores`);
  };

  const navegarTam = () => {
    navigate(`/listagem-tamanhos`);
  };
  
  
  React.useEffect(() => {
    axios.get(`${BASE_URL_2}/departamentos`).then((response) => {
      setDadosDepartamentos(response.data);
    });
    axios.get(`${BASE_URL_2}/generos`).then((response) => {
      setDadosGeneros(response.data);
    });
    axios.get(`${BASE_URL_2}/tamanhos`).then((response) => {
      setDadosTamanhos(response.data);
    });
    //axios.get(`${BASE_URL_2}/cores`).then((response) => {
    //  setDadosCores(response.data);
    //});
  }, []);
  
  function buscar(id){
    let data = JSON.stringify({ id });
    let url = `${BASE_URL_2}/cores/${id}`;
      axios.get(url).then((response) => {
        cor = response.data.titulo;
        // setDadosCores(response.data)
      });
  }

  async function excluir(id) {
    let data = JSON.stringify({ id });
    let url = `${baseURL}/${id}`;
    await axios
      .delete(url, data, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(function (response) {
        mensagemSucesso(`Produto excluído com sucesso!`);
        setDados(
          dados.filter((dado) => {
            return dado.id !== id;
          })
        );
      })
      .catch(function (error) {
        mensagemErro(`Erro ao excluir produto`);
      });
  }

 if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Listagem de Produtos'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                className='btn btn-warning'
                onClick={() => cadastrar()}
              >
                Novo Produtos
              </button>
              
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Nome</th>
                    <th scope='col'>Departamento</th>
                    <th scope='col'>Cor</th>
                    <th scope='col'>Tamanho</th>
                    <th scope='col'>Genero</th>
                    <th scope='col'>Quantidade</th>
                    <th scope='col'>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {dados?.map((dado) => (
                    <>{}
                    <tr key={dado.id}>
                      <td>{dado.nome}</td>
                      <td>{dado.idDepartamento}</td>                     
                      <td>{buscar(dado.idCor)}</td>
                      <td>{dado.idTamanho}</td>
                      <td>{dado.idGenero}</td>
                      <td>{dado.quantidade}</td>
                      <td>
                        <Stack spacing={1} padding={0} direction='row'>
                          <IconButton
                            aria-label='edit'
                            onClick={() => editar(dado.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label='delete'
                            onClick={() => excluir(dado.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </td>
                    </tr>
                    </>
                  ))}
                </tbody>
              </table>{' '}
            </div>
            <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
              <button
                  type='button'
                  className='btn btn-secondary btn-group me-2'
                  onClick={() => navegarDep()}
                >
                  Departamentos
                </button>
                <button
                  type='button'
                  className='btn btn-secondary btn-group me-2'
                  onClick={() => navegarCor()}
                >
                  Cores
                </button>
                <button
                  type='button'
                  className='btn btn-secondary btn-group me-2'
                  onClick={() => navegarTam()}
                >
                  Tamanhos
                </button>
            </div>
            
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ListagemProdutos;