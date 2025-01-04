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