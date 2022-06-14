import React, { useEffect, useState } from "react";
import Api from "../../utils/Api";
import { helpHttp } from "../helpers/helpHttp";
import "../../assets/css/MenuView.css";

export const newOrder = [];

const MenuView = ({setLoad}) => {
  const [products, setProducts] = useState([]);
  const [option, setOption] = useState('');
  const [typeMn, setTypeMn] = useState([]);  
  const [order, setOrder] = useState([]);
  let [price, setPrice] = useState(0);
  console.log(price)

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
              }
          }});
          setProducts(res);
        } else {
          setProducts(null);
        }
      });
  }, []);


  const agregarProducto = (item) => {
    if(order.find(({product})=> product.id === item.product.id)){
      let findProduct = order.findIndex(({product})=> product.id === item.product.id);
      order[findProduct].qty ++
      let findProd = typeMn.findIndex(({product})=> product.id === item.product.id);
      typeMn[findProd].qty = newOrder[findProduct].qty
    }else{
      newOrder.push({...item, qty: 1});
      setOrder(newOrder)
    }
    // setLoad(true)
    setPrice(price += item.product.price)
    console.log(newOrder);
  };

  const borrarProducto = (item) => {
    let delProduct = order.findIndex(({product})=> product.id === item.product.id);
    if(order[delProduct].qty > 1){
      order[delProduct].qty --
      let findProd = typeMn.findIndex(({product})=> product.id === item.product.id);
      typeMn[findProd].qty = newOrder[delProduct].qty
    }else{
      newOrder.splice(delProduct, 1);
    }
    setPrice(price -= item.product.price)
    console.log(newOrder);
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
        <label htmlFor="SelectMenu">Seleccionar Menu</label>
        <select onChange={(e) => setOption(e.target.value)} onClick={()=>{elegirMenu()}} name="opciones">
          <option defaultValue={setOption}>Elija una opción</option>
          <option key="Alm" value="Almuerzo">
            Almuerzo
          </option>
          <option key="Des" value="Desayuno">
            Desayuno
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
                <h3> {item.qty} </h3>

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
