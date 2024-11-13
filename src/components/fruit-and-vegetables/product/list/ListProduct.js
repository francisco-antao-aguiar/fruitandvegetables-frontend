import ProductCard from './ProductCard';
import './ListProduct.css';
import ImagesContext from '../../../../store/fruit-and-vegetables/images-context';
import { useContext } from 'react';

export default function ListProduct(props) {
  const imagesContext = useContext(ImagesContext);

  return (
    <div className='list-products'>
      <div className='products-container'>
        {props.products.map(elem => (
          <ProductCard
            key={elem.id}
            id={elem.id}
            name={elem.name}
            img={imagesContext.images.get(elem.imageId)}
            price={elem.price}
            currency={elem.currency}
            measureQuantity={elem.measureQuantity}
          />
        ))}
      </div>
    </div>
  );
}