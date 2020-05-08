import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch} from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchArtistProfile, fetchRelatedArtists, } from '../helpers/api-helper';

import { RelatedArtists } from './RelatedArtists';
import { Genres } from './Genres';

import { getArtist, getArtistStatus } from '../reducers/artists-reducer';
import { getAccessToken } from '../reducers/auth-reducer';
import { requestAllArtistInfo, 
    receiveArtistProfile,
    receiveRelatedArtists,
    receivedAllArtistInfo,
    receiveArtistError } from '../actions';
//-------------------------------- *** --------------------------------

const ArtistRoute = () => {
    const artist = useSelector(getArtist);
    // const artist = useSelector(state => state.currentArtist);
    const artistStatus = useSelector(getArtistStatus);
    
    spotifyData();

    if (artistStatus === 'loading') {
        return  <div>Loading</div>;
    }
    
    if (!artist || artistStatus === 'error') {
        // SOmething's gone wrong!
        return 'Error';
    }
    

    console.log("ARTIST: ", artist)

    return (
        <Wrapper>
            <Container>
                <img src={artist.profile.images[2].url} />
                <h1>{artist.profile.name}</h1>
                <h2 style={{color: '#FF4FD8'}}>{artist.profile.followers.total} <span style={{color: 'white'}}>Followers</span></h2>

                <Genres genres={artist.profile.genres}/>
            
            <RelatedArtists artists={artist.relatedArtists}/>
            </Container>
        </Wrapper>
    )
};

const spotifyData = () => {
    const { id } = useParams();
    console.log('artistId: ', id);
    const dispatch = useDispatch();
    const accessToken = useSelector(getAccessToken);

    React.useEffect(() => {
        if (!accessToken) {
            console.log('Error'); 
        }
        dispatch(requestAllArtistInfo());

        const artistProfilePromise = fetchArtistProfile(accessToken, id).then(
            json => {
                dispatch(receiveArtistProfile(json));
            }
        );

        const relatedArtistPromise = fetchRelatedArtists(
            accessToken, id
        ).then(json => {
            dispatch(receiveRelatedArtists(json));
        });

        Promise.all([artistProfilePromise, relatedArtistPromise])
            .then(() => dispatch(receivedAllArtistInfo()))
            .catch(err => {
                dispatch(receiveArtistError(err));
            });
    }, [accessToken, id])
}
//-------------------------------- STYLING --------------------------------

const Wrapper = styled.div`
    text-align: center;
    margin: auto;
    width: 100vw;
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const Container = styled.div`
    text-align: center;
`;

const RelatedArtistsContainer = styled.div`
background-color: blue;
    text-align: center;
    margin: 5px;
`;

const RelatedArtistsImages = styled.div`
background-color: green;
    text-align: center;
    margin: 0;
`;

export default ArtistRoute;