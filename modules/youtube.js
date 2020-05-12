const fetch = require('node-fetch');

class YouTube {
    constructor(key) {
        this.baseURL = 'https://www.googleapis.com/youtube/v3';
        this.key = key;
    }

    buildString(url, params) {
        const query = Object.keys(params).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`).join('&');
        return `${url}?${query}`;
    }

    async search(query) {
        query.key = this.key;
        const res = await (await fetch(this.buildString(`${this.baseURL}/search`, query))).json();
        return { body: res };
    }

    async playlist(query) {
        query.key = this.key;
        const res = await (await fetch(this.buildString(`${this.baseURL}/playlistItems`, query))).json();
        return { body: res };
    }
}

module.exports = YouTube;
