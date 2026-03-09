let produtoSelecionado = null


function abrirProduto(nome, preco, imagem){

localStorage.setItem("produtoNome",nome)
localStorage.setItem("produtoPreco",preco)
localStorage.setItem("produtoImagem",imagem)

window.location.href="produto.html"

}


function carregarProduto(){

const nome = localStorage.getItem("produtoNome")
const preco = localStorage.getItem("produtoPreco")
const imagem = localStorage.getItem("produtoImagem")

document.getElementById("nomeProduto").innerText = nome

document.getElementById("precoProduto").innerText =
"R$ " + Number(preco).toFixed(2).replace(".", ",")

document.getElementById("imgProduto").src = imagem

}



let tamanho=""
let leite=""


function escolherTamanho(valor,btn){

tamanho=valor
selecionar(btn)

}


function escolherLeite(valor,btn){

leite=valor
selecionar(btn)

}


function selecionar(btn){

const grupo = btn.parentElement.children

for(let b of grupo){
b.classList.remove("ativo")
}

btn.classList.add("ativo")

}



function adicionarCarrinho(){

const nome = localStorage.getItem("produtoNome")
const preco = localStorage.getItem("produtoPreco")
const imagem = localStorage.getItem("produtoImagem")

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || []

carrinho.push({

nome,
preco,
imagem,
tamanho,
leite,
quantidade:1

})

localStorage.setItem("carrinho",JSON.stringify(carrinho))

window.location.href="carrinho.html"

}



function carregarCarrinho(){

const lista = document.getElementById("listaCarrinho")

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || []

let total=0

lista.innerHTML=""

carrinho.forEach((item,index)=>{

total += item.preco * item.quantidade

lista.innerHTML += `

<div class="carrinho-card">

<img src="${item.imagem}">

<div>
<h3>${item.nome}</h3>
<p>${item.tamanho}</p>
<p>Leite ${item.leite}</p>
</div>

<div class="quantidade">

<button onclick="diminuir(${index})">-</button>

<span>${item.quantidade}</span>

<button onclick="aumentar(${index})">+</button>

</div>

</div>

`

})

document.getElementById("total").innerText =
"Total: R$ " + total.toFixed(2).replace(".",",")

}



function aumentar(i){

let carrinho = JSON.parse(localStorage.getItem("carrinho"))

carrinho[i].quantidade++

localStorage.setItem("carrinho",JSON.stringify(carrinho))

location.reload()

}



function diminuir(i){

let carrinho = JSON.parse(localStorage.getItem("carrinho"))

if(carrinho[i].quantidade>1){

carrinho[i].quantidade--

}

localStorage.setItem("carrinho",JSON.stringify(carrinho))

location.reload()

}



function carregarResumo(){

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || []

let lista = document.getElementById("listaResumo")

let total = 0

lista.innerHTML = ""

carrinho.forEach(produto =>{

total += Number(produto.preco) * produto.quantidade

lista.innerHTML += `

<div class="resumo-item">

<div class="resumo-info">

<div class="resumo-nome">
${produto.nome}
</div>

<div class="resumo-detalhe">
${produto.tamanho} • ${produto.leite}
</div>

</div>

<div class="resumo-preco">
${produto.quantidade}x R$ ${Number(produto.preco).toFixed(2).replace(".",",")}
</div>

</div>

`

})

document.getElementById("totalResumo").innerText =
"Total: R$ " + total.toFixed(2).replace(".",",")

}



function confirmarPedido(){

localStorage.removeItem("carrinho")

window.location.href="confirmacao.html"

}