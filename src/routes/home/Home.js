
import './Home.css';
import fruitAndVegetables from '../../assets/fruit-and-vegetables.jpg';
import inProgress from '../../assets/in-progress.jpg'
import ProjectCard from './ProjectCard';

const projects = [
  {
    id: 1,
    src: fruitAndVegetables,
    alt: 'Fruit and Vegetables App',
    path: '/fruit-and-vegetables-shop',
  },
  {
    id: 2,
    src: inProgress,
    alt: 'In Progress',
    path: '/missing-page',
  },
  {
    id: 3,
    src: inProgress,
    alt: 'Fruit and Vegetables App',
    path: '/missing-page',
  },
];

function Home() {
  return (
    <div className='home-page'>
      <h1>franciscoder.com</h1>
      <h4>a pocket-sized web world by francisco</h4>
      <div className='projects-container'>
        {projects.map((element) =>
          <ProjectCard
            key={element.id}
            src={element.src}
            alt={element.alt}
            path={element.path}
          ></ProjectCard>
        )}
      </div>
    </div>
  );
};
export default Home;