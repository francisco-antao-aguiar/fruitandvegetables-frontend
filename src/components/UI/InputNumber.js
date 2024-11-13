import { useState } from "react";
import './InputNumber.css';

export default function InputNumber(props) {
  const [value, setValue] = useState(props.children ? props.children.toString() : '0');

  function onChangeHandler(e) {
    const value = e.target.value;
    setValue(amountFormatter(value, 'kg'));
  };

  function onBlurHandler() {
    props.onChange(+value);
  };

  function decreaseNumberHandler() {
    let decreasedValue = +value - 1;
    if (decreasedValue > 0) {
      setValue(decreasedValue.toString());
    }
    else {
      decreasedValue = 0;
    }
    setValue(decreasedValue.toString());
    props.onChange(+decreasedValue);
  };

  function increaseNumberHandler() {
    let increasedValue = +value + 1;
    if (increasedValue < 100) {
      setValue(increasedValue.toString());
    }
    else {
      if (props.measureQuantity.toLowerCase() === 'kg') {
        increasedValue = 99.99;
      }
      else if (props.measureQuantity.toLowerCase() === 'un') {
        increasedValue = 99;
      }
    }
    setValue(increasedValue.toString());
    props.onChange(+increasedValue);
  };

  function amountFormatter(price, measureQuantity) {
    if (measureQuantity === 'kg') {
      let targetValue = price.replace(',', '.'); // replace comma with dot
      targetValue = targetValue.replace(/[^\d.]/g, ''); // remove all non digits and non dot
      const charIndex = targetValue.indexOf('.');
      let wholeNumber;
      let decimal = '';
      if (charIndex === -1) {
        if(targetValue.length<=2){
          wholeNumber = targetValue;
        }
        wholeNumber = targetValue.slice(targetValue.length - 2);
      }
      else {
        wholeNumber = targetValue.slice(0, charIndex);
        decimal = targetValue.slice(charIndex, charIndex + 3);
        if (wholeNumber.length > 2) {
          wholeNumber = targetValue.slice(charIndex - 2, charIndex);
        }
      }
      targetValue = wholeNumber + decimal; // keep only 2 digits after dot
      targetValue = targetValue.replace(/\./g, (s, i) => i > charIndex ? '' : s);  // remove all dots except the first one
      return targetValue === '' ? '0' : targetValue;
    }
    if (measureQuantity === 'un') {
      return price.replace(/[^\d]/g, ''); // remove all non digits
    }
    return '0';
  };

  return (
    <div className={"number-input-container " + props.className}>
      <div className='decrease-number-input'
        onClick={decreaseNumberHandler}>-</div>
      <input className='number-input'
        type="text"
        inputMode="decimal"
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
        value={value}
        />
      <div className='increase-number-input'
        onClick={increaseNumberHandler}
      >+</div>
    </div>
  );
}