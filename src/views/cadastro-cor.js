import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL_2 } from '../config/axios';

function CadastroCor(){
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL_2}/Cor`;
  
  const [id, setId] = useState('');
  const [titulo, setTitulo] = useState('');

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setTitulo('');
    } else {
      setId(dados.id);
      setTitulo(dados.Titulo);
    }
  }

  async function salvar() {
    let data = { id, titulo };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Cliente ${titulo} cadastrado com sucesso!`);
          navigate(`/listagem-Cor`);
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
          mensagemSucesso(`Cliente ${titulo} alterado com sucesso!`);
          navigate(`/listagem-Cor`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    }
  }

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;

  async function buscar() {
   await axios.get(`${baseURL}/${idParam}`).then((response) => {
      setDados(response.data);
    });
    setId(dados.id);
    setTitulo(dados.Titulo);
  }

 if (!dados) return null;

    return (
      <div className='container'>
        <Card title='Cadastro de Cor'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='bs-component'>
                <FormGroup label='Titulo: *' htmlFor='inputTitulo'>
                  <input
                    type='text'
                    id='inputTitulo'
                    value={titulo}
                    className='form-control'
                    name='titulo'
                    onChange={(e) => setTitulo(e.target.value)}
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

export default CadastroCor;
