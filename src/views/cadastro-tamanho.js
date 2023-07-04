import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroTamanho(){
  const { idParam } = useParams();
  const token = sessionStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/tamanhos`;
  
  const [id, setId] = useState(0);
  const [nomeTamanho, setNomeTamanho] = useState('');

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId(0);
      setNomeTamanho('');
    } else {
      setId(dados.id);
      setNomeTamanho(dados.nomeTamanho);
    }
  }

  async function salvar() {
    let data = { id, nomeTamanho };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Tamanho ${nomeTamanho} cadastrado com sucesso!`);
          navigate(`/listagem-tamanhos`);
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
          mensagemSucesso(`Tamanho ${nomeTamanho} alterado com sucesso!`);
          navigate(`/listagem-tamanhos`);
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
    setNomeTamanho(dados.nomeTamanho);
  }

 if (!dados) return null;

    return (
      <div className='container'>
        <Card title='Cadastro de Tamanho'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='bs-component'>
                <FormGroup label='Tamanho: *' htmlFor='inputnomeTamanho'>
                  <input
                    type='text'
                    id='inputnomeTamanho'
                    value={nomeTamanho}
                    className='form-control'
                    name='nomeTamanho'
                    onChange={(e) => setNomeTamanho(e.target.value)}
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

export default CadastroTamanho;