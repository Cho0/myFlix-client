import React from "react";
import axios from "axios";
import { Row, Col, Container, Button, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class ProfileView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user: null,
      formFields: { Username: '', Password: '', Email: '', Birthday: '' },
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }
  // ----------------------------- Get User Data -----------------------------
  getUser = (token) => {
    const Username = localStorage.getItem("user");
    axios.get(`https://jasons-myflix.herokuapp.com/users/${Username}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      this.setState({
        user: response.data,

      });
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  // ----------------------------- Edit User Data -----------------------------

  updateUser = (user) => {
    const token = localStorage.getItem("token");

    return axios.put(`https://jasons-myflix.herokuapp.com/users/${this.state.user.Username}/`,
      user,
      { headers: { Authorization: `Bearer ${token}` } }
    )
  };

  // ----------------------------- Delete Favorite Movie -----------------------------

  removeMovie = (e, movie) => {
    // e.preventDefault();
    const token = localStorage.getItem("token");
    return axios.delete(`https://jasons-myflix.herokuapp.com/users/${this.state.user.Username}/favorites/${movie._id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        console.log(response);
        alert("Movie was removed")
      })
      .catch((error) => {
        console.log(error);
      });
  }



  // ----------------------------- Delete User ----------------------------- 

  deleteUser() {
    const token = localStorage.getItem("token");
    axios.delete(`https://jasons-myflix.herokuapp.com/users/${this.state.user.Username}/`, {
      header: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        console.log(response);
        alert("Profile has been deleted");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.open('/', '_self')
      })
      .catch((error) => {
        console.log(error);
      })
  }
  // ----------------------------- Password Verification ----------------------------- 

  // passwordVerify() {
  //   if (user.Password === user.Password) return

  // }
  // ----------------------------- Set user -----------------------------

  setUsername(username) {
    this.setState({
      formFields: { ...this.state.formFields, Username: username }
    })
  }

  setPassword(password) {
    this.setState({
      formFields: { ...this.state.formFields, Password: password }
    })
  }

  setEmail(email) {
    this.setState({
      formFields: { ...this.state.formFields, Email: email }
    })
  }

  setBirthday(birthday) {
    this.setState({
      formFields: { ...this.state.formFields, Birthday: birthday }
    })
  }
  // ----------------------------- Submit button -----------------------------

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.formFields);
    this.updateUser(this.state.formFields)
      .then((response) => {
        console.log(response);
        alert('Profile has been updated')
        this.setState({ user: response.data })
        localStorage.setItem('user', response.data.Username)
        window.open(`/users/${response.data.Username}`, '_self')
      })
  };

  // movieMatch = favoriteMovies.filter(function (o1) {
  //   return movies._id(function (o2) {
  //     return o1.id === o2.id;
  //   });
  // });



  render() {

    const { movies, onBackClick } = this.props;
    const { user, formFields } = this.state;

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

        {user && <Form onSubmit={(e) => this.handleSubmit(e)}>
          <Form.Group>
            <span className="label">Account User: {user.Username}</span>
            <Form.Label>Change Username: </Form.Label>
            <Form.Control type="text" value={formFields.Username} onChange={(e) => this.setUsername(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>New Password:</Form.Label>
            <Form.Control type="password" value={formFields.Password} onChange={(e) => this.setPassword(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <span className="label">Account Email: {user.Email} </span>
            <Form.Label>New Email:</Form.Label>
            <Form.Control type="email" value={formFields.Email} onChange={(e) => this.setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group>
            <span className="label">Birthday: {user.Birthday}</span>
            <Form.Label>Edit Birthday:</Form.Label>
            <Form.Control type="date" value={formFields.Birthday} onChange={(e) => this.setBirthday(e.target.value)} />
          </Form.Group>

          <Button variant="primary" type="submit" >
            Update
          </Button>

        </Form>}


        <Row>
          <Col>
            <p>list</p>

            {user && movies.filter(m => user.Favorites.includes(m._id)).map((m, i) => {
              return (
                <Card key={i}>
                  <Card.Img variant="top" src={m.ImagePath} />
                  <Card.Body>
                    {/* {FavoriteMovies.length === 0 && (
                    <div className="text-center">No Favorites D:</div>
                  )} */}
                    <Card.Title>{m.Title}</Card.Title>
                    <Card.Text>{m.Description}</Card.Text>
                    <Link to={`/movies/${m._id}`}>
                      <Button variant="link">Open</Button>
                    </Link>
                    <Button variant="link" value={movies._id} onClick={(user) => this.removeMovie(user, m)}>
                      Remove Movie
                    </Button>
                  </Card.Body>
                </Card>
              )
            })}


          </Col>
        </Row>
        <div>
          <p>Warning: This will delete your account</p>
          <Button className="delete-button" variant="danger"
            onClick={() => this.deleteUser()}>
            Delete account
          </Button>
        </div>
      </Container>

    )
  }

}