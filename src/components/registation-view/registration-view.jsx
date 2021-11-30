import React, { useState } from 'react';
import { Form, Container, Row, Col, Card, Button } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


export function RegistationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('')


  const handleRegister = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://jasons-myflix.herokuapp.com/register', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      window.open('/', '_self');
    })
    .catch(e => {
      console.log('error registering user')
    });
  };

  return (
    <Container>
      <p>Register here:</p>
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </Form.Group>

        <Form.Group>
          <Form.Label>Birthday:</Form.Label>
          <Form.Control type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)}/>  
        </Form.Group>  

        <Button variant="primary" type="submit" onClick={handleRegister}>
          Register
        </Button>
      </Form>
    </Container>
  );
}