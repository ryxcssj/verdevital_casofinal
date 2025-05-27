// File: assets/js/script.js
const productos = [
  { id:1, nombre: "Té Verde Detox", descripcion: "Infusión antioxidante...", precio: 4990, stock: 12, categoria: "Infusiones", imagen: "https://placehold.co/300x200?text=Te+Verde"},
  { id:2, nombre: "Maca Andina", descripcion: "Suplemento energizante...", precio: 7500, stock: 8, categoria: "Suplementos", imagen: "https://placehold.co/300x200?text=Maca+Andina" },
  { id:3, nombre: "Mix Semillas", descripcion: "Snacks saludables...", precio: 3200, stock: 20, categoria: "Snacks", imagen: "https://placehold.co/300x200?text=Mix+Semillas"}
];
let carrito = [];
let usuario = null;

window.onload = () => {
  renderizarCategorias();
  renderizarProductos();
  document.getElementById('btnLogin').onclick = () => abrirModal('modalLogin');
  document.getElementById('btnCheckout').onclick = () => abrirModal('modalCheckout');
  document.getElementById('formLogin').onsubmit = handleLogin;
  document.getElementById('formNewsletter').onsubmit = handleNewsletter;
  document.getElementById('formCheckout').onsubmit = handleCheckout;
  document.querySelector('.cart').onclick = () => {
  actualizarResumen();
  abrirModal('modalCarrito');
};

};

function renderizarCategorias() {
  const container = document.querySelector('.categoria-list'); container.innerHTML = '';
  const categorias = ['Todas', ...new Set(productos.map(p => p.categoria))];
  categorias.forEach(cat => {
    const btn = document.createElement('button'); btn.innerText = cat;
    btn.onclick = () => { document.querySelectorAll('.categoria-list button').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); renderizarProductos(cat); };
    if (cat==='Todas') btn.classList.add('active'); container.appendChild(btn);
  });
}

function renderizarProductos(filtroCat='Todas') {
  const grid=document.getElementById('productos'); grid.innerHTML='';
  productos.filter(p=> filtroCat==='Todas' || p.categoria===filtroCat)
           .forEach(p=>{
    const card=document.createElement('div'); card.className='producto-card';
    card.innerHTML = `<img src="${p.imagen}" alt="${p.nombre}"><h3>${p.nombre}</h3><p class='precio'>$${p.precio.toLocaleString()}</p><button onclick='verProducto(${p.id})'>Ver más</button>`;
    grid.appendChild(card);
  });
}

function verProducto(id) {
  const p=productos.find(x=>x.id===id);
  document.getElementById('modalTitulo').innerText=p.nombre;
  document.getElementById('modalDescripcion').innerText=p.descripcion;
  document.getElementById('modalPrecio').innerText=`$${p.precio.toLocaleString()}`;
  document.getElementById('modalStock').innerText=p.stock;
  abrirModal('modalProducto');
}

function abrirModal(id){document.getElementById(id).style.display='flex';}
function cerrarModal(id){document.getElementById(id).style.display='none';}

function filtrarProductos(){
  const texto=document.getElementById('buscador').value.toLowerCase();
  document.querySelectorAll('.producto-card').forEach((card,i)=>{
    const nombre=productos[i].nombre.toLowerCase();
    card.style.display= nombre.includes(texto)?'flex':'none';
  });
}

function ordenarProductos(){
  const orden=document.getElementById('orden').value;
  let lista=[...productos];
  if(orden==='precio-asc') lista.sort((a,b)=>a.precio-b.precio);
  if(orden==='precio-desc') lista.sort((a,b)=>b.precio-a.precio);
  if(orden==='nombre-asc') lista.sort((a,b)=>a.nombre.localeCompare(b.nombre));
  if(orden==='nombre-desc') lista.sort((a,b)=>b.nombre.localeCompare(a.nombre));
  renderizarProductos(document.querySelector('.categoria-list button.active').innerText);
}

function agregarAlCarrito(){
  const nombre = document.getElementById('modalTitulo').innerText;
  const precio = parseInt(document.getElementById('modalPrecio').innerText.replace(/[$.]/g, ''));
  carrito.push({nombre, precio});
  document.getElementById('carritoCount').innerText = carrito.length;
  actualizarResumen();  // << Esto es importante
  cerrarModal('modalProducto');
}


function actualizarResumen(){
  const lista=document.getElementById('listaCarrito'); lista.innerHTML=''; let total=0;
  carrito.forEach(item=>{lista.innerHTML+=`<p>${item.nombre} - $${item.precio.toLocaleString()}</p>`; total+=item.precio;});
  document.getElementById('totalCarrito').innerText=`$${total.toLocaleString()}`;
}

function scrollToSection(id){document.getElementById(id).scrollIntoView({behavior:'smooth'});}

function anularCompra(){carrito=[]; actualizarResumen(); cerrarModal('modalCheckout'); alert('Compra anulada');}

function handleLogin(e){ e.preventDefault(); usuario=e.target[0].value; document.getElementById('btnLogin').innerText=`Hola, ${usuario}`; cerrarModal('modalLogin'); }
function handleNewsletter(e){ e.preventDefault(); alert('¡Gracias por suscribirte!'); }
function handleCheckout(e){ e.preventDefault(); alert('Pedido enviado con éxito'); carrito=[]; actualizarResumen(); cerrarModal('modalCheckout'); }
