import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroClientes(){
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/clientes`;
  
  const [id, setId] = useState(0);
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [uf, setUf] = useState('');
  const [cidade, setCidade] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [bairro, setBairro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');

  const [dados, setDados] = React.useState([]);

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  function inicializar() {
    if (idParam == null) {
      setId(0);
      setNome('');
      setCpf('');
      setEmail('');
      setTelefone('');
      setCep('');
      setUf('');
      setCidade('');
      setLogradouro('');
      setNumero('');
      setComplemento('');
      setBairro('');
    } else {
      setId(dados.id);
      setNome(dados.nome);
      setCpf(dados.cpf);
      setEmail(dados.email);
      setTelefone(dados.telefone);
      setCep(dados.cep);
      setUf(dados.uf);
      setCidade(dados.cidade);
      setLogradouro(dados.logradouro);
      setNumero(dados.numero);
      setComplemento(dados.complemento);
      setBairro(dados.bairro);
    }
  }

  async function salvar() {
    let data = { id, nome, cpf, email, telefone, cep, uf, cidade, logradouro, bairro, numero, complemento };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Cliente ${nome} cadastrado com sucesso!`);
          navigate(`/listagem-clientes`);
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
          mensagemSucesso(`Cliente ${nome} alterado com sucesso!`);
          navigate(`/listagem-clientes`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    }
  }

  async function buscar() {
   await axios.get(`${baseURL}/${idParam}`).then((response) => {
      setDados(response.data);
    });
    setId(dados.id);
    setNome(dados.nome);
    setCpf(dados.cpf);
    setEmail(dados.email);
    setTelefone(dados.telefone);
    setCep(dados.cep);
    setUf(dados.uf);
    setCidade(dados.cidade);
    setLogradouro(dados.logradouro);
    setNumero(dados.numero);
    setComplemento(dados.complemento);
    setBairro(dados.bairro);
  }

 if (!dados) return null;

    return (
      <div className='container'>
        <Card title='Cadastro de Cliente'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='bs-component'>
                <FormGroup label='Nome: *' htmlFor='inputNome'>
                  <input
                    type='text'
                    id='inputNome'
                    value={nome}
                    className='form-control'
                    name='nome'
                    onChange={(e) => setNome(e.target.value)}
                  />
                </FormGroup>

                <FormGroup label='Email: *' htmlFor='inputEmail'>
                  <input
                    type='email'
                    id='inputEmail'
                    value={email}
                    className='form-control'
                    name='email'
                    onChange={(e) => setEmail(e.target.value )}
                  />
                </FormGroup>
      
                <FormGroup label='Telefone: *' htmlFor='inputTelefone'>
                  <input
                    type='text'
                    id='inputTelefone'
                    value={telefone}
                    className='form-control'
                    name='telefone'
                    onChange={(e) => setTelefone( e.target.value )}
                  />
                </FormGroup>

                <FormGroup label='CPF: *' htmlFor='inputCPF'>
                  <input
                    type='text'
                    id='inputCPF'
                    value={cpf}
                    className='form-control'
                    name='cpf'
                    onChange={(e) =>
                      setCpf( e.target.value )
                    }
                  />
                </FormGroup>

                <FormGroup label='CEP: *' htmlFor='inputCEP'>
                  <input
                    type='text'
                    id='inputCEP'
                    value={cep}
                    className='form-control'
                    name='cep'
                    onChange={(e) =>
                      setCep( e.target.value )
                    }
                  />
                </FormGroup>

                <FormGroup label='Uf: *' htmlFor='inputUf'>
                  <input
                    type='text'
                    id='inputUf'
                    value={uf}
                    className='form-control'
                    name='Uf'
                    onChange={(e) =>
                      setUf( e.target.value )
                    }
                  />
                </FormGroup>

                <FormGroup label='Cidade: *' htmlFor='inputCidade'>
                  <input
                    type='text'
                    id='inputCidade'
                    value={cidade}
                    className='form-control'
                    name='cidade'
                    onChange={(e) =>
                      setCidade( e.target.value )
                    }
                  />
                </FormGroup>

                <FormGroup label='Bairro: *' htmlFor='inputBairro'>
                  <input
                    type='text'
                    id='inputBairro'
                    value={bairro}
                    className='form-control'
                    name='bairro'
                    onChange={(e) =>
                      setBairro( e.target.value )
                    }
                  />
                  </FormGroup> 

                <FormGroup label='Logradouro: *' htmlFor='inputLogradouro'>
                  <input
                    type='text'
                    id='inputLogradouro'
                    value={logradouro}
                    className='form-control'
                    name='logradouro'
                    onChange={(e) =>
                      setLogradouro( e.target.value )
                    }
                  />
                </FormGroup>
              
                <FormGroup label='Número: *' htmlFor='inputNumero'>
                  <input
                    type='number'
                    id='inputNumero'
                    value={numero}
                    className='form-control'
                    name='numero'
                    onChange={(e) =>
                      setNumero( e.target.value )
                    }
                  />
                </FormGroup>

                <FormGroup label='Complemento: *' htmlFor='inputComplemento'>
                  <input
                    type='text'
                    id='inputComplemento'
                    value={complemento}
                    className='form-control'
                    name='complemento'
                    onChange={(e) =>
                      setComplemento( e.target.value )
                    }
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

export default CadastroClientes;
