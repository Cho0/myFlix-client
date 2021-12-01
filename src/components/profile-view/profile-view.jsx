import React from "react";
import axios from "axios";
import { Row, Col, Container, Button, Card, Form } from 'react-bootstrap';


export class ProfileView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
      FavoriteMovies: []
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }
  // ----------------------------- Get User Data -----------------------------
  getUser = (token) => {
    const Username = localStorage.getItem("user");
    axios.get('https://jasons-myflix.herokuapp.com/users/:Username', {
      header: { Authorization: `Bearer $token` },
    }).then((response) => {
      this.setState({
        user: response.data
      });
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  // ----------------------------- Edit User Data -----------------------------

  changeUsername = (e) => {
    e.preventDefault();
    const Username = localStorage.getItem("user");
    axios.put('https://jasons-myflix.herokuapp.com/users/:Username/'), {
      Username: Username,
      Password: password,
      Email: email,
      Birthday: birthday
    }

  };

  // ----------------------------- Delete Favorite Movie -----------------------------

  removeMovie(selectedMovie) {
    m.preventDefault();
    axios.delete('https://jasons-myflix.herokuapp.com/users/:Username/favorites/:MovieID')

  };

  // ----------------------------- Delete User ----------------------------- 

  deleteUser() {
    axios.delete('https://jasons-myflix.herokuapp.com/users/:Username/', {
      header: { Authorization: `Bearer $token` },
    })
      .then((response) => {
        console.log(response);
        alert("Profile has been deleted");
      })
      .catch((error) => {
        console.log(error);
      })
  }
  // ----------------------------- Password Verification ----------------------------- 

  // passwordVerify() {
  //   if (user.Password === user.Password) return

  // }



  render() {

    const { user, movies, onBackClick } = this.props;

    return (
      <Container>
        <header>
          <h2>
            Profile
          </h2>
          <Button className="backButton" onClick={() => {
            onBackClick(null);
          }}>Back</Button>
        </header>


        <Form>
          <Form.Group>
            <span className="label">Account User: {user.Username}</span>
            <Form.Label>Change Username: </Form.Label>
            <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>New Password:</Form.Label>
            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <span className="label">Account Email: {user.Email} </span>
            <Form.Label>New Email:</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group>
            <span className="label">Birthday: {user.Birthday}</span>
            <Form.Label>Edit Birthday:</Form.Label>
            <Form.Control type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
          </Form.Group>

        </Form>

        <Row>
          <Col>
            {movies.filter((m) => m.Users.FavoriteMovies === user.FavoriteMovies).map((m, i) => {
              return (
                <Card key={i}>
                  <Card.Img variant="top" src={m.ImagePath} />
                  <Card.Body>
                    <Card.Title>{m.Title}</Card.Title>
                    <Card.Text>{m.Description}</Card.Text>
                    <Link to={`/movies/${m._id}`}>
                      <Button variant="link">Open</Button>
                    </Link>
                    <Button variant="link" onClick={this.removeMovie}>
                      Remove Movie
                    </Button>
                  </Card.Body>
                </Card>
              )
            })}
          </Col>
        </Row>

      </Container>
    )
  }

}