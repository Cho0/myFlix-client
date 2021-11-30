import React from "react";
import axios from "axios";
import { Row, Col, Container, Button, Card } from 'react-bootstrap';


export class ProfileView extends React.Component {

  /* 
    Display username
    Display option to change password and email
    Display user's favorites and to remove them
    Allow user to deregister
  */
  constructor(props) {
    super(props);

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
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
    axios.get('https://jasons-myflix.herokuapp.com/users/$(Username)', {
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

  changeUsername = (m) => {
    m.preventDefault();
    const Username = localStorage.getItem("user");
    axios.put('https://jasons-myflix.herokuapp.com/users/${Username}/'), {
      Username: this.state.Username,
      Password
    }



  }


  // ----------------------------- Delete User ----------------------------- 



  // ----------------------------- Password Verification ----------------------------- 

  passwordVerify() {
    if (user.Password === user.Password) return

  }



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
        <div>
          <span className="value">{user.Username}</span>
        </div>
        <div>
          <span className="label">Password: </span>
          <span className="value">{user.Password}</span>
        </div>
        <div>
          <span className="label">Email: </span>
          <span className="value">{user.Email}</span>
        </div>
        <div>
          <span className="label">Birthday: </span>
          <span className="value">{user.Birthday}</span>
        </div>


      </Container>
    )
  }

}