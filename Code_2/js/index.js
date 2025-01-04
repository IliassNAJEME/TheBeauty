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

// Initialiser tout lorsque la page est chargée
document.addEventListener('DOMContentLoaded', () => {
    startLoading();
    initSmoothScroll();
});

// Fonctionnalités du panier
document.addEventListener('DOMContentLoaded', function() {
    let cartCount = 0;
    const cartCountElement = document.querySelector('.cart-count');
    
    // Fonction pour ajouter un produit au panier
    window.addToCart = function(productName, price) {
        cartCount++;
        cartCountElement.textContent = cartCount;
        
        // Retirer le message "panier vide"
        const emptyCart = document.querySelector('.empty-cart');
        if (emptyCart) {
            emptyCart.remove();
        }
        
        // Créer l'élément du produit
        const cartItems = document.querySelector('.cart-items');
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <span>${productName}</span>
            <span>${price} €</span>
            <button onclick="removeFromCart(this)">×</button>
        `;
        
        cartItems.appendChild(cartItem);
        updateCartTotal();
    }
    
    // Fonction pour supprimer un produit du panier
    window.removeFromCart = function(button) {
        button.parentElement.remove();
        cartCount--;
        cartCountElement.textContent = cartCount;
        
        if (cartCount === 0) {
            const cartItems = document.querySelector('.cart-items');
            cartItems.innerHTML = '<div class="empty-cart">Votre panier est vide</div>';
        }
        
        updateCartTotal();
    }
    
    // Fonction pour mettre à jour le total du panier
    function updateCartTotal() {
        const items = document.querySelectorAll('.cart-item');
        let total = 0;
        
        items.forEach(item => {
            const priceText = item.querySelector('span:nth-child(2)').textContent;
            const price = parseFloat(priceText);
            total += price;
        });
        
        document.querySelector('.cart-total span:last-child').textContent = total.toFixed(2) + ' €';
    }
});

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

// Initialiser le carrousel au chargement de la page
document.addEventListener('DOMContentLoaded', initCarrousel);