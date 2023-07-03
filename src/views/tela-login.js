import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import Card from '../components/card';
import FormGroup from '../components/form-group';
import { mensagemSucesso, mensagemErro } from '../components/toastr';
import '../custom.css';
import axios from 'axios'
import { BASE_URL } from '../config/axios';

function TelaLogin() {
  const navigate = useNavigate();

  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  async function logar() {
    let data = { login, senha };
    data = JSON.stringify(data);
    const baseURL = `${BASE_URL}/usuarios`
    await axios
        .post(`${baseURL}/auth`, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          localStorage.setItem('token', response);
          mensagemSucesso(`Usuário ${login} logado com sucesso!`);
          navigate(`/tela-inicio`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
  };

  function cancelar() {
    setLogin('');
    setSenha('');
  };

  return (
    <div className='container'>
      <div className='col-lg-4'>
        <Card title='Acesso'>
          <div className='row'>
            <div className='bs-component'>
              <FormGroup label='Login: *' htmlFor='inputLogin'>
                <input
                  type='text'
                  id='inputLogin'
                  value={login}
                  className='form-control'
                  name='login'
                  onChange={(e) => setLogin(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Senha: *' htmlFor='inputSenha'>
                <input
                  type='password'
                  id='inputSenha'
                  value={senha}
                  className='form-control'
                  name='senha'
                  onChange={(e) => setSenha(e.target.value)}
                />
              </FormGroup>
              <Stack spacing={1} padding={1} direction='row'>
                <button
                  onClick={logar}
                  type='button'
                  className='btn btn-success'
                >
                  Entrar
                </button>
                <button
                  onClick={cancelar}
                  type='button'
                  className='btn btn-danger'
                >
                  Cancelar
                </button>
              </Stack>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}


export default TelaLogin;