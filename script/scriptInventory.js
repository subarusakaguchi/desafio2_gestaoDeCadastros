const cepLocal = ('87654321')
var idBuy = []

onload = function () {
    let idListProductString = localStorage.getItem('idListShipping')

    if (idListProductString === null) {
        idBuy = []
    } else {
        idListProductString = idListProductString.split(',')
        for (let i = 0; i < idListProductString.length; i++) {
            idBuy[i] = Number(idListProductString[i])
        }
    }

    if (idBuy.length != 0) {
        attBuy()
    }
}

document.getElementById('btnBuy').addEventListener('click', function addBuy(e) {
    e.preventDefault()
    const idClient = document.getElementById('idClient').value
    const idProduct = document.getElementById('idProduct').value
    const client = JSON.parse(localStorage.getItem(`client_${idClient}`))
    const Product = JSON.parse(localStorage.getItem(`Product_${idProduct}`))
    const service = document.getElementById('service').value

    let shipping = new createShipping(client, Product, service)
    let infoBuy = new createBuy(client, Product, service)

    addIdBuy()

    localStorage.setItem(`shipping_${idBuy[(idBuy.length - 1)]}`, JSON.stringify(shipping))
    localStorage.setItem(`buy_${idBuy[(idBuy.length - 1)]}`, JSON.stringify(infoBuy))

    eraseItens()
    
    attBuy()

    let formInventory = document.getElementById('formInventory')
    formInventory.reset()
})

function createShipping(client, product, service) {
    this.sCepOrigem = cepLocal[0],
    this.sCepDestino = `${client.cep}`,
    this.nVlPeso = `${product.peso}`,
    this.nCdFormato = `${product.formato}`,
    this.nVlComprimento = `${product.comprimento}`,
    this.nVlAltura = `${product.altura}`,
    this.nVlLargura = `${product.largura}`,
    this.nCdServico = [`${service}`],
    this.nVlDiametro = `${product.diametro}`
}

function createBuy(client, product, service) {
    this.nomeCliente = client.nome,
    this.nomeProduto = product.nome,
    this.servico = service,
    this.cepDestino = client.cep
}

function addIdBuy() {
    if (idBuy.length === 0) {
        idBuy.push(1)
    } else {
        let val = max(idBuy)
        idBuy.push(val + 1)
    }
    localStorage.setItem('idListShipping', idBuy.join())
}

function max(array) {
    let max = 0
    for (let i = 0; i < array.length; i++ ) {
        if (i === 0) {
            max = array[i]
        } else {
            if (array[i] > max) max = array[i]
        }
    }
    return max
}

function attBuy() {
    for (let i = 0; i < idBuy.length; i++) {
        const buy = JSON.parse(localStorage.getItem(`buy_${idBuy[i]}`))
        const ship = JSON.parse(localStorage.getItem(`shipping_${idBuy[i]}`))
        let resBuy = document.getElementById('resBuy')
        let ul = document.createElement('ul')
        let li = document.createElement('li')
        let btnErase = document.createElement('button')
        let btnShippinng = document.createElement('button')
        let txtarea = document.createElement('textarea')

        txtarea.setAttribute('id', `txtarea_${idBuy[i]}`)
        txtarea.classList.add('sr-only')
        txtarea.innerText = '{\n'
        Object.keys(ship).forEach(function(key) {
            txtarea.innerText += `${key}: "${ship[key]}"`
        })
        txtarea.innerText += '}'

        btnErase.innerText = 'Apagar Compra'
        btnErase.classList.add('buttonErase')
        btnErase.addEventListener('click', clearBuy)

        btnShippinng.innerText = 'Copiar dados para envio'
        btnShippinng.classList.add('buttonErase')
        btnShippinng.addEventListener('click', copyData)
        
        li.setAttribute('id', `buy_${idBuy[i]}`)
        li.innerText = `${buy.nomeCliente} - ${buy.nomeProduto}`

        ul.setAttribute('id', `infoBuy_${idBuy[i]}`)
        ul.classList.add('hidden')

        Object.keys(buy).forEach(function(key) {
            let newLi = new createLi(`${key.toUpperCase()}: ${buy[key]}`)
            ul.appendChild(newLi)
        })

        ul.appendChild(txtarea)
        ul.appendChild(btnShippinng)
        ul.appendChild(btnErase)
        li.appendChild(ul)
        li.addEventListener('click', toggleProduct)
        resBuy.appendChild(li)
    }
}

function createLi(text) {
    const li = document.createElement('li')
    li.classList.add('showInfo')
    li.innerHTML = `${text}`
    return li
}

function toggleProduct() {
    const id = this.id
    let div = document.getElementById(`${id}`)
    div.classList.toggle('active')
    this.children[0].classList.toggle('hidden')
}

function eraseItens() {
    let resBuy = document.getElementById('resBuy')
    resBuy.innerHTML = ''
}

function copyData() {
    let itemBuy = this.closest('li').id
    let itemBuyNumber = Number(itemBuy[(itemBuy.length - 1)])
    let txtarea = document.getElementById(`txtarea_${itemBuyNumber}`)
    console.log(txtarea)

    txtarea.select()
    txtarea.setSelectionRange(0, 99999)
    document.execCommand("copy")
    alert(`Os dados para envio foram copiados para a área de transferência`)
}

function clearBuy() {
    let itemBuy = this.closest('li').id
    let itemBuyNumber = Number(itemBuy[(itemBuy.length - 1)])

    localStorage.removeItem(`${itemBuy}`)
    localStorage.removeItem(`shipping_${itemBuyNumber}`)

    if (idBuy.length <= 1) {
        idBuy = []
    } else {
        let idTemp = idBuy.filter(function (id) {
            return id != itemBuyNumber
        })

        idBuy= idTemp
    }

    if (idBuy.length === 0) {
        localStorage.removeItem('idListShipping')
    } else {
        localStorage.setItem('idListShipping', idBuy.join())
    }
    
    eraseItens()
    attBuy()
}

function clearAllBuy() {
    let confirm = window.confirm('Você tem certeza que deseja apagar todos os Produtos?')

    if (confirm) {
        for (let i = 0; i < idBuy.length; i++) {
            localStorage.removeItem(`shipping_${idProduct[i]}`)
        }
        idBuy = []
        localStorage.removeItem('idListShipping')
        eraseItens()
    }
}