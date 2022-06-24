import React, {useState, useEffect} from 'react'
import '../../assets/css/FormOrders.css'
import '../../assets/css/TableOrders.css'
import { FormGroup, Label, Input } from 'reactstrap'


const intialForm = {
    email: '',
    password: '',
    roles: {
        admin:false
    }
}

const CreateUsers = ({createData, updateData, editColaborator, setEditColaborator}) => {

const [form, setForm] = useState(intialForm);
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

useEffect(() => {
   if(editColaborator){
       setForm(editColaborator);
       setEmail(editColaborator.email)
       setPassword(editColaborator.password)
   }else{
    setForm(intialForm)
   }
}, [editColaborator])


const handleChange = (e) => {
    setForm({
        ...form,
        email: email,
        password: password,
        roles: {
            admin: e.target.value==="true"? true : false
        },
    })
    
}

const handleSubmit = (e) => {
    e.preventDefault();
    if(!form){
        alert('Incomplete data!')
        return
    }

    if(!form.id){
        createData(form)
        alert('Successful registration!')
        handleReset()
    }else{
        updateData(form)
        handleReset()
        alert('User successfully updated!')
    }
}


const handleReset = () => {
    setForm(intialForm)
    setEmail('')
    setPassword('')
    setEditColaborator(null)
}


  return (
    <>
        <h3 className='Title'>{editColaborator ? 'Edit Users' : 'Create User'}</h3>
        <form className='Form-order' onSubmit={handleSubmit}>
            <label htmlFor="user">User Name: </label>
            <input 
            type="email" 
            name="email" 
            placeholder='User Name'
            onChange={(e) => {setEmail(e.target.value)}}
            value={email}
            />
            <label htmlFor="password"></label>
            <input 
            type="password" 
            name="password" 
            placeholder='Password' 
            onChange={(e) => {setPassword(e.target.value)}}
            value={password}
            />
            <FormGroup>
                <Input 
                id='rol2'
                type="radio"
                name='roles' 
                value= {false}
                onChange={(e) => {handleChange(e)}}
                checked={form.roles.admin === false ? true : false}
                  />
                <Label htmlFor="rol2">Not is Admin</Label>
                <Input
                 id='rol1'
                 type="radio" 
                 name='roles' 
                 value= {true}
                 onChange={(e) => {handleChange(e)}}
                 checked={form.roles.admin === true ? true : false}
                 />
                 <Label>Is Admin</Label>
            </FormGroup>
            <input type="submit" value={editColaborator ? 'Edit Users' : 'Create User'} onClick={handleSubmit}/>
            <input type="reset" value='Clear' onClick={handleReset}/>
        </form>
    </>
  )
}

export default CreateUsers