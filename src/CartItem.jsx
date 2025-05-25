import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;
  cart.forEach(item => {
    // Remove '$' and convert cost to number, then multiply by quantity
    const itemCost = parseFloat(item.cost.substring(1)) * item.quantity;
    total += itemCost;
  });
  return total.toFixed(2); // Returns total with 2 decimal places
  };

  const handleContinueShopping = (e) => {
   onContinueShopping(); // Calls the parent component's continue shopping handler
  };



  const handleIncrement = (item) => {
    const newQuantity = item.quantity + 1;
  dispatch(updateQuantity({ name: item.name, quantity: newQuantity }));
  };

  const handleDecrement = (item) => {
   const newQuantity = Math.max(1, item.quantity - 1); // Prevents quantity from going below 1
  dispatch(updateQuantity({ name: item.name, quantity: newQuantity }));
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));  // Dispatch the removeItem action with the plant's name
  };
  // Function to handle quantity changes
  const handleQuantityChange = (itemName, newQuantity) => {
    dispatch(updateQuantity({ name: itemName, quantity: newQuantity }));
  };

  // Function to remove item
  const handleRemoveItem = (itemName) => {
    dispatch(removeItem(itemName));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    // Extract numeric value from cost string (e.g., "$10.99" → 10.99)
  const unitPrice = parseFloat(item.cost.substring(1));
  // Calculate subtotal (unit price × quantity)
  const subtotal = unitPrice * item.quantity;
  // Return formatted to 2 decimal places
  return subtotal.toFixed(2);
  };

  const handleCheckoutShopping = (e) => {
  alert('Functionality to be added for future reference');
};

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


