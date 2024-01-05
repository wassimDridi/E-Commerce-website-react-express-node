import { useState, useEffect } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';

import axios from 'axios';

function EditArticle() {
  const [storeItems, setStoreItems] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:1234/api")
      .then((response) => setStoreItems(response.data.products))  
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDeletee = (id) => {

    console.log(`Deleting article with id: ${id}`);
  };

  const handleDelete = async (id) => { 
    if (!window.confirm("Are you sure you want to delete")) { 
    return; 
    } 
    
    axios.delete(`http://localhost:1234/api/${id}`) 
    .then(() => { 
    console.log('successfully deleted!') 
    setStoreItems(prevArticles => prevArticles.filter((article) =>
   article.id !== id)); 
    }).catch((error) => { 
    console.log(error) 
    }) 
    
    } 

  const handleModify = (id) => {
    // product to modify repmace all state id, reference .... take just product to modify and modify in input champ correspondent 
    const article = storeItems.find(item => item.id === id);
    setSelectedArticle(article);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const id = selectedArticle.id;
    console.log(selectedArticle)
  
    try {
      const response = await axios.put(`http://localhost:1234/api/${id}`, selectedArticle);
      console.log('Form submitted with data:', selectedArticle);
      console.log('Server response:', response.data);
    } catch (error) {
      console.error('Error updating product:', error);
      alert("Erreur ! Modification non effectuée");
    }
  };
  

  return (

    <>
    <Row md={2} xs={1} lg={3}>
      {storeItems.map((item) => (
        <Col key={item.id} >
        <Card className='w-50 l-50'>
          <Card.Img
            src={item.imageartpetitf}
            variant="top"
            style={{ width: '60%', height: '70%', objectFit: 'cover' }}
            className="g-3"
          />
          <Card.Body>
            <Button variant="danger" onClick={() => handleDelete(item.id)}>
              Delete Article
            </Button>
            <Button variant="primary" onClick={() => handleModify(item.id)}>
              Modify Article
            </Button>
            {selectedArticle && selectedArticle.id === item.id && (
              <Form onSubmit={handleFormSubmit}>
                <Form.Group controlId="formReference">
                  <Form.Label>Reference</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter reference"
                    value={selectedArticle.reference}
                    onChange={(e) => setSelectedArticle({ ...selectedArticle, reference: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="formDesignation">
                  <Form.Label>Designation</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter designation"
                    value={selectedArticle.designation}
                    onChange={(e) => setSelectedArticle({ ...selectedArticle, designation: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="formPrixAchat">
                  <Form.Label>Prix Achat</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter prix achat"
                    value={selectedArticle.prixAchat}
                    onChange={(e) => setSelectedArticle({ ...selectedArticle, prixAchat: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="formPrixVente">
                  <Form.Label>Prix Vente</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter prix vente"
                    value={selectedArticle.prixVente}
                    onChange={(e) => setSelectedArticle({ ...selectedArticle, prixVente: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="formQteStock">
                  <Form.Label>Quantité en Stock</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter quantity in stock"
                    value={selectedArticle.qtestock}
                    onChange={(e) => setSelectedArticle({ ...selectedArticle, qtestock: e.target.value })}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </Form>
            )}
          </Card.Body>
        </Card>
        </Col>
      ))}
      </Row>
    </>
  );
}

export default EditArticle;
