import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

function Inscription() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    numeroTelephone: '',
    adresse: '',
    email: '',
    motDePasse: '',
    id :0 ,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/Clients", formData)
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.error(error);
        alert("Erreur ! Insertion non effectuée");
      });
    setFormData({
      nom: '',
      prenom: '',
      numeroTelephone: '',
      adresse: '',
      email: '',
      motDePasse: '',
    });
  };

  useEffect(() => {
    console.log('Component mounted or form data changed:', formData);
  }, [formData]);

  return (
    <div>
      <h2>Inscription</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="nom">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrez votre nom"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="prenom">
          <Form.Label>Prénom</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrez votre prénom"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="numeroTelephone">
          <Form.Label>Numéro de téléphone</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Entrez votre numéro de téléphone"
            name="numeroTelephone"
            value={formData.numeroTelephone}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="adresse">
          <Form.Label>Adresse</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrez votre adresse"
            name="adresse"
            value={formData.adresse}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Entrez votre adresse email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="motDePasse">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Entrez votre mot de passe"
            name="motDePasse"
            value={formData.motDePasse}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          S'inscrire
        </Button>
      </Form>
    </div>
  );
}

export default Inscription;
