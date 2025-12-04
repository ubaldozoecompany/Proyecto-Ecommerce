const nav = document.querySelector('#nav1');
const abrir = document.querySelector('#open');
const cerrar = document.querySelector('#closed');
const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');
const productsList = document.querySelector('.container-items');
const valorTotal = document.querySelector('.total-pagar');
const countProducts = document.querySelector('#contador-productos');
const headCart = document.querySelector('.header-carrito');
const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');
const pagar = document.querySelector('.button-pagar');
const quantityControl = document.querySelector('.info-cart-product');
const quantityDisplay = document.querySelector('.cantidad-producto-carrito');
// Variable de arreglos de Productos
let allProducts = [];

//FUNCION PARA MOSTRAR MENU HAMBURGUESA
abrir.addEventListener("click", () => {
    nav.classList.add("visible");
})
cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
}) 
//FUNCION PARA MOSTRAR CARRITO 
const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector(
	'.container-cart-products'
);
btnCart.addEventListener('click', () => {
	containerCartProducts.classList.toggle('hidden-cart');
});
//FUNCION PARA AGREGAR AL CARRITO 
productsList.addEventListener('click', e => {
	if (e.target.classList.contains('btn-add-cart')) {
		const product = e.target.closest('.item');

		const infoProduct = {
			image: product.querySelector('.imgProducto').src,
			quantity: 1,
			title: product.querySelector('h2').textContent,
			price: product.querySelector('p').textContent,
		};

		const exists = allProducts.some(p => p.title === infoProduct.title);

		if (exists) {
			allProducts = allProducts.map(p => {
				if (p.title === infoProduct.title) {
					p.quantity++;
				}
				return p;
			});
		} else {
			allProducts = [...allProducts, infoProduct];
		}

		showHTML();
	}
});
//FUNCION PARA AGREGAR AL CARRITO CON BOTONES Y ELIMINAR 
//FUNCION PARA BAJAR CANTIDAR DE PRODUCTO
rowProduct.addEventListener('click', e => {
	if (e.target.classList.contains('quantity-btn-minus')) {
		const title = e.target.closest('.info-cart-product')
			.querySelector('.titulo-producto-carrito').textContent;
		allProducts = allProducts.map(p => {
			if (p.title === title && p.quantity > 1) {
				p.quantity--;
			}
			return p;
		});
		showHTML();
	}
//FUNCION PARA AUMENTAR CANTIDAR DE PRODUCTO
	if (e.target.classList.contains('quantity-btn-plus')) {
		const title = e.target.closest('.info-cart-product')
			.querySelector('.titulo-producto-carrito').textContent;
		allProducts = allProducts.map(p => {
			if (p.title === title) {
				p.quantity++;
			}
			return p;
		});
		showHTML();
	}
//FUNCION PARA ELIMINAR DEL CARRITO 
	if (e.target.classList.contains('icon-close')) {
		const title = e.target.closest('.info-cart-product')
			.querySelector('.titulo-producto-carrito').textContent;
		allProducts = allProducts.filter(p => p.title !== title);
		showHTML();
	}
});

// FUNCION PARA MOSTRAR HTML
const showHTML = () => {
	if (!allProducts.length) {
		headCart.classList.add('hidden');
		cartEmpty.classList.remove('hidden');
		rowProduct.classList.add('hidden');
		cartTotal.classList.add('hidden');
		pagar.classList.add('hidden');
	} else {
		headCart.classList.remove('hidden');
		cartEmpty.classList.add('hidden');
		rowProduct.classList.remove('hidden');
		cartTotal.classList.remove('hidden');
		pagar.classList.remove('hidden');
	}
	// Limpiar HTML
	rowProduct.innerHTML = '';
	let total = 0;
	let totalOfProducts = 0;

	allProducts.forEach(product => {
		const containerProduct = document.createElement('div');
		containerProduct.classList.add('cart-product');

		containerProduct.innerHTML =
			`
			<div class="info-cart-product">
				<img src="${product.image}" class="imgProducto">
				<div class="carrito-item-detalles">
					<p class="titulo-producto-carrito">${product.title}</p>
					<div class="selector-cantidad">
						<button class="quantity-btn-minus" data-action="minus">-</button>
						<input type="text" value="${product.quantity}" class="cantidad-producto-carrito" disabled>
						<button class="quantity-btn-plus" data-action="plus">+</button>
					</div>
					<span class="precio-producto-carrito">${product.price}</span>
				</div>
				<img src="img/icons/eliminar.png" class="icon-close" alt="iconClose">
			</div>
        `;
		rowProduct.append(containerProduct);

		total += product.quantity * parseFloat(product.price.replace('$', ''));
		totalOfProducts += product.quantity;
	});
	valorTotal.innerText = `$${total}`;
	countProducts.innerText = totalOfProducts;
};

//FUNCION DAR CLICK EN PAGAR 
document.getElementsByClassName('btn-pagar')[0].addEventListener('click',pagarClicked)
function pagarClicked(){
    alert("Gracias por la compra");
	
};