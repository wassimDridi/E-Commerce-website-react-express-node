import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
//import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function LogIn() {
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    email: '',
    motDePasse: '',
  });
  const navigate = useNavigate();


  useEffect(() => {
    axios.get("http://localhost:3001/Clients")
      .then((response) => {setClients(response.data)
     } )
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(clients);
    console.log(formData);
    const matchedClient = clients.find((client) =>
      client.email === formData.email && client.motDePasse === formData.motDePasse
    );
  
    if (matchedClient) {
      alert(matchedClient.id);
      navigate('/Inscription');
    } else {
      alert("Login failed. Please check your email and password.");
    }
  };
  

  return (
    <div>
      <h2>Log In</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="motDePasse">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            name="motDePasse"
            value={formData.motDePasse}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Log In
        </Button>
      </Form>
    </div>
  );
}

export default LogIn;
