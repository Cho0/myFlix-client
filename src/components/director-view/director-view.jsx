import React from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col, Button, Link, Container } from 'react-bootstrap';

export class DirectorView extends React.Component{

  render() {
    const { movies, onBackClick, Director } = this.props;

    return (
      <Container>
        <Header>
          <h2>Director</h2>
          <Button className="backButton" onClick={() => {
            onBackClick(null);
          }}>Back</Button>
        </Header>

        <div>
          <span className="label">Name: </span>
          <span className="value">{Director.Name}</span>
        </div>
        <div>
          <span className="label">Bio: </span>
          <span className="value">{Director.Bio}</span>
        </div>
        <div>
          <span className="label">Born: </span>
          <span className="value">{Director.Birth}</span>
        </div>
        <div>
          <span className="label">Death: </span>
          <span className="value">{Director.Death}</span>
        </div>

        <Row>
          <Col>
            <p>
              {Director.Name}'s Movie(s)
            </p>
          </Col>
        </Row>

        <Row>
          <Col>
            {movies.map((m) => {
              if (m.Director.Name === Director.Name){
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

DirectorView.proptypes = {
  Director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string,
    Birth: PropTypes.string,
    Death: PropTypes.number,
  }).isRequired,
};