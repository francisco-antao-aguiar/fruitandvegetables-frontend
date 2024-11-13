import { useContext, useState } from 'react';
import Resizer from 'react-image-file-resizer';
import './UploadProduct.css';
import InputText from '../../../UI/InputText';
import Button from '../../../UI/Button';
import ProductsContext from '../../../../store/fruit-and-vegetables/products-context';
import ImagesContext from '../../../../store/fruit-and-vegetables/images-context';

const measureQuantityOptions = [
  { id: 'kg', name: 'Kilogram' },
  { id: 'un', name: 'Unit' },
];

export default function UploadProduct(props) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [measureQuantity, setMeasureQuantity] = useState('');
  const [image, setImage] = useState('');

  const productContext = useContext(ProductsContext);
  const imagesContext = useContext(ImagesContext);

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        360,
        360,
        'jpeg',
        50,
        0,
        (uri) => {
          resolve(uri);
        },
        'base64'
      );
    });

  const resizeFileHandler = async (event) => {
    try {
      const file = event.target.files[0];
      const image = await resizeFile(file);
      setImage(image);
    } catch (err) {
      console.log(err);
    }
  };

  const onChangeNameHandler = (e) => {
    setName(e.target.value.trim());
  };

  const onChangePriceHandler = (e) => {
    setPrice(priceformatter(e.target.value));
  };

  function measureQuantitiesHandler(e) {
    setMeasureQuantity(e.target.id);
  }

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[arr.length - 1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  async function addProduct() {
    if (name === '') {
      return;
    }
    if (+price === 0 || +price === 'NaN') {
      return;
    }
    if (!measureQuantity || measureQuantity === '') {
      return;
    }
    if (!image || image === '') {
      return;
    }
    let formattedMeasureQuantity;
    if (measureQuantity === 'addkg') {
      formattedMeasureQuantity = 'kg'
    }
    else if (measureQuantity === 'addun') {
      formattedMeasureQuantity = 'un'
    }
    const formData = new FormData();
    //formData.append('image', b64toBlob(image.slice(23)));
    formData.append('image', dataURLtoFile(image, 'file.jpeg'), 'file.jpeg');
    try {
      const responseUploadImage = await fetch('http://localhost:8080/upload-image', {
        method: 'POST',
        body: formData,
      });
      const response = await responseUploadImage.json();
      await fetch('http://localhost:8080/add-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name,
          price: price,
          measureQuantity: formattedMeasureQuantity,
          currency: 'euro',
          imageId: response.imageId
        }),
      });
      updateImages();
      productContext.fetchProducts();
    } catch (error) {
      console.error('Error:', error);
    }
    props.close();
  }

  function updateImages() {
    const images = imagesContext.images;
    let lastKeyInMap = Array.from(images.keys()).pop();
    imagesContext.setImages(images.set(lastKeyInMap + 1, image.slice(23)));
  }


  const priceformatter = (price) => {
    let targetValue = price.replace(',', '.'); // replace comma with dot
    targetValue = targetValue.replace(/[^\d.]/g, ''); // remove all non digits and non dot
    const charIndex = targetValue.indexOf('.');
    targetValue = targetValue.slice(0, charIndex + 3); // keep only 2 digits after dot
    targetValue = targetValue.replace(/\./g, (s, i) => i > charIndex ? '' : s);  // remove all dots except the first one
    return targetValue;
  };

  return (
    <>
      <h2>Add Product:</h2>
      <div className='upload-product'>
        <div className='others-container'>
          <div>
            <label>Product Name</label>
            <InputText
              type='text'
              placeholder=''
              onChange={onChangeNameHandler}
              value={name} />
          </div>
          <div>
            <label>Price</label>
            <InputText
              type='text'
              inputMode='decimal'
              placeholder='e.g. 1.23'
              onChange={onChangePriceHandler}
              value={price} />
          </div>
          <div>
            <label>Measure Quantity</label>
            <div className='measure-quantity-filter-options-field'>
              {measureQuantityOptions.map((elem) => {
                return (
                  <div key={elem.id}>
                    <input type='radio' id={'add' + elem.id} name='measureQuantity' onClick={measureQuantitiesHandler} />
                    <label htmlFor={'add' + elem.id}>{elem.name}</label>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className='image-container'>
          <input
            type='file'
            title=' '
            onChange={resizeFileHandler}
            id='image_uploads'
            name='image_uploads'
            accept='.jpg, .jpeg, .png'
            multiple />
          <img src={image} alt='' width='180' height='180' />
        </div>
      </div>
      <Button className='confirm-upload-image' onClick={addProduct}>Confirm</Button>
    </>
  );
}