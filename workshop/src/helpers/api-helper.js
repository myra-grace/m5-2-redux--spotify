const SPOTIFY_ROOT = 'https://api.spotify.com/v1';

export function fetchArtistProfile(token, id) {
    const options = {
        headers: { Authorization: `Bearer ${token}` },
    };
    const url = `https://api.spotify.com/v1/artists/${id}`;
    
    return fetch(url, options).then((response) => response.json());
}
//------------------------------------------------------------
function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      var error = 'Error';
      throw error;
    }
  }

export function fetchFromApi(token, endpoint) {
    const options = {
      headers: { Authorization: `Bearer ${token}` },
    };
  
    const url = SPOTIFY_ROOT + endpoint;
  
    return fetch(url, options)
      .then(checkStatus)
      .then(response => response.json());
}
//------------------------------------------------------------
export function fetchRelatedArtists(token, id) {
    return fetchFromApi(token, `/artists/${id}/related-artists`);
}