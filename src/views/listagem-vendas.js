import React from 'react';

import Card from '../components/card';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
//import EditIcon from '@mui/icons-material/Edit';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

const baseURL = `${BASE_URL}/vendas`;

function ListagemVendas() {
  const navigate = useNavigate();

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setDados(response.data);
    });
    axios.get(`${BASE_URL}/funcionarios`).then((response) => {
      setDadosFuncionarios(response.data);
    });
    axios.get(`${BASE_URL}/clientes`).then((response) => {
      setDadosClientes(response.data);
    });
  }, []);

  const cadastrar = () => {
      navigate(`/realizar-venda`);
  };
  const detalhes = (id) => {
    navigate(`/detalhes-venda/${id}`);
};

//   const editar = (id) => {
//       navigate(`/realizar-venda/${id}`);
//   };

  const [dados, setDados] = React.useState(null);
  const [dadosFuncionarios, setDadosFuncionarios] = React.useState(null);
  const [dadosClientes, setDadosClientes] = React.useState(null);

  async function excluir(id) {
    let data = JSON.stringify({ id });
    let url = `${baseURL}/${id}`;
    await axios
      .delete(url, data, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(function (response) {
        mensagemSucesso(`Venda excluída com sucesso!`);
        setDados(
          dados.filter((dado) => {
            return dado.id !== id;
          })
        );
      })
      .catch(function (error) {
        mensagemErro(`Erro ao excluir venda`);
      });
  }


  if (!dados) return null;
  if (!dadosFuncionarios) return null;
  if (!dadosClientes) return null;

  return (
    <div className='container'>
      <Card title='Listagem de Vendas'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                className='btn btn-warning'
                onClick={() => cadastrar()}
              >
                Realizar Venda
              </button>
              
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Venda</th>
                    <th scope='col'>Total</th>
                    <th scope='col'>Data</th>
                    <th scope='col'>Funcionario</th>
                    <th scope='col'>Cliente</th>
                    <th scope='col'>Detalhes</th>
                    <th scope='col'>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>Venda: {dado.id}</td>
                      <td>R${dado.precoTotal}</td>
                      <td>{dado.dataVenda}</td>
                      <td>{dadosFuncionarios?.map((dadoFuncionario) => (
                        (dado.idFuncionario == dadoFuncionario.id) ? dadoFuncionario.nome : null
                      ))}</td>
                      <td>{dadosClientes?.map((dadoCliente) => (
                        (dado.idCliente == dadoCliente.id) ? dadoCliente.nome : null
                      ))}</td>
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
                          {/* <IconButton
                            aria-label='edit'
                            onClick={() => editar(dado.id)}
                          >
                            <EditIcon />
                          </IconButton> */}
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

export default ListagemVendas;