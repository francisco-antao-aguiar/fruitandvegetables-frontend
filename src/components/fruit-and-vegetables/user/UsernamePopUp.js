import Popup from "reactjs-popup";
import Card from "../../UI/Card";
import './UsernamePopUp.css';
import InputText from "../../UI/InputText";
import UsernameContext from "../../../store/fruit-and-vegetables/username-context";
import { useContext } from "react";
import Button from "../../UI/Button";
import { useState } from "react";

export default function UsernamePopUp(props) {

  const [inputValue, setInputValue] = useState('');

  const usernameContext = useContext(UsernameContext);

  function changeUserHandler(event, close) {
    usernameContext.setUsername(inputValue);
    close();
  }

  function onBlurHandler(event) {
    setInputValue(event.target.value);
  }

  return (
    <Popup trigger={props.children}
      modal nested>
      {
        close => (
          <div className='user-pop-up-modal'>
            <div className='user-pop-up-background' onClick={() => close()}>
            </div>
            <Card className='user-pop-up-content'>
              <h3>Current Username:</h3>
              <InputText className='user-input'
                type="text"
                onBlur={onBlurHandler}
                placeholder={usernameContext.username} />
              <Button className='user-confirm-button'
                onClick={(event) => changeUserHandler(event, close)}
              >Confirm
              </Button>
            </Card>
          </div>
        )
      }
    </Popup>
  );
}
