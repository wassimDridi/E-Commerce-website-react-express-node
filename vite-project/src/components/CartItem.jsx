import { Button, Stack } from 'react-bootstrap'
//import StoreItems from '../data/StoreItems.json';
import formatCurrency from './formatCurrency';
import { useShoppingCart } from '../context/shoppingCartContext';
import axios from 'axios'; // Import axios
import { useState, useEffect } from 'react';

function CartItem({id , quantity}) {
    const [storeItems, setStoreItems] = useState([]);

    useEffect(() => {
      axios.get("http://localhost:1234/api")
        .then((response) => setStoreItems(response.data.products))  
        .catch((error) => console.error("Error fetching data:", error));
    }, []);
    const {removeItemFromCart} =useShoppingCart()
    const item = storeItems.find((i) => i.id === id)
    if(item == null ) return null
  return (
    <Stack direction='horizontal' gap={2} className='d-flex align-items-center'>
        <img src={item.imageartpetitf} style={{width : "125px" , height:"75px" ,objectFit :"cover"}} alt='image'/>
        <div className='me-auto'>
            <div>{item.marque} {" "} {item.reference} {" "}
                {quantity > 1 && (
                    <span className='text-muted' style={{ fontSize :"0.65rem"}}>
                        x {quantity}
                    </span>
                )}
                <div className='text-muted' style={{ fontSize :"0.75rem"}}>
                    {formatCurrency(item.prixVente)}
            </div>
            </div>
            

        </div>
        <div>{formatCurrency(item.prixVente * quantity)}</div>
        <Button variant='outline-danger' size='sm' onClick={()=> removeItemFromCart(id)}> &times; </Button>
    </Stack>
  )
}

export default CartItem

//&times; in html for X