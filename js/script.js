import {getData, searchData, filterData} from "../modules/data.js";
import {renderAnime, showError} from "../modules/function.js";

const anime = document.querySelector('.anime-container');
const left = document.querySelector('.left');
const right = document.querySelector('.right');
const search = document.querySelector('.anime-search');
const filter = document.querySelector('.filter-svg');
const filterPop = document.querySelector('.filter__pop-overlay');
const filterForm = document.querySelector('.filter__form');
const pageH = document.querySelector('.page');
const animeTitle = document.querySelectorAll('.anime-title h3');

let page = 1
let order = 'popularity';

left.addEventListener('click', () => {
    if (page > 1){
        init(--page, order);
        pageH.textContent = page
    }
})

right.addEventListener('click', () => {
    init(++page, order);
    pageH.textContent = page
});

search.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = document.querySelector('.input').value;
    if (value != ''){
        initSearch(value)
    } else {
        showError(document.querySelector('.input'))
    }
});

filterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const radio = document.querySelectorAll('input[type="radio"]:checked');
    let url = 'https://shikimori.one/api/animes?limit=100&';
    radio.forEach(elem => {
        const elemName = elem.name;
        const elemValue = elem.value;
        url = url + `${elemName}=${elemValue}&`;
        
    });
    initFilter(url.substring(0, url.length - 1));
    filterPop.style.display = 'none';
    document.body.style.overflowY = '';
});

filter.addEventListener('click', () => {
    filterPop.style.display = 'flex';
    document.body.style.overflowY = 'hidden';
    
    filterPop.addEventListener('click', (event) => {
        if (event.target == filterPop){
            filterPop.style.display = 'none';
            document.body.style.overflowY = '';
        }
    });
})

animeTitle.forEach((elem) => {
    elem.addEventListener('click', () => {
        animeTitle.forEach(element => {
            element.classList.remove('checked');
        });
        elem.classList.add('checked');
        order = elem.dataset.order;
        init(page, order);
    })
});

const initFilter = async (url) => {
    const data = await filterData(url);
    renderAnime(data, anime);
}

const initSearch = async (value) => {
    const data = await searchData(value);
    renderAnime(data, anime);
};

const init = async (page, order) => {
    const data = await getData(page, order);
    
    renderAnime(data, anime);
};

init(page, order)