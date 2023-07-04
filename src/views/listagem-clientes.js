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

const baseURL = `${BASE_URL}/clientes`;

function ListagemClientes() {
  const navigate = useNavigate();

  React.useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const response = await axios.get(baseURL, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      setDados(response.data);
    } catch (error) {
      mensagemErro('Erro ao carregar os dados');
    }
  };

  const cadastrar = () => {
    navigate('/cadastro-cliente');
  };

  const editar = (id) => {
    navigate(`/cadastro-cliente/${id}`);
  };

  const excluir = async (id) => {
    try {
      await axios.delete(`${baseURL}/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      setDados((dados) => dados.filter((dado) => dado.id !== id));
      mensagemSucesso('Cliente excluído com sucesso!');
    } catch (error) {
      mensagemErro('Erro ao excluir cliente');
    }
  };

  const [dados, setDados] = React.useState(null);

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Listagem de Clientes'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                className='btn btn-warning'
                onClick={cadastrar}
              >
                Novo Cliente
              </button>

              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Nome</th>
                    <th scope='col'>E-mail</th>
                    <th scope='col'>Telefone</th>
                    <th scope='col'>CPF</th>
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

export default ListagemClientes;
