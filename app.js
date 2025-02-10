// Importando o Servidor //
const express = require('express');
const dotenv = require('dotenv');

// Inicializando o Servodor  //
const app = express()


// Middleware(meio termo) par permite o uso de json //
app.use(express.json());

//configurando a env//
dotenv.config()

// Porta que o servidor irá rodar  //
const port = process.env.PORTA

// Nosso banco de Dados //
const produtos = []

// Rota Raiz //
app.get('/', (requisicao, resposta) => {
  try {
    if(produtos.length === 0){
      return resposta.status(200).json({msg:"Não há produtos a serem exibidos"})   // console.log("Banco Vazio") //
    } 
    resposta.status(200).json(produtos)
  } catch (error) {
    resposta.status(500).json({msg: "Err ao Buscar produto"})                   //  console.status("Erro ao listar produtos!")  //
  }
 
})



// Rota hello //
app.get('/hello', (requisicao, resposta) => {
    resposta.send('Hello World!')
  })


  // Rota de cadastro de produtos
  app.post('/', (requisicao, resposta) => {
    try {
      const{id, nome, preco, quantidade} = requisicao.body;
      const novoProduto = {id, nome, preco, quantidade}
      produtos.push(novoProduto);
      resposta.status(201).json(novoProduto)
    } catch (error) {
      resposta.status(500).json({msg: "Err ao Cadastrar produto!"})  
    }
  })

// Rota para editar o produto 
//http:/localhost:3000/1
app.put('/:id', (requisicao, resposta) => {
try {
  const id  = requisicao.params.id
  const produto = produtos.find(elemento => elemento.id === id)
  if(!produto){
  return resposta.status(404).json({msg: "Produto não encontrado"})
  }
  const{novoNome, novoPreco, novaQuantidade } = requisicao.body;
  if(produto){
    produto.nome = novoNome
    produto.preco = novoPreco
    produto.preco = novaQuantidade
    return produto
  }
  resposta.status(200).json(produto)
} catch (error) {
  resposta.status(500).json({msg: "Erro ao atualizar produtos"})
}
})


  // Ouvindo a porta 3000 e exibindo uma mensagem no servidor //
app.listen(port, () => {
  console.log(`Servidor rodando em http//localhost:${port}`)
})



