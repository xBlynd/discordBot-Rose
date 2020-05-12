class Playlists {
    constructor() {
        this.playlists = {};
        this.info = {};
        this.lastID = {};
    }

    shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    add(guild, queue) {
        try {
            let status = false;

            if (!this.playlists[guild]) {
                this.playlists[guild] = [];
                status = true;
            }

            this.playlists[guild].push(queue);

            return status;
        } catch (error) {
            throw error;
        }
    }

    next(guild) {
        if (!this.playlists[guild]) { return; }

        let temp = this.playlists[guild].splice(0, 1);
        this.lastID[guild] = temp[0].id.videoId;

        if (this.playlists[guild].length === 0) { delete this.playlists[guild]; }

        return temp;
    }

    list(guild) {
        try {
            return this.playlists[guild];
        } catch (error) {
            throw error;
        }
    }

    shufflePlaylist(guild) {
        this.playlists[guild] = this.shuffle(this.playlists[guild]);
    }

    end(guild) {
        delete this.playlists[guild];
        delete this.lastID[guild];
        this.info[guild].autoplay = false;

        return true;
    }
}

module.exports = new Playlists();
