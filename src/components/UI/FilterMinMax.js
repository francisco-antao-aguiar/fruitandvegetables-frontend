import { useState } from 'react';
import './FilterMinMax.css';
import InputText from './InputText';
import FilterCard from '../fruit-and-vegetables/product/filter/utils/FilterCard';

export default function FilteMinMax(props) {

  const [valueMin, setValueMin] = useState('');
  const [valueMax, setValueMax] = useState('');

  const onChangeMinHandler = (e) => {
    const min = e.target.value;
    setValueMin(priceformatter(min));
  };

  const onChangeMaxHandler = (e) => {
    const max = e.target.value;
    setValueMax(priceformatter(max));
  };

  const onBlurHandler = (e) => {
    props.onFilter({min: valueMin, max: valueMax});
  };

  const priceformatter = (price) => {
    let targetValue = price.replace(',', '.'); // replace comma with dot
    targetValue = targetValue.replace(/[^\d.]/g, ''); // remove all non digits and non dot
    const charIndex = targetValue.indexOf('.');
    targetValue = targetValue.slice(0, charIndex + 3); // keep only 2 digits after dot
    targetValue = targetValue.replace(/\./g, (s, i) => i > charIndex ? '' : s);  // remove all dots except the first one
    return targetValue;
  };


  return (
    <FilterCard label={props.label}>
      <div className='filter-min-max-field'>
        <div className='min-max-field'>
          <InputText
            type="text"
            inputMode="decimal"
            placeholder="Min (1.23)"
            onChange={onChangeMinHandler}
            onBlur={onBlurHandler}
            value={valueMin} />
        </div>
        <div className='min-max-field'>
          <InputText
            type="text"
            inputMode="numeric"
            placeholder="Max (1.23)"
            onChange={onChangeMaxHandler}
            onBlur={onBlurHandler}
            value={valueMax} />
        </div>
      </div>
    </FilterCard>
  );
}