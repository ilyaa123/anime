export const getData = async (page = 1, order = 'popularity') => {
    const response = await fetch(`https://shikimori.one/api/animes?limit=10&page=${page}&order=${order}`, {
        headers: {
            'User-Agent': 'SiteAnimeforJs',
        }
    });
    const data = await response.json();
    return data
};

export const searchData = async (search) => {
    const response = await fetch(`https://shikimori.one/api/animes?search=${search}&limit=10`, {
        headers: {
            'User-Agent': 'SiteAnimeforJs',
        }
    });
    const data = await response.json();
    return data
};

export const filterData = async (url) => {
    const response = await fetch(url, {
        headers: {
            'User-Agent': 'SiteAnimeforJs',
        }
    });
    const data = await response.json();
    return data
};

export const idData = async (id) => {
    const url = `https://shikimori.one/api/animes/${id}`;
    const response = await fetch(url, {
        headers: {
            'User-Agent': 'SiteAnimeforJs',
        }
    });
    const data = await response.json();
    return data
};