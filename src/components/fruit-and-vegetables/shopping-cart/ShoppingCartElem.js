import { useContext } from 'react';
import InputNumber from '../../UI/InputNumber';
import './ShoppingCartElem.css';
import CartContext from '../../../store/fruit-and-vegetables/cart-context';

export default function ShoppingCartElem(props) {

  const cartContext = useContext(CartContext);

  function amountHandler(amount) {
    const newCart = new Map(cartContext.cart);
    newCart.set(props.id, amount);
    cartContext.setCart(newCart); 
  }

  return (
    <div className='shopping-cart-elem'>
      <div className='shopping-cart-elem-part-1'>
        <div>{props.name}</div>
        <img className='shopping-cart-elem-image' src={`data:image/webp;base64,${props.image}`} alt={props.name} />
      </div>
      <div className='shopping-cart-elem-part-2'>
        <div>{props.currencySymble + props.price + '/' + props.measureQuantity}</div>
        <InputNumber measureQuantity={props.measureQuantity} onChange={amountHandler}>{props.amount}</InputNumber>
      </div>
    </div>
  );
}