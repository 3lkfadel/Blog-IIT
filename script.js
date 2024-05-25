document.addEventListener('DOMContentLoaded', function () {
    let articles = [];
    let tags = new Set();
    let articlesDisplayed = 6; // Number of articles to display initially
    let articlesIncrement = 6; // Number of articles to add each time "Voir plus" is clicked

    fetch('articles.json')
        .then(response => response.json())
        .then(data => {
            articles = data;
            articles.forEach(article => {
                article.tags.forEach(tag => tags.add(tag));
            });
            displayTags();
            displayArticles(articles.slice(0, articlesDisplayed));
        })
        .catch(error => console.error('Erreur lors du chargement des articles:', error));

    function displayTags() {
        const tagsContainer = document.getElementById('tags');
        tags.forEach(tag => {
            const button = document.createElement('button');
            button.textContent = tag;
            button.addEventListener('click', () => {
                const filteredArticles = articles.filter(article => article.tags.includes(tag));
                articlesDisplayed = articlesIncrement;
                displayArticles(filteredArticles.slice(0, articlesDisplayed));
            });
            tagsContainer.appendChild(button);
        });

        const allButton = document.getElementById('all-button');
        allButton.addEventListener('click', () => displayArticles(articles.slice(0, articlesDisplayed)));

        const toggleTags = document.getElementById('toggle-tags');
        toggleTags.addEventListener('click', () => {
            if (tagsContainer.style.display === 'none' || !tagsContainer.style.display) {
                tagsContainer.style.display = 'flex';
                toggleTags.textContent = '▲';
            } else {
                tagsContainer.style.display = 'none';
                toggleTags.textContent = '▼';
            }
        });
    }

    function displayArticles(articlesToDisplay) {
        const container = document.getElementById('articles-container');
        container.innerHTML = '';
        articlesToDisplay.forEach(article => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${article.image}" alt="${article.title}">
                <h3>${article.title}</h3>
            `;
            card.addEventListener('click', () => {
                window.location.href = `article.html?id=${article.id}`;
            });
            container.appendChild(card);
        });

        const voirPlusButton = document.getElementById('voir-plus');
        if (articlesToDisplay.length >= articles.length) {
            voirPlusButton.style.display = 'none'; // Hide button if no more articles to display
        } else {
            voirPlusButton.style.display = 'block'; // Show button if more articles to display
        }
    }

    const voirPlusButton = document.getElementById('voir-plus');
    voirPlusButton.addEventListener('click', () => {
        articlesDisplayed += articlesIncrement;
        displayArticles(articles.slice(0, articlesDisplayed));
    });
});
