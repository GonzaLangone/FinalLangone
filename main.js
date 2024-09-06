const cards = document.querySelector('#cards');
const carrito = [];
const headermain = document.querySelector('#header');
const contenedorBuscador = document.querySelector('#contenedorSearch')
const contenedorCarrito = document.querySelector('#carrito')

if (localStorage.getItem('cantidad') == 'null'){
    carritoContador = 0;
}else{
    carritoContador = localStorage.getItem('cantidad')
}

function header() {
    headermain.style = 'display:flex; justify-content:space-around;padding-top:5px;align-items:center;'
    div = document.createElement('div')
    div.style = 'display:flex; align-items:center;width: 100%;justify-content:center;    flex-wrap: wrap;'
    headermain.innerHTML = `
    <h2 class='logo'>PokeGonza</h2>`
    div.innerHTML = `
    <div id='contenedorSearch'>
    <input type='text' id='buscador' placeholder='Buscar Pokegon'>
    </div>`
    let logo = document.querySelector('.logo')
    logo.addEventListener('click', () => {window.location.replace('index.html')})
    logo.addEventListener('click', () => {})
    let button = document.createElement('button')
    button.innerText = 'Buscar'
    button.className = 'botonBuscar'
    button.addEventListener('click', () => {
        buscar()
    })
    let pokeBolsa = document.createElement('img')
    pokeBolsa.src = 'pokebolsa.png'
    pokeBolsa.style = 'width:50px; margin-left:5%;'
    // pokeBolsa.addEventListener('click', () => {window.location.replace('carrito.html')})
    let cantidad = document.createElement('p')
    cantidad.id = 'cantidad'
    cantidad.innerHTML = '0'
    cantidad.style='position:relative; right:10px; top:-10px; background-color:black; border-radius:50%;height:25px;width:30px;text-align:center;color:white;'
    div.append(button)
    div.append(pokeBolsa)
    div.append(cantidad)
    headermain.append(div)
    cantidad.innerText = carritoContador

}
function listaCompras(elemento){
    div = document.createElement('div');
    nombre = elemento.name
    cantidad = elemento.cantidad
    div.innerHTML = `
     <h2>pokemon:${nombre} cantidad por pedir:${cantidad}</h2>`
    div.style = 'border-bottom:1px solid black;text-align: center;'
    contenedorCarrito.append(div)
}

function carritoCompras(){
    total = localStorage.getItem('productos')
    total = JSON.parse(total)
    total.forEach(elem => {
        listaCompras(elem)
    })
    button = document.createElement('button')
    button.innerText = 'Encargar!'
}   

function buscar(){
    setTimeout(async()=> {
        buscador = document.querySelector('#buscador');
        buscador = buscador.value
    
        const resp = await fetch("https://pokeapi.co/api/v2/pokemon")
        const data = await resp.json()
        datos = data.results
        if (datos.length > 0){
            subir = datos.filter(ele => ele.name.includes(buscador))
            subir.forEach(elemento => {
                crearCars(elemento)
            })
        }


    },1200)
    animacionCargando()
}

async function  leerApi(){
    let url = 'https://pokeapi.co/api/v2/pokemon/'
    const resp = await fetch(url)
    const data = await resp.json()
    const dato = data.results
    dato.forEach(element => {
        crearCars(element)

    });  
}
function animacionCargando(){
    cards.innerHTML =''
    let div = document.createElement('div')
    let image = document.createElement('img')
    image.src = 'pokebola.jpeg'
    image.className="imagePokebola"
    div.className="imagePokebola"
    div.append(image)
    cards.style = `
    height:700px;
    display:flex;
    justidy-content:center;
    align-items:center;`
    cards.append(div)
}

leerApi() 
header() 

function tostada(){
    Toastify({
        text: "Agregado",
        duration: 3000
        }).showToast()
}

function crearCars(data){
    cards.innerHTML = ''
    fetch(data.url)
    .then((resp) => resp.json())
    .then(resp => { 
        let imagen = resp.sprites.back_default
        let habilidad = resp.abilities[1]
        habilidad = habilidad.ability.name
        let card = document.createElement('div')
        card.className = `card ${data.name}`
        card.innerHTML = ` 
            <h1>${data.name}</h1>
            <img src="${imagen}" alt="foto" id='${data.name}'> 
            <p>HABILIDAD</p>
            <p>${habilidad}</p>

            `
        let button = document.createElement('button')
        button.className = 'boton-agregar'
        button.innerText = 'Comprar'
        button.addEventListener('click', () => {
           tostada()
           agregarProducto(data)


        })
        card.append(button)
        cards.append(card)
    })
}   

function agregarProducto(producto){
    if (carrito.some(pr => pr.name == producto.name)){
        let productoCarro =  carrito.find(pr => pr.name == producto.name)
        productoCarro.cantidad ++;
    }else{
        carrito.push({... producto, cantidad: 1})
    }
    carritoContador = carritoContador + 1;
    localStorage.setItem('cantidad', JSON.stringify(carritoContador)) 
    localStorage.setItem('productos', JSON.stringify(carrito)) 

    let cantidad = document.querySelector('#cantidad')
    cantidad.innerText = localStorage.getItem('cantidad')

}

