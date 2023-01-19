import React from 'react';

import Card from '../components/card';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

const baseURL = `${BASE_URL}/funcionarios`;
const baseURL2 = `${BASE_URL}/gerentes`;


function ListagemFuncionarios() {
  const navigate = useNavigate();

  
  const [dados, setDados] = React.useState(null);
  const [dados2, setDados2] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setDados(response.data);
    });
    axios.get(baseURL2).then((response) => {
      setDados2(response.data);
    });
  }, []);

  const cadastrar = (i) => {
    if(i === 0){
      navigate(`/cadastro-funcionario`);
    } else {
      navigate(`/cadastro-gerente`);
    }
  };

  const editar = (id, i) => {
    if(i === 0){
      navigate(`/cadastro-funcionario/${id}`);
    } else {
      navigate(`/cadastro-gerente/${id}`);
    }

  };


  async function excluir(id,i) {
    let data = JSON.stringify({ id });
    let url;
    if(i == 0){
      url = `${baseURL}/${id}`;
    } else {
      url = `${baseURL2}/${id}`;
    }
    await axios
      .delete(url, data, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(function (response) {
        mensagemSucesso(`Exclusão realizada com sucesso!`);
        if(i == 0){
          setDados(
            dados.filter((dado) => {
              return dado.id !== id;
            })
          );
        } else {
          setDados(
            dados2.filter((dado2) => {
              return dado2.id !== id;
            })
          );
        }
      })
      .catch(function (error) {
        mensagemErro(`Erro ao relizar exclusão`);
      });
  }


  if (!dados) return null;
  if (!dados2) return null;


  return (
    <div className='container'>
      <Card title='Listagem de Funcionários'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                className='btn btn-warning'
                onClick={() => cadastrar(0)}
              >
                Novo Funcionário
              </button>

              <button
                type='button'
                className='btn btn-warning'
                onClick={() => cadastrar(1)}
              >
                Novo Gerente
              </button>
              
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Nome</th>
                    <th scope='col'>E-mail</th>
                    <th scope='col'>Telefone</th>
                    <th scope='col'>CPF</th>
                    <th scope='col'>Função</th>
                    <th scope='col'>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.nome}</td>
                      <td>{dado.email}</td>
                      <td>{dado.telefone}</td>
                      <td>{dado.cpf}</td>
                      <td>Funcionário</td>
                      <td>
                        <Stack spacing={1} padding={0} direction='row'>
                          <IconButton
                            aria-label='edit'
                            onClick={() => editar(dado.id,0)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label='delete'
                            onClick={() => excluir(dado.id,0)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </td>
                    </tr>
                  ))}
                  {dados2.map((dado2) => (
                    <tr key={dado2.id}>
                      <td>{dado2.nome}</td>
                      <td>{dado2.email}</td>
                      <td>{dado2.telefone}</td>
                      <td>{dado2.cpf}</td>
                      <td>Gerente</td>
                      <td>
                        <Stack spacing={1} padding={0} direction='row'>
                          <IconButton
                            aria-label='edit'
                            onClick={() => editar(dado2.id,1)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label='delete'
                            onClick={() => excluir(dado2.id,1)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>{' '}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ListagemFuncionarios;