import { Form, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import axios from 'axios';

function AddProduct() {
  const [formData, setFormData] = useState({
    reference: '',
    designation: '',
    marque: '',
    prixAchat: '',
    prixVente: '',
    qtestock: '',
    imageartpetitf: '',
    category : '',
  });
  const handleRadioChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      category: value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:1234/api",formData)
    .then(res => { 
      console.log(res); 
       }) 
      .catch(error=>{ 
       console.log(error) 
       alert("Erreur ! Insertion non effectuée") 
       })
    console.log(formData);
  };
  return (
    <>
    <Form onSubmit={handleSubmit}>
    <Form.Group controlId="productType">
        <Form.Check
          type="radio"
          label="PC"
          name="category"
          value="pc"
          checked={formData.category === 'pc'}
          onChange={handleRadioChange}
        />
        <Form.Check
          type="radio"
          label="Telephone"
          name="category"
          value="telephone"
          checked={formData.category === 'telephone'}
          onChange={handleRadioChange}
        />
        <Form.Check
          type="radio"
          label="Smartwatch"
          name="category"
          value="smartwatch"
          checked={formData.category === 'smartwatch'}
          onChange={handleRadioChange}
        />
      </Form.Group>


      <Form.Group controlId="reference">
        <Form.Label>Reference</Form.Label>
        <Form.Control
          type="text"
          name="reference"
          value={formData.reference}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="designation">
        <Form.Label>Designation</Form.Label>
        <Form.Control
          type="text"
          name="designation"
          value={formData.designation}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="marque">
        <Form.Label>Marque</Form.Label>
        <Form.Control
          type="text"
          name="marque"
          value={formData.marque}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="prixAchat">
        <Form.Label>Prix d'Achat</Form.Label>
        <Form.Control
          type="text"
          name="prixAchat"
          value={formData.prixAchat}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="prixVente">
        <Form.Label>Prix de Vente</Form.Label>
        <Form.Control
          type="text"
          name="prixVente"
          value={formData.prixVente}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="qtestock">
        <Form.Label>Quantité en Stock</Form.Label>
        <Form.Control
          type="text"
          name="qtestock"
          value={formData.qtestock}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="imageartpetitf">
        <Form.Label>Image Art Petit Format</Form.Label>
        <Form.Control
          type="text"
          name="imageartpetitf"
          value={formData.imageartpetitf}
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </>
  )
}

export default AddProduct