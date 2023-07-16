const data = 'dbHeroes.json'
const cards = document.querySelector('.cards');
const moviesSelect = document.getElementById('movies-select');

const getData = async url => {
  return fetch(url)
    .then(response => response.json())
    .catch(error => console.log(error))
}

const renderCard = (hero) => {
  let card = document.createElement('div');
  card.classList.add('card');

  card.innerHTML =
    `<div class="card__top">
    <a href="#" class="card__image">
      <img
        src="${hero.photo}"
        alt="${hero.name}"
      />
    </a>

  </div>

  <div class="card__bottom">
    <a href="#" class="card__title">
      ${hero.name}
    </a>

    <div class="card__descriptions">
      <div class="card__description card__price--actor">Актер: <span>${hero.actors}</span></div>
      <div class="card__description card__price--movies">Фильмы: <span>${hero.movies}</span></div>
      <div class="card__description card__price--status">Статус: <span>${hero.status}</span></div>
    </div>

    
  </div>`;

  return card
}

const renderSelect = (data) => {
  let movies = [];

  for (let movie of data) {
    if (movie.movies) {
      for (let i = 0; i < movie.movies.length; i++) {
        movies.push(movie.movies[i])
      }
    }
  }

  [... new Set(movies)].forEach(item => {
    let select = document.createElement('option');
    select.value = item;
    select.innerHTML = item;
    moviesSelect.append(select)
  });
}

const render = (data, filter) => {
  let newData = data;

  if (filter) {
    newData = {};
    data.find((item, i) => {
      if (item.movies && item.movies.includes(filter))
        newData[i] = item
    })
  }

  cards.innerHTML = '';


  for (let hero in newData) {
    cards.append(renderCard(newData[hero]))
  }
}

getData(data).then(data => {
  render(data);
  renderSelect(data);
})


moviesSelect.addEventListener('change', (e) => {
  getData(data).then(data => {
    render(data, e.target.value);
  })
})
