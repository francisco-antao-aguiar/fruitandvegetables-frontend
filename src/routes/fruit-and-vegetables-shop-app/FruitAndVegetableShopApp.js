import { useCallback, useEffect, useState } from 'react';
import './FruitAndVegetableShopApp.css';
import ListProduct from '../../components/fruit-and-vegetables/product/list/ListProduct';
import FilterProduct from '../../components/fruit-and-vegetables/product/filter/FilterProduct';
import Header from '../../components/fruit-and-vegetables/header/HeaderFruitAndVegetables';
import ImagesContext from '../../store/fruit-and-vegetables/images-context';
import OrdersContext from '../../store/fruit-and-vegetables/orders-context';
import UsernameContext from '../../store/fruit-and-vegetables/username-context';
import CartContext from '../../store/fruit-and-vegetables/cart-context';
import ProductsContext from '../../store/fruit-and-vegetables/products-context';

export default function FruitAndVegetableShopApp() {

  const [products, setProducts] = useState([]);
  const [images, setImages] = useState(new Map());
  const [orders, setOrders] = useState([]);
  const [username, setUsername] = useState('admin');
  const [cart, setCart] = useState(new Map());
  // eslint-disable-next-line no-unused-vars
  const [nameFilter, setNameFilter] = useState('');


  const [filters, setFilters] = useState({
    priceMin: null,
    priceMax: null,
    measureQuantities: [],
  });

  function onChangeFilterHandler(filters) {
    setFilters(filters);
  }

  const fetchProducts = useCallback(async () => {
    const currencySymbles = {
      euro: '€',
      dolar: '$',
    };
    const measureQuantitys = {
      'kg': 'Kg',
      'un': 'Unit',
    };

    try {
      const response = await fetch('http://localhost:8080/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: nameFilter, ...filters }),
      });
      let data = await response.json();
      data = data.map((elem) => {
        return {
          ...elem,
          key: elem.id,
          name: elem.name.charAt(0).toUpperCase() + elem.name.slice(1),
          price: elem.price,
          currency: currencySymbles[elem.currency],
          measureQuantity: measureQuantitys[elem.measureQuantity],
        };

      });
      setProducts(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }, [filters, nameFilter]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);


  const fetchImages = useCallback(async () => {
    const map = new Map();
    try {
      const response = await fetch('http://localhost:8080/images', {
        method: 'GET',
        headers: {},
      });
      let data = await response.json();
      data.forEach(elem => map.set(elem.id, elem.data));
      setImages(map);
    } catch (error) {
      console.error('Error:', error);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const fetchOrders = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8080/orders/' + username, {
        method: 'GET',
        headers: {},
      });
      let data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }, [username]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <ProductsContext.Provider value={{ products, setProducts, fetchProducts }}>
      <CartContext.Provider value={{ cart, setCart }}>
        <UsernameContext.Provider value={{ username, setUsername }}>
          <OrdersContext.Provider value={{ orders, setOrders, fetchOrders }}>
            <ImagesContext.Provider value={{ images, setImages }}>
              <div className='fruit-and-vegetables'>
                <Header />
                <FilterProduct onChangeFilter={onChangeFilterHandler} />
                <div className='non-fixed'>
                  <ListProduct products={products}/>
                </div>
              </div>
            </ImagesContext.Provider >
          </OrdersContext.Provider>
        </UsernameContext.Provider>
      </CartContext.Provider>
    </ProductsContext.Provider>
  );
}