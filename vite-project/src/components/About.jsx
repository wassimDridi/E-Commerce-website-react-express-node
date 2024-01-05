import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

function About() {
  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4" style={{ color: '#007BFF', backgroundColor: '#f8f9fa', padding: '10px' }}>About Us</h2>
      <p className="text-muted" style={{ backgroundColor: '#f8f9fa', padding: '15px' }}>
        Welcome to our online store! We are dedicated to providing the latest and greatest in technology.
        Our mission is to offer a wide range of high-quality smartphones, PCs, and smartwatches to meet the diverse needs of our customers.
        Explore our products and discover innovation at your fingertips.
      </p>

      <hr className="my-4" />

      <h2 className="text-center mb-4" style={{ color: '#28a745', backgroundColor: '#f8f9fa', padding: '10px' }}>Contact Us</h2>
      <Row>
        <Col md={6}>
          <Image src="home1.jpg" fluid />
        </Col>
        <Col md={6} className="text-muted" style={{ backgroundColor: '#f8f9fa', padding: '15px' }}>
          <h4>Contact Information</h4>
          <p>
            <strong>Email:</strong> info@example.com
            <br />
            <strong>Phone:</strong> +216 21 235 555
            <br />
            <strong>Location:</strong> Tan Your Km 6.5, Sfax City
          </p>
        </Col>
      </Row>

      <hr className="my-4" />

      <h2 className="text-center mb-4" style={{ color: '#dc3545', backgroundColor: '#f8f9fa', padding: '10px' }}>Our Services</h2>
      <Row>
        <Col style={{ backgroundColor: '#f8f9fa', padding: '15px' }}>
          <h4>Smartphones</h4>
          <p>Discover the latest smartphones with cutting-edge technology.</p>
        </Col>
        <Col style={{ backgroundColor: '#f8f9fa', padding: '15px' }}>
          <h4>PCs</h4>
          <p>Explore our powerful PCs designed for multitasking and productivity.</p>
        </Col>
        <Col style={{ backgroundColor: '#f8f9fa', padding: '15px' }}>
          <h4>Smartwatches</h4>
          <p>Stay connected with our stylish and feature-rich smartwatches.</p>
        </Col>
      </Row>
    </Container>
  );
}

export default About;
