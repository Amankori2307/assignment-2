var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const BASE_URL = "https://rickandmortyapi.com/api";
const getEpisodes = (page) => {
    return fetch(`${BASE_URL}/episode?page=${page}`)
        .then(res => res.json())
        .then((res) => {
        let episodes = res.results;
        episodes.forEach((episode) => __awaiter(this, void 0, void 0, function* () {
            if (!episode.characters || episode.characters.length === 0)
                return;
            episode.characters = yield getCharachters(episode.characters);
        }));
        return episodes;
    });
};
const getCharachter = (url) => {
    return fetch(url)
        .then(res => res.json())
        .then(res => {
        return res;
    });
};
const getCharachters = (characterUrls) => {
    return new Promise((resolve, reject) => {
        try {
            let characters = [];
            characterUrls.forEach((characterUrl) => __awaiter(this, void 0, void 0, function* () {
                let character = yield getCharachter(characterUrl);
                characters.push(character);
            }));
            resolve(characters);
        }
        catch (err) {
            reject(err);
        }
    });
};
const onClick = () => __awaiter(this, void 0, void 0, function* () {
    try {
        let episodes = yield getEpisodes(1);
        document.getElementById("data").innerText = JSON.stringify(episodes);
        console.log(episodes);
    }
    catch (err) {
        alert(err);
    }
});
