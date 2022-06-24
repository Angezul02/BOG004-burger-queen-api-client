import React, { useEffect, useState } from "react";
import { helpHttp } from "../helpers/helpHttp";
import FormOrders from "./FormOrders";
import Api from "../../utils/Api";
import Loader from "../Loader/Loader";
import Message from "../Loader/Message";


const OrdersApi = ({price, setPrice, order, setOrder}) => {
  const [dbOrders, setdbOrders] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  let api = helpHttp();
  let url = `${Api}/orders`;

  useEffect(() => {
    setLoading(true);
    helpHttp()
      .get(url)
      .then((res) => {
        if (!res.err) {
          setdbOrders(res);
          setError(null);
        } else {
          setdbOrders(null);
          setError(res);
        }
        setLoading(false);
      });
  }, []);

  const createData = (data) => {
    api
      .post(url, {
        body: data
      })
      .then((res) => {
        if (!res.err) {
          setdbOrders([...dbOrders, res]);
        } else {
          setError(res);
        }
      });
  };

  return (
    <div>
      
      <h2>Make your Order</h2>
      
      <FormOrders
        createData={createData}
        price={price}
        setPrice={setPrice}
        order={order}
        setOrder={setOrder}
      />
      {loading && <Loader />}
      {error && (
        <Message
          msg={`Error ${error.status}:${error.statusText}`}
          bgColor="#dc3545"
        />
      )}
    </div>
  );
};

export default OrdersApi;
