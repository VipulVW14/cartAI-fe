import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CartItem from './CartItem';
import config from '../../config';

const Cart = ({ sessionId }) => {
  const [items, setItems] = useState([]);
  const apiUrl = config.apiUrl; 

  useEffect(() => {
    const eventSource = new EventSource(`${apiUrl}/api/cart/sse/${sessionId}`); 
  
    // Handle incoming messages
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setItems(data.items);
    };
  
    // Handle any errors
    eventSource.onerror = (error) => {
      console.error('SSE error:', error);
      eventSource.close(); // Close connection on error
    };
  
    // Clean up the event source on unmount
    return () => {
      eventSource.close();
    };
  }, [sessionId]); // Re-run effect if sessionId changes
  
  const handleAdd = async (item) => {
    try {
      const itemToAdd = {
        Id: item.id,
        Name: item.name,
        Price: item.price,
        Quantity: 1,
        Image: item.image
      };
  
      await axios.post(`${apiUrl}/add`, { Items: [itemToAdd], sessionId }); // Send sessionId with the add request
  
      // Refresh cart items after adding
      fetchCartItems();
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };
  
  const handleRemove = async (item) => {
    try {
      const itemToRemove = {
        Id: item.id,
        Quantity: 1
      };
  
      await axios.post(`${apiUrl}/delete`, { Items: [itemToRemove], sessionId }); // Send sessionId with the delete request
  
      // Refresh cart items after removal
      fetchCartItems();
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };
  
  const handleDelete = async (item) => {
    try {
      const itemToDelete = {
        Id: item.id
      };
  
      await axios.post(`${apiUrl}/delete`, { Items: [itemToDelete], sessionId }); // Send sessionId with the delete request
  
      // Refresh cart items after deletion
      fetchCartItems();
    } catch (error) {
      console.error('Error deleting item from cart:', error);
    }
  };

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="h-screen p-4 md:px-8 md:p-4 md:h-screen bg-gray-100 md:min-h-[700px]">
      <h2 className="text-3xl font-semibold mb-2 md:my-2 md:mb-6">Your Cart</h2>
      
      <div className='border-2 py-4 px-2 rounded-xl bg-gray-100'>
      {items.length > 0 ? (
        <>
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onAdd={handleAdd}
              onRemove={handleRemove}
              onDelete={handleDelete}
            />
          ))}
          <h3 className="text-xl font-semibold mt-4 mx-4">Total: ${totalPrice}</h3>
        </>
      ) : (
        <p className="text-gray-600 mx-2">Your cart is empty.</p>
      )}
      </div>

    </div>
  );
};

export default Cart;
