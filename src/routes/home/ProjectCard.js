import { Link } from "react-router-dom";
import './ProjectCard.css';
import Card from "../../components/UI/Card";

export default function ProjectCard(props) {
  return (
    <Link className='project-card-link' to={props.path}>
      <Card className='project-card'>
        <img src={props.src} alt={props.alt} />
      </Card>
    </Link>
  );
}