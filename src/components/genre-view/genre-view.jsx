import React from 'react';
import PropTypes from 'prop-types';

import { Container, Button, Row, Col, Link } from 'react-bootstrap';

export class GenreView extends React.Component{

  render() {
    const { Genre, onBackClick, movies } = this.props;

    return (
      <Container>
        <Header>
          <h2>Genre</h2>
          <Button className="backButton" onClick={() => {
            onBackClick(null);
          }}>Back</Button>
        </Header>

        <div>
          <span className="label">Name: </span>
          <span className="value">{Genre.Name}</span>
        </div>
        <div>
          <span className="label">Description: </span>
          <span className="value">{Genre.Description}</span>
        </div>

        <Row>
          <Col>
            <p>
              {Genre.Name} Movie(s)
            </p>
          </Col>
        </Row>

        <Row>
          <Col>
            {movies.map((m) => {
              if (m.Genre.Name === Genre.Name){
                return (
                  <Card>
                    <Card.Img variant="top" src={movies.ImagePath} />
                    <Card.Body>
                      <Card.Title>{movies.Title}</Card.Title>
                      <Card.Text>{movies.Description}</Card.Text>
                      <Link to={`/movies/${movies._id}`}>
                        <Button variant="link">Open</Button>
                      </Link>
                    </Card.Body>
                  </Card>
                );
              };
            })};
          </Col>
        </Row>
      </Container>
    )
  };
};

GenreView.proptypes = {
  Genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string,
  }).isRequired
};