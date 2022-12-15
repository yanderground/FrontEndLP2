import React from 'react';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso } from '../components/toastr';
import '../custom.css';

class CadastroTamanho extends React.Component {
  state = {
    tamanho: ''
  };

  cadastrar = () => {
    mensagemSucesso(`Tamanho ${this.state.tamanho} cadastrado com sucesso!`);
  };

  cancelar = () => {};

  render() {
    return (
      <div className='container'>
        <Card title='Cadastro de Tamanho'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='bs-component'>
                
                <FormGroup label='Tamanho: *' htmlFor='inputTamanho'>
                  <input
                    type='text'
                    id='inputTamanho'
                    value={this.state.tamanho}
                    className='form-control'
                    name='tamanho'
                    onChange={(e) => this.setState({ tamanho: e.target.value })}
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

export default CadastroTamanho;
