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
    }, 30); // Ajustez cette valeur pour ralentir ou accélérer le chargement
}

// Démarrer le chargement lorsque la page est prête
document.addEventListener('DOMContentLoaded', startLoading);
