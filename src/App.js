import React from 'react';
import 'bootswatch/dist/slate/bootstrap.css';
import './custom.css';
import 'toastr/build/toastr.min';
import 'toastr/build/toastr.css';
import Rotas from './rotas.js';

function App() {
  return (
    <div className='container'>
      <Rotas />
    </div>
  );
}

export default App;
