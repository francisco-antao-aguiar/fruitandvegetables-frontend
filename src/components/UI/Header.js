import './Header.css';

export default function Header(props) {

  return (
    <div className={'header ' + props.className}>
      {props.src && <img src={props.src} alt='header-logo' width="178" height="100" />}
      {props.children}
    </div>
  );
}