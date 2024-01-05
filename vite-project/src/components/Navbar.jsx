import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { FaShoppingCart } from "react-icons/fa" //npm i react-icons google browser react icons
import { useShoppingCart } from "../context/shoppingCartContext"
function Navbar() {
    const {openCart ,cartQuantity} = useShoppingCart()
  return (
    <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
        <Container>
            <Nav className="me-auto">
                <Nav.Link to='/' as={NavLink}>Home</Nav.Link>
                <Nav.Link to='/LogIn' as={NavLink}>LogIn</Nav.Link>
                <Nav.Link to='/Inscription' as={NavLink}>Inscription</Nav.Link>
                <Nav.Link to='/AddProduct' as={NavLink}>AddProduct</Nav.Link>
                <Nav.Link to='/EditArticle' as={NavLink}>EditArticle</Nav.Link>
                <Nav.Link to='/store' as={NavLink}>Store</Nav.Link>
                <Nav.Link to='/about' as={NavLink}>About</Nav.Link>
            </Nav>
            <Button variant="outline-primary" className="rounded-circle" 
            onClick={openCart}
            style={{width : "3rem" , height : "3rem", position :"relative"}} >
                <FaShoppingCart />
                <div className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                style={{position:"absolute" ,color:"white" ,width : "1.5rem" , height : "1.5rem"
                ,bottom:0 ,right:0 , transform :"translate(25%,25%)"}}>
                    {cartQuantity}
                </div>
            </Button>
        </Container>
    </NavbarBs>
  )
}

export default Navbar