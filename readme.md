

Notes
- Issue when initiating npm project ("Unexpected "." token). It is about using nvm version 1.1.7 and the solution were upgrading to version 1.1.9 and reinstal the node version in nvm (17.7.0)

server
   service - tudo que é regra de negócio ou processamento
   controller - intermediar a camada de apresentação e a camada de negócio
   routes - camada de apresentação
   server  - responsável pro criar o servidor (mas não instancia)
   index -  instancia o servidor e expoe pra web (lado da infraestrutura)
   config - tudo que for estático do projeto