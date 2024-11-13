import Popup from 'reactjs-popup';
import './ShoppingCartPopUp.css';
import { useContext, useEffect, useState } from 'react';
import Card from '../../UI/Card';
import CartContext from '../../../store/fruit-and-vegetables/cart-context';
import ShoppingCartElem from './ShoppingCartElem';
import UsernameContext from '../../../store/fruit-and-vegetables/username-context';
import ProductsContext from '../../../store/fruit-and-vegetables/products-context';
import ImagesContext from '../../../store/fruit-and-vegetables/images-context';
import Button from '../../UI/Button';
import OrdersContext from '../../../store/fruit-and-vegetables/orders-context';

export default function ShoppingCartPopUp(props) {

  const cartContext = useContext(CartContext);
  const productsContext = useContext(ProductsContext);
  const imagesContext = useContext(ImagesContext);
  const usernameContext = useContext(UsernameContext);
  const ordersContext = useContext(OrdersContext);

  const [allProducts, setAllProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    productsContext.products.forEach((productsContextElem) => {
      if(!allProducts.find(allProductsElem => allProductsElem.id === productsContextElem.id)){
        allProducts.push(productsContextElem);
      }
    });
    setAllProducts(allProducts);
  }, [productsContext, allProducts]);

  function shoppingCartElems(cartElems) {
    const shoppingCartElems = [];
    let totalPrice = 0;
    cartElems.forEach((value, key) => {
      const product = allProducts.find(elem => elem.id === key);
      totalPrice += product.price * value;
      shoppingCartElems.push(<ShoppingCartElem key={key}
        id={key}
        name={product.name}
        price={product.price}
        currencySymble={product.currency}
        measureQuantity={product.measureQuantity}
        image={imagesContext.images.get(product.imageId)}
        amount={value} />);
    });
    setTotalPrice(totalPrice);
    return shoppingCartElems;
  }

  async function purchaseHandler(event, close) {
    const makeOrder = [];
    cartContext.cart.forEach((value, key) => {
      makeOrder.push({
        username: usernameContext.username,
        productId: key,
        amount: value,
      });
      close();
    });

    try {
      await fetch('http://localhost:8080/make-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(makeOrder),
      });
      ordersContext.fetchOrders();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <Popup trigger={props.children}
      modal nested>
      {
        close => (
          <div className='shopping-cart-pop-up-modal'>
            <div className='shopping-cart-pop-up-background' onClick={() => close()}>
            </div>
            <Card className='shopping-cart-pop-up-content'>
              <h3>Shopping Cart</h3>
              <div className='shopping-cart-pop-up-elems'>
                {shoppingCartElems(cartContext.cart)}
              </div>
              <Button onClick={(event) => purchaseHandler(event, close)}>{'Total price: €' + totalPrice}</Button>
            </Card>
          </div>
        )
      }
    </Popup>
  );
}