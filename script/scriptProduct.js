var idProduct = []

onload = function () {
    let idListProductString = localStorage.getItem('idListProduct')

    if (idListProductString === null) {
        idProduct = []
    } else {
        idListProductString = idListProductString.split(',')
        for (let i = 0; i < idListProductString.length; i++) {
            idProduct[i] = Number(idListProductString[i])
        }
    }

    if (idProduct.length != 0) {
        attProduct()
    }
}

const ProductRegister = document.getElementById('btnProduct').addEventListener('click', function add(e) {
    e.preventDefault()
    const nameProduct = document.getElementById('nameProduct').value
    const weight = document.getElementById('weight').value
    const format = document.getElementById('format').value
    const length = document.getElementById('length').value
    const height = document.getElementById('height').value
    const width = document.getElementById('width').value
    const diameter = document.getElementById('diameter').value
    const desc = document.getElementById('desc').value

    if (nameProduct.length <= 0 || weight.length <= 0 || format.length <= 0 || length.length <= 0 || height.length <=0 || width.length <= 0 || diameter.length <= 0) {
        alert('Por favor preencha todos os dados obrigatórios!')
    } else {
        addId()

        let product = new createProduct(idProduct[(idProduct.length-1)], nameProduct, weight, format, length, height, width, diameter, desc)
    
        localStorage.setItem(`Product_${idProduct[(idProduct.length - 1)]}`, JSON.stringify(product))
        
        eraseItens()
    
        attProduct()

        let formProduct = document.getElementById('formProduct')
        formProduct.reset()
        
    }
})

function createProduct(id, name, weight, format, length, height, width, diameter, desc) {
    this.id = id,
    this.nome = name,
    this.peso = weight,
    this.formato = format,
    this.comprimento = length,
    this.altura = height,
    this.largura = width,
    this.diametro = diameter,
    this.descricao = desc
}

function addId() {
    if (idProduct.length === 0) {
        idProduct.push(1)
    } else {
        let val = max(idProduct)
        idProduct.push(val + 1)
    }
    localStorage.setItem('idListProduct', idProduct.join())
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

function attProduct() {
    for (let i = 0; i < idProduct.length; i++) {
        let Product = JSON.parse(localStorage.getItem(`Product_${idProduct[i]}`))
        let resProduct = document.getElementById('resProduct')
        let ul = document.createElement('ul')
        let li = document.createElement('li')
        let btn = document.createElement('button')

        btn.innerText = 'Apagar Produto'
        btn.classList.add('buttonErase')
        btn.addEventListener('click', clearProduct)
        
        li.setAttribute('id', `Product_${Product.id}`)
        li.innerText = `${Product.nome}`

        ul.setAttribute('id', `infoProduct_${Product.id}`)
        ul.classList.add('hidden')

        Object.keys(Product).forEach(function(key) {
            let newLi = new createLi(`${key.toUpperCase()}: ${Product[key]}`)
            ul.appendChild(newLi)
        })

        ul.appendChild(btn)
        li.appendChild(ul)
        li.addEventListener('click', toggleProduct)
        resProduct.appendChild(li)
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

function clearProduct() {
    let Product = this.closest('li').id
    let ProductNumber = Number(Product[(Product.length - 1)])

    localStorage.removeItem(`${Product}`)

    if (idProduct.length <= 1) {
        idProduct = []
    } else {
        let idTemp = idProduct.filter(function (id) {
            return id != ProductNumber
        })

        idProduct = idTemp
    }

    if (idProduct.length === 0) {
        localStorage.removeItem('idListProduct')
    } else {
        localStorage.setItem('idListProduct', idProduct.join())
    }
    
    eraseItens()
    attProduct()
}

function eraseItens() {
    let resProduct = document.getElementById('resProduct')
    resProduct.innerHTML = ''
}

function clearAll() {
    let confirm = window.confirm('Você tem certeza que deseja apagar todos os Produtos?')

    if (confirm) {
        for (let i = 0; i < idProduct.length; i++) {
            localStorage.removeItem(`Product_${idProduct[i]}`)
        }
        idProduct = []
        localStorage.removeItem('idListProduct')
        eraseItens()
    }
}