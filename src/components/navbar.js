import React from 'react';
import 'bootswatch/dist/flatly/bootstrap.css';


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
              href='/tela-inicial'
              label='Início'
            />
            <NavbarItem
              render='true'
              href='/listagem-funcionarios'
              label='Funcionários'
            />
            <NavbarItem
              render='true'
              href='/cadastro-pedido'
              label='Pedidos'
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
              href='/listagem-clientes'
              label='Clientes'
            />
            <NavbarItem
              render='true'
              href='/listagem-tamanhos'
              label='Tamanhos'
            />
            <NavbarItem
              render='true'
              href='/listagem-cores'
              label='Cores'
            />
            <NavbarItem
              render='true'
              href='/listagem-departamentos'
              label='Departamentos'
            />
            <NavbarItem
              render='true'
              href='/realizar-venda'
              label='Vendas'
            />
            
          </ul>
        </div> 
        <a href="./tela-inicial"><button>sair</button> </a>
                    
      </div>
    </div>
  );
}

export default Navbar;