import { useState } from 'react';
import './FilterOptions.css';
import FilterCard from '../fruit-and-vegetables/product/filter/utils/FilterCard';

export default function FilterOptions(props) {
  const [options, setOptions] = useState([]);

  function onChangeOptionHandler(e) {
    let newOptions = options;
    if (e.target.checked) {
      newOptions.push(e.target.id);
    }
    else {
      newOptions = newOptions.filter(elem => elem !== e.target.id);
    }
    setOptions(newOptions);
    props.onFilter(newOptions);
  }



  return (
    <FilterCard label={props.label}>
      <div className='filter-options-field'>
        {props.options.map((elem) => {
          return (
            <div key={elem.id}>
              <input type={props.type ? props.type : "checkbox"} id={elem.id} name={elem.id} onClick={onChangeOptionHandler} />
              <label htmlFor={elem.id}>{elem.name}</label>
            </div>
          );
        })}
      </div>
    </FilterCard>
  );
}