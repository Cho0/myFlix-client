import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { MovieCard} from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { Registration } from '../registation-view/registration-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class MainView extends React.Component {

  constructor(){
    super();

    this.state= {
      movies: [],
      selectedMovie: null,
      user: null
    };
  };
  
  componentDidMount(){
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  getMovies(token) {
    axios.get('https://jasons-myflix.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const { movies, user } = this.state;

    if(!user) return 
    <Row>
      <Col>
        <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
      </Col>
    </Row>  
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <Router>
        <container>
          <header>
            <button onClick={() => { this.onLoggedOut() }}>Logout</button>
          </header>
          <Row className="main-view justify-content-md-center">
            <Route exact path="/" render={() => {
              return movies.map(m => (
                <Col md={3} key={m._id}>
                  <MovieCard movie={m} />
                </Col>  
              ))
            }} />
            <Route path="/movies/:movieID" render={({ match }) => {
              return <Col md={8}>
                <MovieView movie={movies.find(m => m._id === match.params.movieID)} />
              </Col>  
            }} />
          </Row>
        </container>
      </Router>  
    );
  }
}


//----------------//



export default MainView;