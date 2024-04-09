# Documentação da API

Esta documentação descreve os endpoints e métodos disponíveis na API REST desenvolvida com Node.js, Fastify e Prisma.

### Nome da API:

MusicPlaylistsAPI

### Descrição:

A MusicPlaylistsAPI é uma interface projetada para armazenar e gerenciar playlists de músicas, oferecendo recursos completos de registro e login de usuários. Com esta API, desenvolvedores podem criar aplicativos de música personalizados que permitem aos usuários criar, visualizar, atualizar e excluir suas próprias playlists.

### Recursos Principais:

- Registro de Usuário: Os usuários podem se registrar na plataforma fornecendo um nome de usuário, endereço de e-mail e senha. Este processo é protegido por medidas de segurança, garantindo a integridade das informações dos usuários.

- Login de Usuário: Uma vez registrados, os usuários podem fazer login na API usando suas credenciais de login ( email e senha ). Esse processo autentica os usuários e concede acesso aos recursos da API.

- Gerenciamento de Playlists: Os usuários autenticados têm a capacidade de criar novas playlists, visualizar suas playlists existentes, adicionar ou remover músicas de uma playlist e excluir playlists.

- Segurança Avançada: Todas as interações com a API são protegidas por autenticação por token, garantindo que apenas usuários autenticados possam acessar e modificar suas playlists.

## Endpoints

- ### Users

#### POST /users

Endpoint para registro de novos usuários.

##### Requisição

- Método: POST
- Corpo da requisição: Objeto JSON com os campos "name", "email" e "password"

##### Resposta

- Status: 201
- Corpo da resposta: { message: Usuário criado com sucesso }

- Status: 400
- Corpo da resposta: { message: Uma ou mais campos não foram informados! }

- Status: 409
- Corpo da resposta: { message: Já existe um usuário cadastrado com esse email! }

---

#### GET /users

Endpoint para listar todos os usuários cadastrados. Apenas usuários autenticados com a role "ADMIN" têm acesso.

##### Requisição

- Método: GET
- Autenticação: Bearer token

##### Resposta

- Status: 200 OK
- Corpo da resposta: Lista de usuários cadastrados

- Status: 403
- Corpo da resposta: { message: Não autorizado! }

- Status: 500
- Corpo da resposta: { error: Internal Server Error, description: jwt expired or jwt malformed or invalid signature }

---

#### PUT /users/:id

Endpoint para atualizar os dados de um usuário específico. Apenas usuários autenticados com a role "ADMIN" têm acesso.

##### Requisição

- Método: PUT
- Autenticação: Bearer token
- Parâmetros de rota: ID do usuário a ser atualizado
- Corpo da requisição: Objeto JSON com os campos a serem atualizados

##### Resposta

- Status: 200 OK
- Corpo da resposta: { message: Usuário atualizado com sucesso }

- Status: 400
- Corpo da resposta: { message: Id inválido! }

- Status: 403
- Corpo da resposta: { message: Não autorizado! }

- Status: 404
- Corpo da resposta: { message: Usuário não encontrado! }

- Status: 500
- Corpo da resposta: { error: Internal Server Error, message: jwt expired or jwt malformed or invalid signature }

---

#### DELETE /users/:id

Endpoint para deletar um usuário específico. Apenas usuários autenticados com a role "ADMIN" têm acesso.

##### Requisição

- Método: DELETE
- Autenticação: Bearer token
- Parâmetros de rota: ID do usuário a ser deletado

##### Resposta

- Status: 200 OK
- Corpo da resposta: { message: Usuário removido com sucesso }

- Status: 400
- Corpo da resposta: { message: Id inválido! }

- Status: 403
- Corpo da resposta: { message: Não autorizado! }

- Status: 404
- Corpo da resposta: { message: Usuário não encontrado! }

- Status: 500
- Corpo da resposta: { error: Internal Server Error, message: jwt expired or jwt malformed or invalid signature }

---

### Users/Login

#### POST /users/login

Endpoint para realizar login de usuários.

##### Requisição

- Método: POST
- Corpo da requisição: Objeto JSON com os campos "email" e "password"

##### Resposta

- Status: 200 OK
- Corpo da resposta: { token: JWT de autenticação }

- Status: 400
- Corpo da resposta: { message: Uma ou mais campos não foram informados! }

- Status: 401
- Corpo da resposta: { message: Senha incorreta! }

- Status: 404
- Corpo da resposta: { message: Usuário não encontrado! }

---

### Playlists

#### POST /playlists

Endpoint para registro de uma nova playlist.

##### Requisição

- Método: POST
- Autenticação: Bearer token
- Corpo da requisição: Objeto JSON com os campos "name", "genre" e "musics" (array de strings)

##### Resposta

- Status: 201
- Corpo da resposta: { message: Playlist criada com sucesso, playlist: [] }

- Status: 400
- Corpo da resposta: { message: Uma ou mais campos não foram informados! }

- Status: 500
- Corpo da resposta: { error: Internal Server Error, message: jwt expired or jwt malformed or invalid signature }

---

#### GET /playlists

Endpoint para listar todas as playlists criadas pelo usuário autenticado.

##### Requisição

- Método: GET
- Autenticação: Bearer token

##### Resposta

- Status: 200 OK
- Corpo da resposta: Lista de playlists criadas pelo usuário autenticado

- Status: 500
- Corpo da resposta: { error: Internal Server Error, message: jwt expired or jwt malformed or invalid signature }

---

#### PUT /playlists/:id

Endpoint para atualizar uma playlist específica.

##### Requisição

- Método: PUT
- Autenticação: Bearer token
- Parâmetros de rota: ID da playlist a ser atualizada
- Corpo da requisição: Objeto JSON com os campos a serem atualizados

##### Resposta

- Status: 200 OK
- Corpo da resposta: { message: Playlist atualizada com sucesso!, playlist: [] }

- Status: 400
- Corpo da resposta: { message: Id inválido! }

- Status: 404
- Corpo da resposta: { message: Playlist não encontrada! }

- Status: 500
- Corpo da resposta: { error: Internal Server Error, message: jwt expired or jwt malformed or invalid signature }

---

#### DELETE /playlists/:id

Endpoint para deletar uma playlist específica.

##### Requisição

- Método: DELETE
- Autenticação: Bearer token
- Parâmetros de rota: ID da playlist a ser deletada

##### Resposta

- Status: 200 OK
- Corpo da resposta: { message: Playlist excluida com sucesso! }

- Status: 400
- Corpo da resposta: { message: Id inválido! }

- Status: 404
- Corpo da resposta: { message: Playlist não encontrada! }

- Status: 500
- Corpo da resposta: { error: Internal Server Error, message: jwt expired or jwt malformed or invalid signature }

---

## Observações

- Todos os endpoints que exigem autenticação devem receber um token JWT no header "Authorization" no formato "Bearer {token}".
