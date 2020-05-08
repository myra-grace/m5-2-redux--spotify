import React from 'react';
import { useDispatch } from 'react-redux';
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import styled from 'styled-components';

import {
  requestAccessToken,
  receiveAccessToken,
  receiveAccessTokenError,
} from '../../actions'

import GlobalStyles from '../GlobalStyles/GlobalStyles';
import ArtistRoute from '../ArtistRoute';

const DEFAULT_ARTIST_ID = '2b0aKuno01NxPWVCUVIEc8';

const App = () => {
  const dispatch = useDispatch();
  
  React.useEffect(() => {
    dispatch(requestAccessToken());

    fetch('/spotify_access_token')
    .then((res) => res.json())
    .then((json) => {
      console.log('json: ', json);
      dispatch(receiveAccessToken(json.access_token));
    })
    .catch((err) => {
      console.log('err: ', err);
      dispatch(receiveAccessTokenError());
    });
  }, []);

  return ( 
    <Router>
      <Switch>
        <Route path="/artists/:id">
          <ArtistRoute />
        </Route>
        <Redirect to={`/artists/${DEFAULT_ARTIST_ID}`}/>
      </Switch>
      <GlobalStyles />
    </Router>
  );
};

//-------------------------------- STYLING --------------------------------

const Wrapper = styled.div`
    padding: 10px;
    display: block;
    background-color: rgb(37, 0, 90, 0.5);
    height: 100%;
`;

export default App;
