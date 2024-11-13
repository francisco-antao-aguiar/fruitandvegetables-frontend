
import './FilterProduct.css';
import Card from '../../../UI/Card';
import { useState } from 'react';
import FilterMinMax from '../../../UI/FilterMinMax';
import FilterOptions from '../../../UI/FilterOptions';

const measureQuantityOptions = [
  { id: 'kg', name: 'Kilogram' },
  { id: 'un', name: 'Unit' },
];

export default function FilterProduct(props) {
  const [priceFilter, setPriceFilter] = useState({});
  const [measureQuantitiesFilter, setMeasureQuantitiesFilter] = useState([]);

  function priceFilterHandler(priceFilter) {
    setPriceFilter(priceFilter);
    props.onChangeFilter({
      priceMin: priceFilter.min, 
      priceMax: priceFilter.max, 
      measureQuantities: measureQuantitiesFilter});
  }

  function measureQuantitiesFilterHandler(measureQuantitiesFilter) {
    setMeasureQuantitiesFilter(measureQuantitiesFilter);
    props.onChangeFilter({
      priceMin: priceFilter.min, 
      priceMax: priceFilter.max, 
      measureQuantities: measureQuantitiesFilter});
  }



  return (
    <Card className='filter-product-container'>
      <h4>Filter</h4>
      <FilterMinMax label='Price'
        onFilter={priceFilterHandler} />
      <FilterOptions label='Measure Quantity'
        onFilter={measureQuantitiesFilterHandler}
        options={measureQuantityOptions} />
    </Card>
  );
}