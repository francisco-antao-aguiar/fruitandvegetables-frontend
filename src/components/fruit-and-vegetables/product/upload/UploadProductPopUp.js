import Popup from "reactjs-popup";
import Card from "../../../UI/Card";
import UploadProduct from "./UploadProduct";
import './UploadProductPopUp.css';

export default function UploadProductPopUp(props) {

  return (
    <Popup trigger={props.children}
      modal nested>
      {
        close => (
          <div className='upload-image-pop-up-modal'>
            <div className='upload-image-pop-up-background' onClick={() => close()}>
            </div>
            <Card className='upload-image-pop-up-content'>
              <UploadProduct close={close}></UploadProduct>
            </Card>
          </div>
        )
      }
    </Popup>
  );
}
