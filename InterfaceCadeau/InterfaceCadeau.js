// script.js

document.addEventListener("DOMContentLoaded", () => {
    const tailleSelect = document.getElementById("taille");
    const couleurInput = document.getElementById("couleur");
    const genererBtn = document.getElementById("genererPack");
    const aperçuDiv = document.getElementById("aperçu");

    genererBtn.addEventListener("click", () => {
        const taille = tailleSelect.value;
        const couleur = couleurInput.value;

        // Apply styles based on user choices
        aperçuDiv.style.backgroundColor = couleur;
        aperçuDiv.style.width = taille === "petit" ? "100px" : taille === "moyen" ? "150px" : "200px";
        aperçuDiv.style.height = taille === "petit" ? "100px" : taille === "moyen" ? "150px" : "200px";

        // Add animation class
        aperçuDiv.classList.add("active");

        // Remove animation class after animation ends
        setTimeout(() => {
            aperçuDiv.classList.remove("active");
        }, 500);
    });
 
});
const colorButtons = document.querySelectorAll('.color-btn');
const imageCadeau = document.getElementById('image-cadeau');

// Couleurs associées aux images
const imageColors = {
    rose: './assets/Cadeau2.webp',
    rouge: './assets/Cadeau2-rouge.webp',
    noir: './assets/Cadeau2-noir.webp',
    bleu: './assets/Cadeau2-blue.webp'
};

// Écoutez les clics sur chaque bouton
colorButtons.forEach(button => {
    button.addEventListener('click', () => {
        const color = button.getAttribute('data-color');
        imageCadeau.src = imageColors[color]; // Changez la source de l'image
    });
});
const sectionCadeaux = document.getElementById('pack');

document.addEventListener("DOMContentLoaded", function() {
    const ajouterAuPanierBtn = document.getElementById('AjouterauPanier');
    const sectionCadeaux = document.getElementById('cadeaux');
    const cartCount = document.getElementById('cart-count');
    let cartItems = 0; // Initialiser le compteur d'articles dans le panier

    // Lorsque le bouton "Ajouter au Panier" est cliqué
    ajouterAuPanierBtn.addEventListener('click', function() {
        cartItems++; // Incrémenter le compteur d'articles
        updateCartCount(); // Mettre à jour l'icône du panier
        
        // Ajouter une classe pour faire sortir la section de la position fixe
        sectionCadeaux.classList.add('fixed-off');
    });

    // Fonction pour mettre à jour le compteur du panier
    function updateCartCount() {
        // Afficher le compteur d'articles dans le panier
        if (cartItems > 0) {
            cartCount.style.display = 'inline-block';
            cartCount.textContent = cartItems;
        } else {
            cartCount.style.display = 'none';
        }
    }
});
document.addEventListener("DOMContentLoaded", function() {
    const ajouterAuPanierBtn = document.getElementById('AjouterauPanier');
    const tailleSelect = document.getElementById('taille');
    const colorBtns = document.querySelectorAll('.color-btn');
    const sectionCadeaux = document.getElementById('cadeaux');
    const cartCount = document.getElementById('cart-count');
    let cartItems = 0;

    // Vérifie si un choix a été fait et applique la classe "active" au bouton
    function checkIfSelected() {
        const tailleSelected = tailleSelect.value !== "";
        const colorSelected = Array.from(colorBtns).some(button => button.classList.contains('selected'));

        // Si un choix a été fait, rendre le bouton brillant
        if (tailleSelected && colorSelected) {
            ajouterAuPanierBtn.classList.add('active');
        } else {
            ajouterAuPanierBtn.classList.remove('active');
        }
    }

    // Lorsque l'utilisateur sélectionne une taille
    tailleSelect.addEventListener('change', checkIfSelected);

    // Lorsque l'utilisateur sélectionne une couleur
    colorBtns.forEach(button => {
        button.addEventListener('click', function() {
            button.classList.toggle('selected');
            checkIfSelected(); // Vérifier si la sélection est complète
        });
    });

    // Ajouter un produit au panier
    ajouterAuPanierBtn.addEventListener('click', function() {
        cartItems++; // Incrémenter le nombre d'articles
        updateCartCount(); // Mettre à jour l'icône du panier
        sectionCadeaux.classList.add('fixed-off'); // Arrêter de fixer la section
    });

    // Mettre à jour l'icône du panier
    function updateCartCount() {
        if (cartItems > 0) {
            cartCount.style.display = 'inline-block';
            cartCount.textContent = cartItems;
        } else {
            cartCount.style.display = 'none';
        }
    }
});
// Lorsque le bouton + est cliqué, afficher le champ de demande
document.getElementById('btn-plus').addEventListener('click', function() {
    const champDemande = document.getElementById('demande-champ');
    champDemande.classList.toggle('active'); // Afficher/masquer le champ
});