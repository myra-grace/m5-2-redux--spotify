import produce from 'immer';

const initialState = {
    status: 'loading',
    currentArtist: null,
    error: null,
};
  
  export default function artistReducer(state = initialState, action) {
    switch (action.type) {
      case 'REQUEST_ALL_ARTIST_INFO': {
        return {
          ...state,
          status: 'loading',
        };
      }

      case 'RECEIVE_ARTIST_PROFILE': {
        return produce(state, draftState => {
          if (!draftState.currentArtist) {
            draftState.currentArtist = {};
          }
  console.log("RECIEVE_ARTIST_PROFILE: ", action)
          draftState.currentArtist.id = action.profile.id;
          draftState.currentArtist.profile = action.profile;
        });
      }

      case 'RECEIVE_RELATED_ARTISTS': {
        return produce(state, draftState => {
          if (!draftState.currentArtist) {
            draftState.currentArtist = {};
          }
  
          draftState.currentArtist.relatedArtists = action.relatedArtists;
        });
      }

      case 'RECEIVED_ALL_ARTIST_INFO': {
        return {
          ...state,
          status: 'idle',
        };
      }

      case 'RECEIVE_ARTIST_ERROR': {
        return {
          ...state,
          status: 'error',
        };
      }

      default: {
        return state;
      }
    }
  }

export const getArtist = state => state.artists.currentArtist;
export const getArtistStatus = state => state.artists.status;