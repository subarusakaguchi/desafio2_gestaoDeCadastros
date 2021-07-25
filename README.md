![principal](https://user-images.githubusercontent.com/50173813/126886078-e332d0da-ab30-43c0-bf09-ffa02c21a2c8.png)
# Sistema de Gestão de Compras
 Sistema de e-commerce para cadastro e inventário de produtos e clientes.
 
 O acesso para a versão hospedada no Github pode ser acessada [clickando aqui!](https://subarusakaguchi.github.io/desafio2_gestaoDeCadastros/index.html)
# O que é o sistema de gestão?
Um sistema capaz de cadastrar, gerenciar e relacionar clientes e produtos para futuro envio de mercadorias. O sistema é capaz de gravar os dados para envio do cliente e também as informações principais necessárias para o envio pelos correios do Brasil. Os dados foram baseados na [API Correios-Brasil](https://github.com/FinotiLucas/Correios-Brasil), sendo este capaz de gerar um JSON com os argumentos necessários para o cálculo do frete para a respectiva compra. O sistema mostra em tempo real os dados cadastrados com a possibilidade de limpá-los individualmente ou de uma única vez.
![Cliente](https://user-images.githubusercontent.com/50173813/126885852-120931cc-5c08-4b3a-b9aa-d3149f80f022.png)
# Funcionalidades:
* Cadastro de clientes
* Cadastro de Produtos
* Gerencimanento de ambos
* Capacidade de relacionar ambos em um sistema de compra

![compra pnng](https://user-images.githubusercontent.com/50173813/126885885-911877c8-3e5e-4c88-85bb-7e1e55196796.png)

Ao final o sistema pode gerar um JSON com os dados para envio (clickando no botão __Copiar dados para envio__), como este abaixo do exemplo:
```
{
 sCepOrigem: "87654321",
 sCepDestino: "651326",
 nVlPeso: "10",
 nCdFormato: "2",
 nVlComprimento: "100",
 nVlAltura: "50",
 nVlLargura: "25",
 nCdServico: "12315",
 nVlDiametro: "115"
}
```
