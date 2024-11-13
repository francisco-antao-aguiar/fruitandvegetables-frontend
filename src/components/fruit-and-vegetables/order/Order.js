import { useContext } from "react";
import ImagesContext from "../../../store/fruit-and-vegetables/images-context";
import './Order.css';

const currencySymblos = {
  euro: '€',
  dolar: '$',
};
const measureQuantities = {
  'kg': 'Kg',
  'un': 'Unit',
};

export default function Order(props) {
  const imagesContext = useContext(ImagesContext);
  
  return (
    <div className='order-elem'>
      <div className='order-elem-part-1'>
        <div>{props.order.product.name.charAt(0).toUpperCase() + props.order.product.name.slice(1)}</div>
        <img className='order-elem-image' src={`data:image/webp;base64,${imagesContext.images.get(props.order.product.imageId)}`} alt={props.order.product.name} />
      </div>
      <div className='order-elem-part-2'>
        <div>{currencySymblos[props.order.product.currency] + props.order.product.price + '/' + measureQuantities[props.order.product.measureQuantity]}</div>
        <div> {props.order.amount}</div>
      </div>
    </div>
  );
}