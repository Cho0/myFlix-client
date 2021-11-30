import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';

export class GenreView extends React.Component {

  render() {
    const { genre, onBackClick, movies } = this.props;

    return (
      <Container>
        <header>
          <h2>Genre</h2>
          <Button className="backButton" onClick={() => {
            onBackClick(null);
          }}>Back</Button>
        </header>

        <div>
          <span className="label">Name: </span>
          <span className="value">{genre.Name}</span>
        </div>
        <div>
          <span className="label">Description: </span>
          <span className="value">{genre.Description}</span>
        </div>

        <Row>
          <Col>
            <p>
              {genre.Name} Movie(s)
            </p>
          </Col>
        </Row>

        <Row>
          <Col>
            {movies.filter((m) => m.Genre.Name === genre.Name).map((m, i) => {
              return (
                <Card key={i}>
                  <Card.Img variant="top" src={m.ImagePath} />
                  <Card.Body>
                    <Card.Title>{m.Title}</Card.Title>
                    <Card.Text>{m.Description}</Card.Text>
                    <Link to={`/movies/${m._id}`}>
                      <Button variant="link">Open</Button>
                    </Link>
                  </Card.Body>
                </Card>
              )
            })}
          </Col>
        </Row>
      </Container>
    )
  }
};

