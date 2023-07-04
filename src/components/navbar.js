import React from 'react';
import 'bootswatch/dist/slate/bootstrap.css';
import { useLocation } from 'react-router-dom';
import NavbarItem from './navbarItem';

function Navbar(props) {
  const location = useLocation();

  const isLoginPage = location.pathname === '/';

  if (isLoginPage) {
    return null; 
  }

  return (
    <div className='navbar navbar-expand-lg fixed-top navbar-dark bg-primary'>
      <div className='container'>
        <a href='/tela-inicio' className='navbar-brand'>
          Gerenciador de Vendas
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
              href='/listagem-funcionarios'
              label='Funcionários'
            />
            <NavbarItem
              render='true'
              href='/listagem-fornecedores'
              label='Fornecedores'
            />
            <NavbarItem
              render='true'
              href='/listagem-produtos'
              label='Produtos'
            />
            <NavbarItem
              render='true'
              href='/listagem-vendas'
              label='Vendas'
            />
            <NavbarItem
              render='true'
              href='/listagem-clientes'
              label='Clientes'
            />
            <NavbarItem
              render='true'
              href='/listagem-pedidos'
              label='Pedidos'
            />
          </ul>
        </div>
        <a href='/'><button type="button" className="btn btn-danger" >Sair</button></a>
      </div>
    </div>
  );
}

export default Navbar;
