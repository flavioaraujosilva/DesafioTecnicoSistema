# Sistema de Gerenciamento de Clientes

Este projeto é um sistema de gerenciamento de clientes desenvolvido com Next.js, React, TypeScript e Tailwind CSS no frontend, e Laravel no backend. O sistema permite cadastrar, editar, listar e deletar clientes, incluindo suas informações pessoais, endereços, telefones e cartões de crédito.

## Funcionalidades

- Cadastro de clientes com informações pessoais, endereços, telefones e cartões de crédito.
- Listagem paginada de clientes com opção de busca.
- Edição de dados do cliente através de um formulário em múltiplos passos.
- Ações de adicionar, editar e deletar endereços, telefones e cartões de crédito.
- Consulta de endereço via CEP utilizando a API ViaCEP.

## Tecnologias Utilizadas

- **Frontend:**

  - Next.js 14.2.3
  - React 18
  - TypeScript
  - Tailwind CSS 3.4.3
  - Material-Table
  - Axios
  - React-Toastify
  - React-Input-Mask

- **Backend:**
  - Laravel 11
  - PHP 8.3
  - API RESTful

## Instalação

### Pré-requisitos

- Node.js e npm/yarn
- PHP 8.3
- MySQL 8.0
- Docker e Docker Compose (recomendado)

### Inicio

1. Clone o repositório

   ```bash
   git clone https://github.com/flavioaraujosilva/DesafioTecnicoSistema.git
   ```

2. Instale as dependências do PHP:

   ```bash
   composer install
   ```

3. Instalar o Docker Compose
   Se ainda não tiver o Docker Compose instalado, você pode instalá-lo. Como a instalação pode variar dependendo do sistema operacional, recomendo verificar a documentação oficial para instruções específicas. https://docs.docker.com/compose/install/

   ```bash
   docker-compose up -d
   ```

4. Acesse a aplicação em [http://localhost:3000](http://localhost:3000).

## Endpoints da API

- `GET /api/clientes`: Lista paginada de clientes.
- `POST /api/clientes`: Criação de um novo cliente.
- `GET /api/clientes/{id}`: Detalhes de um cliente específico.
- `PUT /api/clientes/{id}`: Atualização de um cliente específico.
- `DELETE /api/clientes/{id}`: Deleção de um cliente específico.
- `POST /api/clientes/{id}/enderecos`: Adiciona um novo endereço para o cliente.
- `POST /api/clientes/{id}/telefones`: Adiciona um novo telefone para o cliente.
- `POST /api/clientes/{id}/cartoes`: Adiciona um novo cartão para o cliente.
