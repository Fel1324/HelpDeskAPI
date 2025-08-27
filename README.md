# HelpDeskAPI
Projeto desenvolvimento como desafio prático final pela formação Full-Stack da Rocketseat.

- *Feats iniciais: SignUp e SignIn (X)*

- *Criar os middlewares de autenticação e autorização* 

- Feats Admin:
  - > Técnicos:
    - *Criar técnicos*
      - *Atribuir horário de disponibilidade e Senha*
    - *Listar técnicos*
    - *Editar técnicos*

  - > Serviços
    - *Criar Serviços*
    - *Listar Serviços*
    - *Editar Serviços*
    - *Desativar Serviços*

  - > Clientes
    - *Listar clientes*
    - *Editar clientes*
    - Excluir clientes
      - Excluir seus chamados

  - > Chamados
    - Listar todos os chamados
    - Editar status dos chamados

- Feats Cliente:
  - *Criar conta*
  - *Criar chamados*
    - *atribuir a um técnico disponível durante a criação do chamado*
  - Visualizar seus chamados
  - Excluir a própria conta
    - Excluir seus chamados
  - Editar a própria conta
    - Upload de foto de perfil
  - O cliente não pode alterar e nem excluir contas que não lhe pertençam
  - O cliente não pode alterar o chamado depois de ter criado
  

- Feats Técnicos:
  - Listar seus chamados
  - Adicionar novos serviços aos chamados se for necessário
  - Quando for iniciado o atendimento o status do chamado deve mudar (em andamento)
  - Quando for encerrado o atendimento o status do chamado deve mudar (encerrado)
  - Editar a própria conta
    - Upload de foto de perfil
  - O técnico não pode criar, alterar e excluir contas de clientes
  - O técnico não pode criar chamados