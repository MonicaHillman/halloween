const accessToken = 'BQBApo5-zNKOzpAkmFFVV3CNJ-nqe4U6R6GN1lEFgxIAum9ZSvgNUergqDTYSQVcXXlYWmNeWlL5ELXft1mlsGmgDDho-PFkmibmGHLfKZVYuSPRh9g';

function criarMusica(capa, titulo, artista, duracao) {
    const li = document.createElement('li');
    li.className = 'musica';

    li.innerHTML = `
    <div class="musica__container">
      <img src="${capa}" alt="Capa da ${titulo}">
      <div class="informacoes">
        <h3>${titulo}</h3>
        <p>${artista}</p>
      </div>
    </div>
    <div class="musica__play">
      <p class="minutagem">${duracao}</p>
      <button class="play"><img src="./img/ion_play.png" alt="Tocar música"></button>
    </div>
  `;

    return li;
}

// Função para buscar informações de uma playlist no Spotify
async function getPlaylistInfo() {
    const response = await fetch('https://api.spotify.com/v1/playlists/37i9dQZF1DX8S9gwdi7dev/tracks?offset=0&limit=10', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if (response.ok) {
        const data = await response.json();
        return data.items.map(item => {
            const track = item.track;
            const capa = track.album.images[0].url;
            const titulo = track.name;
            const artista = track.artists.map(artist => artist.name).join(', ');
            const duracao = `${Math.floor(track.duration_ms / 60000)}:${((track.duration_ms % 60000) / 1000).toFixed(0).padStart(2, '0')}`;
            return criarMusica(capa, titulo, artista, duracao);
        });
    } else {
        console.error('Erro ao buscar informações da playlist no Spotify');
    }
}

async function carregarMusicas() {
    const listaDeMusicas = document.getElementById('lista-de-musicas');
    const musicas = await getPlaylistInfo();

    console.log(musicas);

    musicas.forEach(musica => {
        listaDeMusicas.appendChild(musica);
    });
}

carregarMusicas();
