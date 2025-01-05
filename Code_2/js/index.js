// Fonction de chargement initial
function startLoading() {
    const loadingText = document.getElementById('loading-text');
    const loadingContainer = document.getElementById('loading-container');
    const mainContent = document.getElementById('main-content');
    
    let progress = 0;

    const loadingInterval = setInterval(() => {
        if (progress >= 100) {
            clearInterval(loadingInterval);
            loadingContainer.style.display = 'none';
            mainContent.style.display = 'flex';
        } else {
            progress++;
            loadingText.textContent = `Chargement... ${progress}%`;
        }
    }, 30);
}

// Fonction pour gérer le défilement fluide
function initSmoothScroll() {
    // Sélectionner tous les boutons de navigation
    const navButtons = {
        'nouveaux_produits': document.querySelector('a[href="nouveaux_produits.html"]'),
        'promotion': document.querySelector('a[href="promotion.html"]'),
        'gifts': document.querySelector('a[href="gifts.html"]'),
        'collection': document.querySelector('a[href="collection.html"]')
    };

    // Sélectionner toutes les sections correspondantes
    const sections = {
        'nouveaux_produits': document.querySelector('.nouveaux-produits'),
        'promotion': document.querySelector('.promotions'),
        'gifts': document.querySelector('.gifts'),
        'collection': document.querySelector('.collection')
    };

    // Ajouter les événements de clic pour chaque bouton
    Object.keys(navButtons).forEach(key => {
        if (navButtons[key] && sections[key]) {
            navButtons[key].addEventListener('click', function(e) {
                e.preventDefault(); // Empêcher le comportement par défaut du lien
                
                sections[key].scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        }
    });
}

// Gestion des erreurs
window.addEventListener('error', function(e) {
    const loadingContainer = document.getElementById('loading-container');
    const mainContent = document.getElementById('main-content');
    
    loadingContainer.style.display = 'none';
    mainContent.style.display = 'flex';
});

// Fonction pour initialiser le panier
function initCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount(cart.length);
    displayCartItems(cart);
}

// Fonction pour ajouter un produit au panier
window.addToCart = function(productName, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Vérifier si le produit existe déjà dans le panier
    let productIndex = cart.findIndex(item => item.name === productName);
    if (productIndex !== -1) {
        // Si le produit existe, augmenter la quantité
        cart[productIndex].quantity += 1;
    } else {
        // Sinon, ajouter le produit au panier
        cart.push({ name: productName, price: price, quantity: 1 });
    }

    // Mettre à jour le localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Mettre à jour l'affichage du panier
    updateCartCount(cart.length);
    displayCartItems(cart);
}

// Fonction pour mettre à jour le nombre d'articles dans le panier
function updateCartCount(count) {
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = count;
    }
}

// Fonction pour afficher les articles du panier dans le dropdown
function displayCartItems(cart) {
    const cartItemsElement = document.querySelector('.cart-items');
    if (cartItemsElement) {
        cartItemsElement.innerHTML = '';

        if (cart.length === 0) {
            cartItemsElement.innerHTML = '<div class="empty-cart">Votre panier est vide</div>';
        } else {
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <span>${item.name} (x${item.quantity})</span>
                    <span>${item.price} €</span>
                    <button onclick="removeFromCart('${item.name}')">×</button>
                `;
                cartItemsElement.appendChild(cartItem);
            });

            // Mettre à jour le total du panier
            updateCartTotal(cart);
        }
    }
}

// Fonction pour supprimer un produit du panier
window.removeFromCart = function(productName) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Filtrer le panier pour retirer le produit
    cart = cart.filter(item => item.name !== productName);

    // Mettre à jour le localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Mettre à jour l'affichage du panier
    updateCartCount(cart.length);
    displayCartItems(cart);
}

// Fonction pour mettre à jour le total du panier
function updateCartTotal(cart) {
    const cartTotalElement = document.querySelector('.cart-total span:last-child');
    if (cartTotalElement) {
        let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotalElement.textContent = total.toFixed(2) + ' €';
    }
}

// Fonction pour le carrousel
function initCarrousel() {
    const carrouselContainer = document.querySelector('.carrousel-container');
    const slides = document.querySelectorAll('.carrousel-slide');
    const totalSlides = slides.length;
    let currentIndex = 0;

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarrousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarrousel();
    }

    function updateCarrousel() {
        const offset = -currentIndex * 100;
        carrouselContainer.style.transform = `translateX(${offset}%)`;
    }

    document.querySelector('.carrousel-nav.next').addEventListener('click', nextSlide);
    document.querySelector('.carrousel-nav.prev').addEventListener('click', prevSlide);

    setInterval(nextSlide, 5000); // Change de slide toutes les 5 secondes
}

// Initialiser tout lorsque la page est chargée
document.addEventListener('DOMContentLoaded', () => {
    startLoading();
    initSmoothScroll();
    initCart();
    initCarrousel();
});