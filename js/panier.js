// Récupérer les produits du panier depuis localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Afficher les produits dans le panier
function displayCartItems() {
    const cartItemsElement = document.querySelector('.cart-items');
    const totalPriceElement = document.getElementById('total-price');

    if (cart.length === 0) {
        cartItemsElement.innerHTML = '<div class="empty-cart">Votre panier est vide</div>';
        totalPriceElement.textContent = '0.00 €';
    } else {
        cartItemsElement.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <span>${item.name} (x${item.quantity})</span>
                <span>${item.price * item.quantity} €</span>
                <button onclick="removeFromCart('${item.name}')"></button>
            `;
            cartItemsElement.appendChild(cartItem);

            total += item.price * item.quantity;
        });

        totalPriceElement.textContent = total.toFixed(2) + ' €';
    }
}

// Gérer la soumission du formulaire
document.getElementById('checkout-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Récupérer les données du formulaire
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    // Ajouter les produits du panier aux données
    data.cart = cart;

    // Envoyer les données (simulation)
    console.log('Données envoyées :', data);

    // Réinitialiser le panier
    localStorage.removeItem('cart');
    alert('Commande passée avec succès !');
    window.location.href = 'index.html'; // Rediriger vers la page d'accueil
});

// Afficher les produits au chargement de la page
document.addEventListener('DOMContentLoaded', displayCartItems);