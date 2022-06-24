import React from 'react'
import { Link } from 'react-router-dom'
import colaborators from '../../assets/img/colaborators.png'
import products from '../../assets/img/products.png'
import '../../assets/css/ManageOptions.css'
import GenericNavbar from '../shared/GenericNavbar'

const ManageOptions = () => {

  return (
    <div className='ManageOptions'>
        <div>
            <GenericNavbar />
        </div>
        <section className='ManageOptions-body'>
            <Link to='/AdminColaborator'  className='btn'>Admin colaborator
                <img src={colaborators} alt="Colaborators" />
            </Link>

            <Link to='/AdminProducts' className='btn'>Admin Products
                <img src={products} alt="Products" />
            </Link>
        </section>
    </div>
  )
}

export default ManageOptions