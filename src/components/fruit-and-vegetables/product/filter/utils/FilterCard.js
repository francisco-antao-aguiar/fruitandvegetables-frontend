import './FilterCard.css';

export default function FilterCard(props) {
  return (
    <div className={'filter-card ' + props.className}>
      <label>
        {props.label}
      </label>
      <div className='filter-card-label'></div>
      {props.children}
    </div>
  );
}