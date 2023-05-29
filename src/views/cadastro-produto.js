import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroProduto() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/produtos`;

  const [id, setId] = useState(0);
  const [nome, setNome] = useState('');
  const [precoUnitario, setPrecoUnitario] = useState(0.0);
  const [quantidadeMax, setQuantidadeMax] = useState(0);
  const [quantidadeMin, setQuantidadeMin] = useState(0);
  const [quantidade, setQuantidade] = useState(0);
  const [idDepartamento, setIdDepartamento] = useState(0);
  const [idGenero, setIdGenero] = useState(0);
  const [idTamanho, setIdTamanho] = useState(0);
  const [idCor, setIdCor] = useState(0);

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId(0);
      setNome('');
      setPrecoUnitario(0);
      setQuantidadeMax(0);
      setQuantidadeMin(0);
      setQuantidade(0);
      setIdDepartamento(0);
      setIdGenero(0);
      setIdTamanho(0);
      setIdCor(0);
    } else {
      setId(dados.id);
      setNome(dados.nome);
      setPrecoUnitario(dados.precoUnitario);
      setQuantidadeMax(dados.quantidadeMax);
      setQuantidadeMin(dados.quantidadeMin);
      setQuantidade(dados.quantidade);
      setIdDepartamento(dados.idDepartamento);
      setIdGenero(dados.idGenero);
      setIdTamanho(dados.idTamanho);
      setIdCor(dados.idCor);
    }
  }

  async function salvar() {
    let data = { id, nome, precoUnitario, quantidadeMax, quantidadeMin, quantidade, idDepartamento, idGenero, idTamanho, idCor };
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
    setPrecoUnitario(dados.precoUnitario);
    setQuantidadeMax(dados.quantidadeMax);
    setQuantidadeMin(dados.quantidadeMin);
    setQuantidade(dados.quantidade);
    setIdDepartamento(dados.idDepartamento);
    setIdGenero(dados.idGenero);
    setIdTamanho(dados.idTamanho);
    setIdCor(dados.idCor);
  }

  const [dadosDepartamentos, setDadosDepartamentos] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/departamentos`).then((response) => {
      setDadosDepartamentos(response.data);
    });
  }, []);

  const [dadosGeneros, setDadosGeneros] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/generos`).then((response) => {
      setDadosGeneros(response.data);
    });
  }, []);

  const [dadosTamanhos, setDadosTamanhos] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/tamanhos`).then((response) => {
      setDadosTamanhos(response.data);
    });
  }, []);

  const [dadosCores, setDadosCores] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/cores`).then((response) => {
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
              <FormGroup label='precoUnitario: *' htmlFor='inputprecoUnitario'>
                <input
                  type='number'
                  maxLength='11'
                  id='inputprecoUnitario'
                  value={precoUnitario}
                  className='form-control'
                  name='precoUnitario'
                  onChange={(e) => setPrecoUnitario(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='quantidadeMax: *' htmlFor='inputquantidadeMax'>
                <input
                  type='number'
                  id='inputquantidadeMax'
                  value={quantidadeMax}
                  className='form-control'
                  name='quantidadeMax'
                  onChange={(e) => setQuantidadeMax(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='quantidadeMin:' htmlFor='inputquantidadeMin'>
                <input
                  type='number'
                  id='inputquantidadeMin'
                  value={quantidadeMin}
                  className='form-control'
                  name='quantidadeMin'
                  onChange={(e) => setQuantidadeMin(e.target.value)}
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
                      {dado.nomeDepartamento}
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
                      {dado.nomeGenero}
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
                      {dado.nomeTamanho}
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
                  {dadosCores.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nomeCor}
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