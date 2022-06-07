export const renderAnime = (data, anime) => {
    anime.textContent = '';
    data.forEach(element => {
        const name = element.russian;
        const imageSrc = 'https://shikimori.one' + element.image.original;
        const score = element.score;
        const id = element.id;

        const div = document.createElement('div');
        div.dataset.id = id;
        div.classList.add('anime-item');

        const image = document.createElement('img');
        image.src = imageSrc;

        const h2 = document.createElement('h2');
        h2.textContent = name;

        const p = document.createElement('p');
        p.textContent = score;

        const a = document.createElement('a');
        a.href = `page.html?id=${id}`;

        div.append(image, h2, p);
        a.append(div);
        anime.append(a);
    });
}

export const renderPage = (data) => {
    console.log(data)
    const titleDoc = document.createElement('title');
    titleDoc.textContent = data.russian;
    document.head.append(titleDoc);

    const name = data.russian ? data.russian : '';
    const image = data.image.original ? data.image.original : '';
    const type = data.kind ? data.kind : 'Неизвестно';
    const episodesAired = data.episodes_aired ? data.episodes_aired : 'Неизвестно';
    const episodes = data.episodes ? data.episodes : 'Неизвестно';
    const duration = data.duration ? data.duration : 'Неизвестно';
    const status = data.status ? data.status : 'Неизвестно';
    const score = data.score ? data.score : 'Неизвестно';
    const genres = data.genres ? data.genres : 'Неизвестно';
    const description = data.description_html ? data.description_html : 'Неизвестно';
    
    let screenOne = '';
    let screenTwo = '';

    for(let i = 0; i < data.screenshots.length; i++){
        switch(i){
            case 0:
                screenOne = data.screenshots[0].original;
                break;
            case 1:
                screenTwo = data.screenshots[1].original;
                break;
        }
    }

    let video = '';
    let poster = 'Видео пока не вышло';

    for(let i = 0; i < data.videos.length; i++){
        if (i == 0) {
            video = data.videos[0].player_url;
            poster = '';
        }
    }

    const section = document.createElement('section');
    section.classList.add('page');
    const container = document.createElement('div');
    container.classList.add('container', 'container__page');

    const title = document.createElement('h1');
    title.textContent = name;

    const pGenres = document.createElement('p');
    pGenres.textContent = '';
    genres.forEach(elem => {
        pGenres.append(elem.russian + ' ')
    });

    container.innerHTML = `
        <div class="left__content">
            <img src="https://shikimori.one${image}">
            <p>Рейтинг: <span class="value">${score}</span></p>
        </div>
        <div class="right__content">
            <p>Тип: <span class="value">${type}</span></p>
            <p>Эпизоды: <span class="value">${episodesAired}/${episodes}</span></p>
            <p>Длительность эпизода: <span class="value">${duration}</span></p>
            <p>Статус: <span class="value">${status}</span></p>
            <p>Жанры: <span class="value">${pGenres.textContent}</span></p>
        </div>
        <div class="description">
            <p>${description}</p>
        </div>
        <div class="image__content">
            <h2>Кадры</h2>
            <div class="image">
                <img class="image__kadr" src="https://shikimori.one${screenOne ? screenOne : '/assets/globals/missing_original.jpg'}">
                <img class="image__kadr" src="https://shikimori.one${screenTwo ? screenTwo : '/assets/globals/missing_original.jpg'}">
            </div>
        </div>
        <div class="video__content">
            <h2>Видео</h2>
            <div class="video">
                <p>${poster}</p>
                <iframe width="560" height="315" src="${video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </div>
    `;
    
    section.append(container);
    document.body.append(title, section);
}

export const showError = (elem) => {
    elem.style.border = '1px solid red';
    setTimeout(() => {
        elem.style.border = '1px solid #000';
    }, 2000)
};

