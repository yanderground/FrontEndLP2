import React from 'react';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso } from '../components/toastr';
import '../custom.css';

class CadastroDepartamento extends React.Component {
  state = {
    Departamento: ''
  };

  cadastrar = () => {
    mensagemSucesso(`Departamento ${this.state.Departamento} cadastrado com sucesso!`);
  };

  cancelar = () => {};

  render() {
    return (
      <div className='container'>
        <Card title='Cadastro de Departamento'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='bs-component'>
                
                <FormGroup label='Departamento: *' htmlFor='inputDepartamento'>
                  <input
                    type='text'
                    id='inputDepartamento'
                    value={this.state.Departamento}
                    className='form-control'
                    name='Departamento'
                    onChange={(e) => this.setState({ Departamento: e.target.value })}
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

export default CadastroDepartamento;
