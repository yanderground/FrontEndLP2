import React from 'react';

import NavbarItem from './navbarItem';

function Navbar(props) {
  return (
    <div className='navbar navbar-expand-lg fixed-top navbar-dark bg-primary'>
      <div className='container'>
        <a href='/' className='navbar-brand'>
          Meu Sistema
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarResponsive'
          aria-controls='navbarResponsive'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarResponsive'>
          <ul className='navbar-nav'>
            <NavbarItem
              render='true'
              href='/cadastro-funcionario'
              label='Usuários'
            />
            <NavbarItem
              render='true'
              href='/cadastro-pedido'
              label='Pedidos'
            />
            <NavbarItem
              render='true'
              href='/cadastro-fornecedor'
              label='Fornecedores'
            />
            <NavbarItem
              render='true'
              href='/cadastro-produto'
              label='Produtos'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;