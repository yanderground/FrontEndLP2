import React from 'react';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso } from '../components/toastr';
import '../custom.css';

class RealizarVenda extends React.Component {
  state = {
    produto: '',
    tamanho: '',
    genero: '',
    cor: '',
    quantidade: '',
    cliente: '',
    dataVenda: ''
  };

  cadastrar = () => {
    mensagemSucesso(`Venda ${this.state.nome} cadastrado com sucesso!`);
  };

  cancelar = () => {};

  render() {
    return (
      <div className='container'>
        <Card title='Realizar Vendas'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='bs-component'>

              <FormGroup label="Produto: " htmlFor='inputProduto'>
                  <select name="produto" id="inputproduto">
                    <option value="Camisa Nike dryfit">Camisa Nike dryfit</option>
                  </select>
                </FormGroup>
                <br/>
                
                <FormGroup label="Tamanho: " htmlFor='inputTamanho'>
                  <select name="tamanho" id="inputTamanho">
                    <option value="p">P</option>
                    <option value="m">M</option>
                    <option value="g">G</option>
                    <option value="gg">GG</option>
                  </select>
                </FormGroup>
                <br/>

                <FormGroup label="Gênero: " htmlFor='inputGenero'>
                  <select name="genero" id="inputGenero">
                    <option value="masculino">masculino</option>
                    <option value="feminino">feminino</option>
                    </select>
                </FormGroup>
                <br/>

                <FormGroup label="Cor: " htmlFor='inputCor'>
                  <select name="cor" id="imputCor">
                    <option value="azul">azul</option>
                    <option value="verde">verde</option>
                    <option value="amarelo">amarelo</option>
                    </select>
                </FormGroup>
                <br/>

                <FormGroup label='Quantidade: ' htmlFor='inputQuantidade' >
                  <input
                    type='number'
                    id='inputQuantidade'
                    value={this.state.quantidade}
                    className='form-control'
                    name='quantidade'
                    defaultValue={1}
                    onChange={(e) =>
                      this.setState({ quantidade: e.target.value })
                    }
                  />
                </FormGroup>

                <FormGroup label='Cliente: ' htmlFor='inputCliente'>
                  <input
                    type='text'
                    id='inputCliente'
                    value={this.state.cliente}
                    className='form-control'
                    name='cliente'
                    onChange={(e) =>
                      this.setState({ cliente: e.target.value })
                    }
                  />
                </FormGroup>
                
                <FormGroup label='Data do Venda: *' htmlFor='inputDataVenda'>
                  <input
                    type='date'
                    id='inputDataVenda'
                    value={this.state.dataVenda}
                    className='form-control'
                    name='dataVenda'
                    onChange={(e) =>
                      this.setState({ dataVenda: e.target.value })
                    }
                  />
                </FormGroup>                

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

export default RealizarVenda;
