import React, {useState} from "react";
import Navbar from "../shared/Navbar";
import MenuView from "./MenuView";
import OrdersApi from "./OrdersApi";
import "../../assets/css/pruebaCruds.css";

const PruebaCruds = () => {
  let [order, setOrder] = useState([]);
  let [price, setPrice] = useState(0);


  return (
    <>
      <Navbar />
      <div className="styleCruds">
        <div className="contentCrud">
          <MenuView  
          order={order} 
          setOrder={setOrder}
          price={price}
          setPrice={setPrice}/>
          <OrdersApi 
          price={price}
          setPrice={setPrice}
          order={order}
          setOrder={setOrder}/>
        </div>
      </div>
    </>
  );
};

export default PruebaCruds;
