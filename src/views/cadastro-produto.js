import React from 'react';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso } from '../components/toastr';
import '../custom.css';

class CadastroProduto extends React.Component {
  state = {
    nome: '',
    departamento: '',
    tamanho: '',
    genero: '',
    cor: '',
    quantidadeMaxima: '',
    preço: ''
  };

  cadastrar = () => {
    mensagemSucesso(`Produto ${this.state.nome} cadastrado com sucesso!`);
  };

  cancelar = () => {};

  render() {
    return (
      <div className='container'>
        <Card title='Cadastro de Produtos'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='bs-component'>
                
                <FormGroup label='Nome: *' htmlFor='inputNome'>
                  <input
                    type='text'
                    id='inputNome'
                    value={this.state.nome}
                    className='form-control'
                    name='nome'
                    onChange={(e) => this.setState({ nome: e.target.value })}
                  />
                </FormGroup>
                <br/>

                <FormGroup label="*Departamento" htmlFor='inputDepartamento'>
                  <select name="departamento" id="inputDepartamento">
                    <option value="camisas">camisas</option>
                    <option value="bermudas">bermudas</option>
                    <option value="moletom">moletom</option>
                    <option value="calça">calça</option>
                  </select>
                </FormGroup>
                <br/>  
                  
                <FormGroup label="*Tamanho" htmlFor='inputTamanho'>
                  <select name="tamanho" id="inputTamanho">
                    <option value="p">P</option>
                    <option value="m">M</option>
                    <option value="g">G</option>
                    <option value="gg">GG</option>
                  </select>
                </FormGroup>
                <br/>

                <FormGroup label="*Gênero" htmlFor='inputGenero'>
                  <select name="genero" id="inputGenero">
                    <option value="masculino">masculino</option>
                    <option value="feminino">feminino</option>
                    </select>
                </FormGroup>
                <br/>

                <FormGroup label="*Cor: *" htmlFor='inputCor'>
                  <select name="cor" id="imputCor">
                    <option value="azul">azul</option>
                    <option value="verde">verde</option>
                    <option value="amarelo">amarelo</option>
                    </select>
                </FormGroup>
                <br/>

                <FormGroup label='Quantidade Máxima: *' htmlFor='inputQuantidadeMaxima'>
                  <input
                    type='text'
                    id='inputQuantidadeMaxima'
                    value={this.state.quantidadeMaxima}
                    className='form-control'
                    name='quantidadeMaxima'
                    onChange={(e) => this.setState({ quantidadeMaxima: e.target.value })}
                  />
                </FormGroup>
                

                <FormGroup label='Preço: *' htmlFor='inputPreço'>
                  <input
                    type='text'
                    id='inputPreço'
                    value={this.state.preço}
                    className='form-control'
                    name='preço'
                    onChange={(e) => this.setState({ preço: e.target.value })}
                  />
                </FormGroup>
                <br/>
                

                <Stack spacing={1} padding={1} direction='row'>
                  <button
                    onClick={this.cadastrar}
                    type='button'
                    className='btn btn-success'
                  >
                    Salvar
                  </button>
                  <button
                    onClick={this.cancelar}
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
}

export default CadastroProduto;
