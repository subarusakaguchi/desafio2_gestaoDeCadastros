var id = []
onload = function () {
    let idListString = localStorage.getItem('idList')
    if (idListString === null) {
        id = []
    } else {
        idListString = idListString.split(',')
        for (let i = 0; i < idListString.length; i++) {
            id[i] = Number(idListString[i])
        }
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

    addId()

    let client = new createClient(id[(id.length-1)], nameClient, cpf, email, cep, numberHouse, complement)

    localStorage.setItem(`client_${id[(id.length - 1)]}`, JSON.stringify(client))
    console.log(client)

    attClient(client)
})

function addId() {
    if (id.length === 0) {
        id.push(1)
    } else {
        let val = max(id)
        id.push(val + 1)
    }
    localStorage.setItem('idList', id.join())
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

function createClient(id, name, cpf, email, cep, number, complement) {
    this.id = id,
    this.nome = name,
    this.cpf = cpf,
    this.email = email,
    this.cep = cep,
    this.number = number,
    this.complement = complement
}

function attClient(client) {
    let resClientContainer = document.getElementById('resClientContainer')
    resClientContainer.classList.add('menu')
    
    let resClient = document.getElementById('resClient')
    let item = document.createElement('li')
    item.innerHTML = `${client.nome}`
    resClient.appendChild(item)
}

function clearAll() {
    localStorage.clear()
    id = []
}