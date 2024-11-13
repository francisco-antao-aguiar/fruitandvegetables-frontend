import Popup from 'reactjs-popup';
import './OrdersPopUp.css';
import { useContext } from 'react';
import OrdersContext from '../../../store/fruit-and-vegetables/orders-context';
import Card from '../../UI/Card';
import Order from '../order/Order';

export default function ShoppingCart(props) {

  const ordersContext = useContext(OrdersContext);

  return (
    <Popup trigger={props.children}
      modal nested>
      {
        close => (
          <div className='order-pop-up-modal'>
            <div className='order-pop-up-background' onClick={() => close()}>
            </div>
            <Card className='order-pop-up-content'>
              <h3>Orders History</h3>
              <div className='shopping-cart-pop-up-elems'>
                {ordersContext.orders.map((elem) => {
                  return (
                    <Order key={elem.id} order={elem} />
                  );
                })}
              </div>
            </Card>
          </div>
        )
      }
    </Popup>
  );
}