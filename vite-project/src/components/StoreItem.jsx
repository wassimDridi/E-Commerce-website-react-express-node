import { Card, Button } from 'react-bootstrap';
import formatCurrency from './formatCurrency';
import { useShoppingCart } from '../context/shoppingCartContext';

function StoreItem({
  reference,
  designation,
  marque,
  prixAchat,
  prixVente,
  qtestock,
  imageartpetitf,
  category,
  id,
}) {
  const {
    getItemsQuantity,
    removeItemFromCart,
    increaseCartQuantity,
    decreaseCartQuantity,
  } = useShoppingCart();
  const quantity = getItemsQuantity(id);

  return (
    <Card className="h-100 mt-5" >
      <Card.Img
        src={imageartpetitf}
        variant="top"
        style={{ width: '60%', height: '70%', objectFit: 'cover' }}
        className="g-3"
      />
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline">
        <div>
        <span className="fs-2">{reference}</span>
        </div>
        <div>
        <span className="mg-2 text-muted small">{designation}</span>
        </div>
        <div className="text-muted" style={{ marginBottom: '10px' }}>
        <span>{formatCurrency(prixVente)}</span> <br/>
        <span style={{textDecoration: 'line-through', color: 'red' }}>{formatCurrency(prixAchat)}</span><br/>
        <span>Quantity {qtestock}</span>
        </div>

          
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button onClick={() => increaseCartQuantity(id)} className="w-100">
              ADD
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: '0.5rem' }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: '0.5rem' }}
              >
                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                <span className="fs-3"> {quantity} in Cart</span>
                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
              </div>
              <Button
                onClick={() => removeItemFromCart(id)}
                variant="danger"
                size="sm"
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
export default StoreItem;
