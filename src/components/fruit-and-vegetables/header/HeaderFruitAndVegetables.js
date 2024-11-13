import './HeaderFruitAndVegetables.css';
import shoppingCard from '../../../assets/shopping-cart.png';
import fruitAndVegetableLogo from '../../../assets/fruit-and-vegetables.jpg';
import uploadImage from '../../../assets/upload-images.webp';
import user from '../../../assets/user-icon.svg';
import search from '../../../assets/search.svg';
import UploadProductPopUp from '../product/upload/UploadProductPopUp';
import UsernamePopUp from '../user/UsernamePopUp';
import ShoppingCartPopUp from '../shopping-cart/ShoppingCartPopUp';
import OrdersPopUp from '../order/OrdersPopUp';
import UsernameContext from '../../../store/fruit-and-vegetables/username-context';
import { useContext } from 'react';

const resolution = '45';

export default function Header(props) {

  const usernameContext = useContext(UsernameContext);

  function isUserAdmin() {
    return 'admin' === usernameContext.username.toLowerCase();
  }

  return (
    <div className='header-fruit-veg'>
      <img src={fruitAndVegetableLogo} alt='fruit-and-vegetable-logo' width="178" height="100" />
      <div className='header-fruit-veg-icons'>
        {isUserAdmin() ?(<UploadProductPopUp>
          <img src={uploadImage} alt='upload-images' width={resolution} height={resolution} />
        </UploadProductPopUp>) : <div/>}
        <OrdersPopUp>
          <img src={search} alt='search' width={resolution} height={resolution} />
        </OrdersPopUp>
        <ShoppingCartPopUp>
          <img src={shoppingCard} alt='shopping-cart' width={resolution} height={resolution} />
        </ShoppingCartPopUp>
        <UsernamePopUp>
          <img src={user} alt='upload-images' width={resolution} height={resolution} />
        </UsernamePopUp>
      </div>
    </div>
  );
}