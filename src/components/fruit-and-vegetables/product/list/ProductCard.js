import { useContext } from "react";
import Card from "../../../UI/Card";
import InputNumber from "../../../UI/InputNumber";
import './ProductCard.css';
import CartContext from "../../../../store/fruit-and-vegetables/cart-context";

export default function ProjectCard(props) {
  const cartContext = useContext(CartContext);

  function amountHandler(amount) {
    const newCart = new Map(cartContext.cart);
    if (amount === 0) {
      newCart.delete(props.id);
    }
    else {
      newCart.set(props.id, amount);
    }
    cartContext.setCart(newCart);
  }

  return (
    <Card className='product-card'>
        <h3>{props.name}</h3>
        <img className='product-card-image' src={`data:image/webp;base64,${props.img}`} alt={props.name} width="180" height="180" />
      <div className='price-amount'>
        <p>{props.currency + props.price + '/' + props.measureQuantity}</p>
        <InputNumber className='input-number-product-card' measureQuantity={props.measureQuantity} onChange={amountHandler}></InputNumber>
      </div>
    </Card>
  );
}