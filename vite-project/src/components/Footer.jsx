import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="mt-5" style={{ backgroundColor: '#bfa481', color: '#fff', padding: '20px 0' }}>
      <Container>
        <Row>
          <Col md={4}>
            <h5>Contact Us</h5>
            <p>
              <strong>Email:</strong> info@example.com
              <br />
              <strong>Phone:</strong> +216 21 235 555
              <br />
              <strong>Location:</strong> Tan Your Km 6.5, Sfax City
            </p>
          </Col>
         
          <Col md={4}>
            <h5>Connect With Us</h5>
            <p>Follow us on social media for the latest updates:</p>
            
          </Col>
        </Row>
      </Container>
      <div className="text-center p-3" style={{ backgroundColor: '#212529', color: '#fff' }}>
        © {new Date().getFullYear()} IOS Store create by Dridi
      </div>
    </footer>
  );
}

export default Footer;
