import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const RelatedArtist = ({ id, name, image }) => {
    return (
        <StyledList>
            <StyledLink exact to={`/artists/${id}`} onClick={(event) => {console.log(id)}}>
                <Avatar src={image}/>
                <p>{name}</p>
            </StyledLink>
        </StyledList>
    )
}

export const RelatedArtists = ({artists}) => {
    console.log('artists: ', artists);
    return (
        <Wrapper>
          <p>Related Artists</p>
            <RelatedArtistsContainer>
                {artists.map((artist) => (
                    <RelatedArtist
                        key={artist.id}
                        id={artist.id}
                        name={artist.name}
                        image={artist.images[2].url}
                    />
                ))}
            </RelatedArtistsContainer>
        </Wrapper>
    )
};

//-------------------------------- STYLING --------------------------------

const StyledList = styled.li`
    display: flex;
    flex-direction: column;
    margin: 15px;
`;

const StyledLink = styled(NavLink)`
    text-decoration: none;
`;

const Avatar = styled.img`
    border-radius: 50%;
    width: 80px;
    height: 80px;
    object-fit: cover;
`;

const Wrapper = styled.div`
    display: block;
    align-items: center;
    justify-content: center;
`;

const RelatedArtistsContainer = styled.ul`
    width: 100vw;
    text-align: center;
    margin: 0 5px;

    display: flex;
    overflow-x: auto;
`;
