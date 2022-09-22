const BASE_URL: string = "https://rickandmortyapi.com/api"

interface Location {
    name: string
    url: string
}

interface Origin {
    name: string
    url: string
}

interface Character {
    id: number
    name: string
    status: string
    species: string
    type: string
    gender: string
    origin: Origin
    location: Location
    image: string
    episode: string[]
    url: string
    created: string
}

interface Episode {
    id: number
    name: string
    air_date: string
    episode: string
    characters: string[] | Character[]
    url: string
    created: string
}

interface EpisodeAPIResponse {
    results: Episode[]
}


const getEpisodes = (page: Number): Promise<Episode[]> => {
    return fetch(`${BASE_URL}/episode?page=${page}`)
        .then(res => res.json())
        .then((res: EpisodeAPIResponse) => {
            let episodes = res.results as Episode[]
            episodes.forEach(async (episode) => {
                if (!episode.characters || episode.characters.length === 0) return;
                episode.characters = await getCharachters(episode.characters as string[])
            })
            return episodes
        })
}



const getCharachter = (url: string): Promise<Character> => {
    return fetch(url)
        .then(res => res.json())
        .then(res => {
            return res as Character
        })
}

const getCharachters = (characterUrls: string[]): Promise<Character[]> => {
    return new Promise((resolve, reject) => {
        try {
            let characters: Character[] = []
            characterUrls.forEach(async (characterUrl: string) => {
                let character: Character = await getCharachter(characterUrl);
                characters.push(character)
            })
            resolve(characters)
        } catch (err) {
            reject(err)
        }
    })
}



const onClick = async (): Promise<void> => {
    try {
        let episodes = await getEpisodes(1)
        document.getElementById("data").innerText = JSON.stringify(episodes)
        console.log(episodes)

    } catch (err) {
        alert(err)
    }

}