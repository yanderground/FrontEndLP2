import React from 'react';
import Card from '../components/card';
import { mensagemSucesso, mensagemErro } from '../components/toastr';
import '../custom.css';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';
import axios from 'axios';
import { BASE_URL } from '../config/axios';

const baseURL = `${BASE_URL}/pedidos`;

function ListagemPedidos() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setDados(response.data);
    });
  }, []);

  const cadastrar = () => {
      navigate(`/cadastro-pedido`);
  };
  const detalhes = (id) => {
    navigate(`/detalhes-pedido/${id}`);
};

  const [dados, setDados] = React.useState(null);

  async function excluir(id) {
    let data = JSON.stringify({ id });
    let url = `${baseURL}/${id}`;
    await axios
      .delete(url, data, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(function (response) {
        mensagemSucesso(`Pedido excluído com sucesso!`);
        setDados(
          dados.filter((dado) => {
            return dado.id !== id;
          })
        );
      })
      .catch(function (error) {
        mensagemErro(`Erro ao excluir pedido`);
      });
  }


  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Listagem de Pedidos'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                className='btn btn-warning'
                onClick={() => cadastrar()}
              >
                Cadastrar Pedido
              </button>
              
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Pedidos</th>
                    <th scope='col'>Data Pedido</th>
                    <th scope='col'>Data Entrega</th>
                    <th scope='col'>Detalhes</th>
                    <th scope='col'>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>Pedido: {dado.id}</td>
                      <td>{format(new Date(dado.dataPedido), 'dd/MM/yyyy')}</td>
                      <td>{format(new Date(dado.dataEntrega), 'dd/MM/yyyy')}</td>
                      <td>
                        <button
                            onClick={() => detalhes(dado.id)}
                            type='button'
                            className="btn btn-primary"
                        >
                        Mais Detalhes
                        </button>
                      </td>
                      <td>
                        <Stack spacing={1} padding={0} direction='row'>
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

export default ListagemPedidos;