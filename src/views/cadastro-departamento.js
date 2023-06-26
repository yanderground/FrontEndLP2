import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroDepartamento(){
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/departamentos`;
  
  const [id, setId] = useState(0);
  const [nomeDepartamento, setNomeDepartamento] = useState('');

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId(0);
      setNomeDepartamento('');
    } else {
      setId(dados.id);
      setNomeDepartamento(dados.nomeDepartamento);
    }
  }

  async function salvar() {
    let data = { id, nomeDepartamento };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Departamento ${nomeDepartamento} cadastrado com sucesso!`);
          navigate(`/listagem-departamentos`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    } else {
      await axios
        .put(`${baseURL}/${idParam}`, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Departamento ${nomeDepartamento} alterado com sucesso!`);
          navigate(`/listagem-departamentos`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    }
  }

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  async function buscar() {
   await axios.get(`${baseURL}/${idParam}`).then((response) => {
      setDados(response.data);
    });
    setId(dados.id);
    setNomeDepartamento(dados.nomeDepartamento);
  }

 if (!dados) return null;

    return (
      <div className='container'>
        <Card title='Cadastro de Departamento'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='bs-component'>
                <FormGroup label='Departamento: *' htmlFor='inputnomeDepartamento'>
                  <input
                    type='text'
                    id='inputnomeDepartamento'
                    value={nomeDepartamento}
                    className='form-control'
                    name='nomeDepartamento'
                    onChange={(e) => setNomeDepartamento(e.target.value)}
                  />
                </FormGroup>

                <Stack spacing={1} padding={1} direction='row'>
                  <button
                    onClick={salvar}
                    type='button'
                    className='btn btn-success'
                  >
                    Salvar
                  </button>
                  <button
                    onClick={inicializar}
                    type='button'
                    className='btn btn-danger'
                  >
                    Cancelar
                  </button>
                </Stack>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
}

export default CadastroDepartamento;