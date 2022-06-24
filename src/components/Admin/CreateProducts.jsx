import React, {useState, useEffect} from 'react';
import '../../assets/css/FormOrders.css'
import '../../assets/css/TableOrders.css'

const intialForm = {
      "name": "",
      "price": 0,
      "image": "",
      "type": "",
      "dateEntry": new Date()
}

const CreateProducts = ({createProducts, updateProducts, editProduct, setEditProduct}) => {

    const [form, setForm] = useState(intialForm);

    useEffect(() => {
        if(editProduct){
            setForm(editProduct)
        }else{
            setForm(intialForm)
        }
    }, [editProduct]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
            dateEntry: new Date()
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!form){
            alert('Incomplete data!')
            return
        }

        if(!form.id){
            createProducts(form)
            alert('Successful process!')
            handleReset()
        }else{
            updateProducts(form)
            handleReset()
            alert('Product successfully updated!')
        }
    };

    const handleReset = (e) => {
        setForm(intialForm)
        setEditProduct(null)
    };


  return (
    <>
        <h3 className='Title'>{editProduct ? 'Edit Product' : 'Register Product'}</h3>
        <form className='Form-order' onSubmit={handleSubmit} >
            <label htmlFor="name">Product Name: </label>
            <input 
            type="text"
            name='name'
            placeholder='Product Name'
            onChange={handleChange}
            value={form.name} 
            />
            <label htmlFor="price">Price: </label>
            <input 
            type="text"
            name='price'
            placeholder='Price'
            onChange={handleChange}
            value={form.price} 
            />
            <label htmlFor="image">Insert URL of product: </label>
            <input 
            type="text"
            name='image'
            placeholder='Insert URL of product'
            onChange={handleChange}
            value={form.image} 
            />
            <label htmlFor="type">Type: </label>
            <input 
            type="text"
            name='type'
            placeholder='Type Menu'
            onChange={handleChange}
            value={form.type} 
            />
            <input 
            type="submit" 
            value={editProduct ? 'Edit Product' : 'Register Product'}
            onClick={handleSubmit} />
            <input 
            type="reset" 
            value='Clear'
            onClick={handleReset} />
        </form>
    </>
  )
}

export default CreateProducts