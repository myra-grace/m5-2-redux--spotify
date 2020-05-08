import React from 'react';
import styled from 'styled-components';

const Genre = ({genre}) => {
    return (
        <GenreContainer>
            <p>{genre}</p>
        </GenreContainer>
    )
}

export const Genres = ({ genres }) => {
    return (
        <Wrapper>
            <Container>
            {genres.map((genre) => (
                <Genre
                genre={genre}
            />
            ))}
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const Container = styled.ul`
    display: flex;
    overflow-x: auto;
`;

const GenreContainer = styled.li`
    text-decoration: none;
    background-color: #FF4FD8;
    border-radius: 10px;
    margin: 10px;
    padding: 15px;
    height: 50px;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;