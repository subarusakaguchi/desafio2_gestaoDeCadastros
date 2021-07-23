var id = []

onload = function () {
    let idListClientString = localStorage.getItem('idListClient')

    if (idListClientString === null) {
        id = []
    } else {
        idListClientString = idListClientString.split(',')
        for (let i = 0; i < idListClientString.length; i++) {
            id[i] = Number(idListClientString[i])
        }
    }

    if (id.length != 0) {
        attClient()
    }
}

const clientRegister = document.getElementById('btnClient').addEventListener('click', function add(e) {
    e.preventDefault()
    const nameClient = document.getElementById('nameClient').value
    const cpf = document.getElementById('cpf').value
    const email = document.getElementById('email').value
    const cep = document.getElementById('cep').value
    const numberHouse = document.getElementById('numberHouse').value
    const complement = document.getElementById('complement').value

    if (nameClient.length <= 0 || cpf.length <= 0 || email.length <= 0 || cep.length <= 0 || numberHouse.length <=0) {
        alert('Por favor preencha todos os dados obrigatórios!')
    } else {
        addId()

        let client = new createClient(id[(id.length-1)], nameClient, cpf, email, cep, numberHouse, complement)
    
        localStorage.setItem(`client_${id[(id.length - 1)]}`, JSON.stringify(client))
        
        eraseItens()
    
        attClient()

        let formClient = document.getElementById('formClient')
        formClient.reset()
        
    }
})

function createClient(id, name, cpf, email, cep, number, complement) {
    this.id = id,
    this.nome = name,
    this.cpf = cpf,
    this.email = email,
    this.cep = cep,
    this.numero = number,
    this.complemento = complement
}

function addId() {
    if (id.length === 0) {
        id.push(1)
    } else {
        let val = max(id)
        id.push(val + 1)
    }
    localStorage.setItem('idListClient', id.join())
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

function attClient() {
    for (let i = 0; i < id.length; i++) {
        let client = JSON.parse(localStorage.getItem(`client_${id[i]}`))
        let resClient = document.getElementById('resClient')
        let ul = document.createElement('ul')
        let li = document.createElement('li')
        let btn = document.createElement('button')

        btn.innerText = 'Apagar Cliente'
        btn.classList.add('buttonErase')
        btn.addEventListener('click', clearClient)
        
        li.setAttribute('id', `client_${client.id}`)
        li.innerText = `${client.nome}`

        ul.setAttribute('id', `infoClient_${client.id}`)
        ul.classList.add('hidden')

        Object.keys(client).forEach(function(key) {
            let newLi = new createLi(`${key.toUpperCase()}: ${client[key]}`)
            ul.appendChild(newLi)
        })

        ul.appendChild(btn)
        li.appendChild(ul)
        li.addEventListener('click', toggleClient)
        resClient.appendChild(li)
    }
}

function createLi(text) {
    const li = document.createElement('li')
    li.classList.add('showInfo')
    li.innerHTML = `${text}`
    return li
}

function toggleClient() {
    const id = this.id
    let div = document.getElementById(`${id}`)
    div.classList.toggle('active')
    this.children[0].classList.toggle('hidden')
}

function clearClient() {
    let client = this.closest('li').id
    let clientNumber = Number(client[(client.length - 1)])

    localStorage.removeItem(`${client}`)

    if (id.length <= 1) {
        id = []
    } else {
        let idTemp = id.filter(function (id) {
            return id != clientNumber
        })

        id = idTemp
    }

    if (id.length === 0) {
        localStorage.removeItem('idListClient')
    } else {
        localStorage.setItem('idListClient', id.join())
    }
    
    eraseItens()
    attClient()
}

function eraseItens() {
    let resClient = document.getElementById('resClient')
    resClient.innerHTML = ''
}

function clearAll() {
    let confirm = window.confirm('Você tem certeza que deseja apagar todos os clientes?')

    if (confirm) {
        for (let i = 0; i < id.length; i++) {
            localStorage.removeItem(`client_${id[i]}`)
        }
        id = []
        localStorage.removeItem('idListClient')
        eraseItens()
    }
}