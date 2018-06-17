const form = document.getElementById('search-form');
const searchField = document.getElementById('search-keyword');
const responseContainer = document.getElementById('response-container');
  let searchedForText;

form.addEventListener('submit',(e) => {
  // preventDefault previene el comportamiento por default de submit
  e.preventDefault();
  responseContainer,innerHTML = '';
  searchedForText = searchField.value;
  getNews();
});

const getNews = () => {
  const articleRequest = new XMLHttpRequest();
  articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q-${searchedForText}&api-key=843769acdc02467abf2aa6ed97f7fba9`);
  articleRequest.onerror = handleError;
  articleRequest.onload = addNews;
  articleRequest.send();
}

const handleError = () => {
  console.log('Se ha presentado un error');
}

function addNews() {
  const data = JSON.parse(this.responseText);
  const article = data.response.docs[0];
  const title = article.headline.main;
  const snippet = article.snippet;

  let li = document.createElement('li');
  li.className = 'articleClass';
  li.innerText = snippet;

  responseContainer.appendChild(li);
}

