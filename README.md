# Service Example - Clean Architecture

Este é um projeto de exemplo para serviços VTEX IO, refatorado seguindo os princípios da **Clean Architecture**. O objetivo é demonstrar uma estrutura robusta, testável e escalável para aplicações Node.js no ecossistema VTEX.

## 🚀 Tecnologias

- [VTEX IO](https://learn.vtex.com/)
- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

## 🏗️ Arquitetura

O projeto está dividido em camadas para garantir a separação de responsabilidades:

```text
node/
├── domain/                # Camada Central (Regras de Negócio)
│   ├── entities/          # Objetos de domínio (ex: StatusInfo, ViaCep)
│   ├── repositories/      # Interfaces e contratos
│   └── use-cases/         # Lógica de aplicação (Casos de uso)
├── data/                  # Implementações de Dados
│   └── repositories/      # Implementação das interfaces (ex: busca no ViaCEP)
├── presentation/          # Camada de Apresentação
│   └── controllers/       # Orquestração de requisição/resposta (HTTP)
├── clients/               # Infraestrutura (VTEX Clients nativos)
└── middlewares/           # Wrappers de entrada para o VTEX IO
```

### Por que Clean Architecture?

1. **Independência de Framework**: A lógica de negócio não depende das APIs internas da VTEX.
2. **Testabilidade**: Facilita a criação de testes unitários sem mocks complexos de infraestrutura.
3. **Facilidade de Manutenção**: Mudanças em serviços externos (como trocar o provedor de CEP) afetam apenas a camada de `data` ou `clients`.

## 🛠️ Instalação e Execução

### Pré-requisitos

- possuir o [VTEX Toolbelt](https://learn.vtex.com/docs/course-vtex-io-getting-started-setup-step-1-installing-the-vtex-toolbelt-pt) instalado.

### Passo a Passo

1. Clone o repositório.
2. Acesse a pasta do projeto:
   ```bash
   cd service-example
   ```
3. Faça login na sua conta VTEX:
   ```bash
   vtex login <account-name>
   ```
4. Utilize um workspace de desenvolvimento:
   ```bash
   vtex use <workspace-name>
   ```
5. Inicie o link do projeto:
   ```bash
   vtex link
   ```

## 🛣️ Rotas Disponíveis

O serviço expõe os seguintes endpoints:

### Status

`GET /_v/status/:code`
Retorna informações sobre um código de status HTTP específico.

### ViaCEP

`GET /_v/viacep/:zipCode`
Retorna dados de endereço para o CEP informado, utilizando a API do ViaCEP.

---

Desenvolvido como um exemplo de excelência técnica em VTEX IO.
