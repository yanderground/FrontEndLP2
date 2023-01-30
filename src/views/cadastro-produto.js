import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL_2, BASE_URL_3 } from '../config/axios';

function CadastroProduto() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL_3}/produtos`;

  const [id, setId] = useState(0);
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState(0);
  const [qtdMax, setQtdMax] = useState(0);
  const [qtdMin, setQtdMin] = useState(0);
  const [idDepartamento, setIdDepartamento] = useState(0);
  const [idGenero, setIdGenero] = useState(0);
  const [idTamanho, setIdTamanho] = useState(0);
  const [idCor, setIdCor] = useState(0);

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId(0);
      setNome('');
      setPreco(0);
      setQtdMax(0);
      setQtdMin(0);
      setIdDepartamento(0);
      setIdGenero(0);
      setIdTamanho(0);
      setIdCor(0);
    } else {
      setId(dados.id);
      setNome(dados.nome);
      setPreco(dados.preco);
      setQtdMax(dados.qtdMax);
      setQtdMin(dados.qtdMin);
      setIdDepartamento(dados.idDepartamento);
      setIdGenero(dados.idGenero);
      setIdTamanho(dados.idTamanho);
      setIdCor(dados.idCor);
    }
  }

  async function salvar() {
    let data = { id, nome, preco, qtdMax, qtdMin, idDepartamento, idGenero, idTamanho, idCor };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Produto ${nome} cadastrado com sucesso!`);
          navigate(`/listagem-produtos`);
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
          mensagemSucesso(`Produto ${nome} alterado com sucesso!`);
          navigate(`/listagem-produtos`);
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
    setPreco(dados.preco);
    setQtdMax(dados.qtdMax);
    setQtdMin(dados.qtdMin);
    setIdDepartamento(dados.idDepartamento);
    setIdGenero(dados.idGenero);
    setIdTamanho(dados.idTamanho);
    setIdCor(dados.idCor);
  }

  const [dadosDepartamentos, setDadosDepartamentos] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL_2}/departamentos`).then((response) => {
      setDadosDepartamentos(response.data);
    });
  }, []);

  const [dadosGeneros, setDadosGeneros] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL_2}/generos`).then((response) => {
      setDadosGeneros(response.data);
    });
  }, []);

  const [dadosTamanhos, setDadosTamanhos] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL_2}/tamanhos`).then((response) => {
      setDadosTamanhos(response.data);
    });
  }, []);

  const [dadosCores, setDadosCores] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL_2}/cores`).then((response) => {
      setDadosCores(response.data);
    });
  }, []);

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;
  if (!dadosDepartamentos) return null;
  if (!dadosGeneros) return null;
  if (!dadosTamanhos) return null;
  if (!dadosCores) return null;
  
  return (
    <div className='container'>
      <Card title='Cadastro de Produto'>
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
              <FormGroup label='preco: *' htmlFor='inputpreco'>
                <input
                  type='text'
                  maxLength='11'
                  id='inputpreco'
                  value={preco}
                  className='form-control'
                  name='preco'
                  onChange={(e) => setPreco(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='qtdMax: *' htmlFor='inputQtdMax'>
                <input
                  type='qtdMax'
                  id='inputQtdMax'
                  value={qtdMax}
                  className='form-control'
                  name='qtdMax'
                  onChange={(e) => setQtdMax(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='qtdMin:' htmlFor='inputQtdMin'>
                <input
                  type='text'
                  id='inputQtdMin'
                  value={qtdMin}
                  className='form-control'
                  name='qtdMin'
                  onChange={(e) => setQtdMin(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Departamento: *' htmlFor='selectDepartamento'>
                <select
                  className='form-select'
                  id='selectDepartamento'
                  name='idDepartamento'
                  value={idDepartamento}
                  onChange={(e) => setIdDepartamento(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosDepartamentos.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.titulo}
                    </option>
                  ))}
                </select>
              </FormGroup>

              <FormGroup label='Genero: *' htmlFor='selectGenero'>
                <select
                  className='form-select'
                  id='selectGenero'
                  name='idGenero'
                  value={idGenero}
                  onChange={(e) => setIdGenero(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosGeneros.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.titulo}
                    </option>
                  ))}
                </select>
              </FormGroup>

              <FormGroup label='Tamanho: *' htmlFor='selectTamanho'>
                <select
                  className='form-select'
                  id='selectTamanho'
                  name='idTamanho'
                  value={idTamanho}
                  onChange={(e) => setIdTamanho(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosTamanhos.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.titulo}
                    </option>
                  ))}
                </select>
              </FormGroup>

              <FormGroup label='Cor: *' htmlFor='selectCor'>
                <select
                  className='form-select'
                  id='selectCor'
                  name='idCor'
                  value={idCor}
                  onChange={(e) => setIdCor(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosTamanhos.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.titulo}
                    </option>
                  ))}
                </select>
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

export default CadastroProduto;