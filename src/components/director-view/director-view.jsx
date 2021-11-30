import React from 'react';
import { Card, Row, Col, Button, Container, Header } from 'react-bootstrap';
import { Link } from 'react-router-dom';



export class DirectorView extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { movies, onBackClick, director } = this.props;

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
            {/* {movies.map((m) => {
              if (m.Director.Name === Director.Name) {
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
            })}; */}
          </Col>
        </Row>
      </Container>
    )
  };
};

