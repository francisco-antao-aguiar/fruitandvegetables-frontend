import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import FruitAndVegetableShopApp from './routes/fruit-and-vegetables-shop-app/FruitAndVegetableShopApp';
import Home from './routes/home/Home';


const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/fruit-and-vegetables-shop', element: <FruitAndVegetableShopApp /> },
  { path: '/*', element: <p>No page</p> },
]);
function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
