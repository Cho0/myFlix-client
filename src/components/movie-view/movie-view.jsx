import React from 'react';


export class MovieView extends React.Component {

  keypressCallback(event) {
    console.log(event.key)
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }  

  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback);
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.ImagePath} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <Link to={`/directors/${movie.Director.Name}`}>
          <Button variant="link">Director</Button>
        </Link>

        <Link to={`/genres/${movie.Genre.Name}`}>
          <Button variant="link">Genre</Button>
        </Link>

        <Route path="/movies/:movieID" render={({ match, history }) => {
          return <Col md={8}>
            <MovieView movie={movies.find(m => m._id === match.params.movieId)}
            onBackClick={() => history.goBack()} />
          </Col>          
        }} />
        <Route path="/directors/:name" render={({ match, history }) => {
        if (movies.length === 0) return <div className="main-view" />;
          return <Col md={8}>
            <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
          </Col>
        }
        } />
        <Route path="/genres/:name" render={({ match, history }) => {
        if (movies.length === 0) return <div className="main-view" />;
          return <Col md={8}>
            <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
          </Col>
        }
        } />
      </div>
    );
  }
}