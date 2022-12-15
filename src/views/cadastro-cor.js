import React from 'react';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso } from '../components/toastr';
import '../custom.css';

class CadastroCor extends React.Component {
  state = {
    Cor: ''
  };

  cadastrar = () => {
    mensagemSucesso(`Cor ${this.state.Cor} cadastrado com sucesso!`);
  };

  cancelar = () => {};

  render() {
    return (
      <div className='container'>
        <Card title='Cadastro de Cor'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='bs-component'>
                
                <FormGroup label='Cor: *' htmlFor='inputCor'>
                  <input
                    type='text'
                    id='inputCor'
                    value={this.state.Cor}
                    className='form-control'
                    name='Cor'
                    onChange={(e) => this.setState({ Cor: e.target.value })}
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

export default CadastroCor;
