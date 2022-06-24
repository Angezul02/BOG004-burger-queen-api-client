import React, { useEffect, useState } from "react";
import Api from "../../utils/Api";
import { helpHttp } from "../helpers/helpHttp";
import "../../assets/css/MenuView.css";

export const newOrder = [];

const MenuView = ({order, setOrder, price, setPrice}) => {
  const [products, setProducts] = useState([]);
  const [option, setOption] = useState('');
  const [typeMn, setTypeMn] = useState([]);  

  
  useEffect(() => {
    helpHttp()
      .get(`${Api}/products`)
      .then((res) => {
        if (!res.err) {
          res = res.map((item) => {
            return {
              "qty": 0,
              "product":{
                ...item          
              },
            }});
            setProducts(res);
          } else {
            setProducts(null);
          }
        });
      }, []);
      
      
  const agregarProducto = (item) => {  
    if(order.find(({product})=> product.id === item.product.id)){
      console.log('PRODUCTOS EXISTENTES', item.product.id)
      let findProductIndex = typeMn.findIndex(({product})=> product.id === item.product.id);
      let orderIndex = order.findIndex(({product})=> product.id === item.product.id);
      typeMn[findProductIndex].qty = order[orderIndex].qty+1
      const newOrder3 = order.map((element) => {
        console.log('IDS',element.product.id, item.product.id);
        if(element.product.id === item.product.id){
          return {
            "qty": element.qty+1,
            "product":{
              ...element.product,
              "price": (element.qty+1) * item.product.price
            }
          }
        }else{
          return element
        }
      })
      setOrder([...newOrder3])
    }else{
      setOrder([...order, {...item, qty: 1}])
    }
    setPrice(price += item.product.price)
    console.log(price);
  };
  console.log('ORDER',order)

  const borrarProducto = (item) => {
    let delProduct = order.findIndex(({product})=> product.id === item.product.id);
    if(order[delProduct].qty > 1){
      order[delProduct].qty --
      let findProd = typeMn.findIndex(({product})=> product.id === item.product.id);
      typeMn[findProd].qty = order[delProduct].qty
      const newOrder3 = order.map((element) => {
        if(element.product.id === item.product.id){
          return {
            "qty": element.qty,
            "product":{
              ...element.product,
              "price": (element.qty) * item.product.price
            }
          }
        
    }else{
      return element
    }
  })
  setOrder([...newOrder3])
  }else{
      order.splice(delProduct, 1);
    }
    setPrice(price -= item.product.price)
    console.log(price);
  }

  const elegirMenu = () => {
    if(option === 'Almuerzo'){
        let resultado = products.filter(({product}) => product.type === "Almuerzo");
        setTypeMn(resultado)
    }else if(option === 'Desayuno'){
        let resultado = products.filter(({product}) => product.type === "Desayuno");
        setTypeMn(resultado)
    }
  }

  return (
    <>
        <label htmlFor="SelectMenu">Select Menu</label>
        <select onChange={(e) => setOption(e.target.value)} onClick={()=>{elegirMenu()}} name="opciones">
          <option defaultValue={setOption}>Select a option</option>
          <option key="Alm" value="Almuerzo">
            Luch
          </option>
          <option key="Des" value="Desayuno">
            Breakfast
          </option>
        </select>
        <hr />
      <div className="viewMenu">
        {typeMn.map((item) => (
          <div className="optionsMenu" key={item.product.id}>
            <div className="bodyMenu">
              
              <h3>{item.product.name}</h3>
              <h4>Price: $ {item.product.price}</h4>
                          
              <div className="btn-options">
                <button
                  className="btn-add"
                  onClick={() => {
                    agregarProducto(item); 
                  }}
                >
                  +
                </button>
                <h3> {order.length? item.qty : 0} </h3>
                <button
                  className="btn-delete"
                  onClick={() => {
                    borrarProducto(item); 
                  }}
                >
                  -
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MenuView;
