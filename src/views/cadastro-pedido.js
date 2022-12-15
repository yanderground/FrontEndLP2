import React from 'react';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso } from '../components/toastr';
import '../custom.css';

class CadastroPedido extends React.Component {
  state = {
    produto: '',
    tamanho: '',
    genero: '',
    cor: '',
    quantidade: '',
    minimo: '',
    fornecedor: '',
    dataPedido: '',
    dataEntrega: ''
  };

  cadastrar = () => {
    mensagemSucesso(`Pedido ${this.state.nome} cadastrado com sucesso!`);
  };

  cancelar = () => {};

  render() {
    return (
      <div className='container'>
        <Card title='Cadastro de Pedidos'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='bs-component'>

              <FormGroup label="*Produto" htmlFor='inputProduto'>
                  <select name="produto" id="inputproduto">
                    <option value="Camisa Nike dryfit">Camisa Nike dryfit</option>
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

                <FormGroup label="*Cor: " htmlFor='inputCor'>
                  <select name="cor" id="imputCor">
                    <option value="azul">azul</option>
                    <option value="verde">verde</option>
                    <option value="amarelo">amarelo</option>
                    </select>
                </FormGroup>
                <br/>

                <FormGroup label='Quantidade: *' htmlFor='inputQuantidade'>
                  <input
                    type='text'
                    id='inputQuantidade'
                    value={this.state.quantidade}
                    className='form-control'
                    name='quantidade'
                    onChange={(e) =>
                      this.setState({ quantidade: e.target.value })
                    }
                  />
                </FormGroup>

                <FormGroup label='Mínimo: *' htmlFor='inputMínimo'>
                  <input
                    type='text'
                    id='inputMínimo'
                    value={this.state.minimo}
                    className='form-control'
                    name='minimo'
                    onChange={(e) =>
                      this.setState({ minimo: e.target.value })
                    }
                  />
                </FormGroup>

                <br/>
                <FormGroup label="*Fornecedor:" htmlFor='inputFornecedor'>
                  <select name="Fornecedor" id="imputFornecedor">
                    <option value="azul">Nike BR</option>
                    </select>
                </FormGroup>
                <br/>
                
                <FormGroup label='Data do Pedido: *' htmlFor='inputDataPedido'>
                  <input
                    type='date'
                    id='inputDataPedido'
                    value={this.state.dataPedido}
                    className='form-control'
                    name='dataPedido'
                    onChange={(e) =>
                      this.setState({ dataPedido: e.target.value })
                    }
                  />
                </FormGroup>

                <FormGroup label='Data da Entrega: *' htmlFor='inputDataEntrega'>
                  <input
                    type='date'
                    id='inputDataEntrega'
                    value={this.state.dataEntrega}
                    className='form-control'
                    name='dataEntrega'
                    onChange={(e) =>
                      this.setState({ dataEntrega: e.target.value })
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

export default CadastroPedido;
