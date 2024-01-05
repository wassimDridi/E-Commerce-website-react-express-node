import React from 'react';
import { Carousel, Container, Row, Col } from 'react-bootstrap';

function Home() {
  return (
    <Container>
      <Row>
        <Col>
          <h2>Welcome to Our Store</h2>
          <p>Discover the latest smartphones, PCs, and smartwatches at our store. Explore cutting-edge technology and find the perfect device for you.</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Carousel style={{ height: '90%' }}>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="home1.jpg" 
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>Explore the Latest Smartphones</h3>
                <p>Discover a wide range of smartphones with advanced features and stunning designs.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="home2.jpg" 
                alt="Second slide"
              />
              <Carousel.Caption>
                <h3>Powerful PCs for Your Needs</h3>
                <p>Find high-performance PCs that cater to your computing needs, whether it's work or gaming.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="home3.jpg"
                alt="Third slide"
              />
              <Carousel.Caption>
                <h3>Stay Connected with Smartwatches</h3>
                <p>Enhance your lifestyle with smartwatches that keep you connected and track your fitness activities.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
