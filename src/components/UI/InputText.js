import './InputText.css'

export default function InputText(props) {
  return(
    <input className={'custom-input ' + props.className}
    type={props.type}
    inputMode={props.inputMode}
    placeholder={props.placeholder}
    onChange={props.onChange}
    onBlur={props.onBlur}
    value={props.value} />
  );
}