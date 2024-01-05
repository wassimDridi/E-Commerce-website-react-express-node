//import StoreItems from '../data/StoreItems.json';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios'; // Import axios
import { useState, useEffect } from 'react';
import StoreItem from './storeItem';

function Store() {
  const [storeItems, setStoreItems] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:1234/api")
      .then((response) => setStoreItems(response.data.products))  
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  
  

  return (
    <>
      <h1>Store</h1>
      <Row md={2} xs={1} lg={3}>
        {storeItems.map((item) => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Store;
