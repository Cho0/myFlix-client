import React from 'react';
import { Card, Row, Col, Button, Container, } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class DirectorView extends React.Component {

  render() {
    const { movies, onBackClick, director } = this.props;

    return (
      <Container>
        <header>
          <h2>Director</h2>
          <Button className="backButton" onClick={() => {
            onBackClick(null);
          }}>Back</Button>
        </header>

        <div>
          <span className="label">Name: </span>
          <span className="value">{director.Name}</span>
        </div>
        <div>
          <span className="label">Bio: </span>
          <span className="value">{director.Bio}</span>
        </div>
        <div>
          <span className="label">Born: </span>
          <span className="value">{director.Birth}</span>
        </div>
        <div>
          <span className="label">Death: </span>
          <span className="value">{director.Death}</span>
        </div>

        <Row>
          <Col>
            <p>
              {director.Name}'s Movie(s)
            </p>
          </Col>
        </Row>

        <Row>
          <Col>
            {movies.filter((m) => m.Director.Name === director.Name).map((m, i) => {
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

