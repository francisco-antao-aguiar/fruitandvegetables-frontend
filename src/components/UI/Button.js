import './Button.css';

export default function Button(props) {
  return (
    <div className={'custom-button ' + props.className} 
      onClick={props.onClick}
      >
      {props.children}
    </div>
  );
}