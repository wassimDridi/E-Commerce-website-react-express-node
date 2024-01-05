import React, { useState, useEffect } from 'react';
import { Offcanvas, Stack, Button } from 'react-bootstrap';
import { useShoppingCart } from '../context/shoppingCartContext';
import CartItem from './CartItem';
import formatCurrency from './formatCurrency';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function ShoppingCart({ isOren }) {
  const { cartItems, closeCart, clearCart } = useShoppingCart();
  const [storeItems, setStoreItems] = useState([]);
  const [payment, setPayment] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:1234/api")
      .then((response) => setStoreItems(response.data.products))  
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
    });

    const columnsPDF = [
      { dataKey: 'image', title: 'Image' },
      { dataKey: 'title', title: 'Désignation' },
      { dataKey: 'quantity', title: 'Quantité' },
      { dataKey: 'price', title: 'Prix' },
      { dataKey: 'STotal', title: 'Total' },
    ];

    const tableRows = cartItems.map((item) => {
      const p = storeItems.find((i) => i.id === item.id) || {};
      return {
        image: p.imageartpetitf,
        title: p.designation,
        quantity: p.qtestock,
        price: p.prixVente,
        STotal: (p.prixVente * item.qtestock).toFixed(3),
      };
    });
    console.log(tableRows)
    doc.autoTable({
      head: [columnsPDF.map(col => col.title)],
      body: tableRows.map(row => [
        row.imageartpetitf,
        row.designation,
        row.qtestock,
        row.prixVente,
        (row.prixVente * row.qtestock).toFixed(3) // Add this line for the STotal column
      ]),
      startY: 20,
      headStyles: {
        fillColor: [241, 196, 15],
        fontSize: 12,
        halign: 'center',
      },
      columnStyles: {
        0: { cellWidth: 30, cellHeight: 20, halign: 'center' },
        1: { cellWidth: 'auto', halign: 'center', fontStyle: 'bold' },
        2: { cellWidth: 30, halign: 'center' },
        3: { cellWidth: 30, halign: 'center' },
        4: { cellWidth: 30, halign: 'center' },
      },
      styles: {
        valign: 'middle',
      },
      didParseCell: function (data) {
        if (data.section === 'body') {
          data.row.height = 20;
        }
        if (data.column.dataKey === 'image') {
          data.cell.text = '';
          data.cell.raw = `${data.cell.raw}`;
        }
      },
      didDrawCell: function (data) {
        if (
          data.row.section === 'body' &&
          data.column.dataKey === 'image' &&
          data.cell.raw
        ) {
          const img = new Image();
          img.src = data.cell.raw;

          img.onload = () => {
            doc.addImageFromUrl(img.src, data.cell.x + 5, data.cell.y + 2, 13, 16);
          };

          img.onerror = (error) => {
            console.error('Error loading image:', error);
          };
        }
      },
    });

    const date = new Date().toString().split(' ');
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

    doc.text(`Total : ${formatCurrency(getTotalPrice())} TND`, 14, 15);
    doc.save(`report_${dateStr}.pdf`);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, cartItem) => {
      const item = storeItems.find((i) => i.id === cartItem.id);
      return total + (item?.prixVente || 0) * cartItem.quantity;
    }, 0);
  };

  const onToken = (token) => {
    console.log(token);
    clearCart();
    setPayment(false);
    // Navigate to the homepage or perform other actions
    // history.push('/'); // Replace with the appropriate path
  };

  const commander = () => {
    setPayment(true);
  };

  return (
    <Offcanvas show={isOren} onHide={closeCart} placement='end'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (<CartItem key={item.id} {...item} />))}
          <div className='ms-auto fw-bold fs-5'>
            Total{" "}
            {formatCurrency(getTotalPrice())}
          </div>
          <div>
            {payment ? (
              <StripeCheckout
                token={onToken}
                stripeKey="pk_test_51OEpYoAF5p0rfHtk6upco94II7O5uGzqIlicf3GE4C8WT4c8NdPqqJRIbEMt6uoEelfeKiKQ0SZQAw8OQY8zyJUH00ejYyl0Ny"
                amount={getTotalPrice() * 100} // Convert to cents
                currency="TND"
              />
            ) : null}
          </div>
          <button onClick={commander}>Proceed to Payment</button>
          <Button color="secondary" variant="outlined" onClick={generatePDF}>
            Imprimer PDF
          </Button>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default ShoppingCart;
