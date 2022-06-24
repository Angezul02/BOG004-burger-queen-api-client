import React, {useEffect, useState} from "react";
import Api from "../../utils/Api";
import { helpHttp } from "../helpers/helpHttp";
import Navbar from "../shared/Navbar";
import TableRowOrders from '../Waiter/TableRowOrders'

import '../../assets/css/TableOrders.css'

const WaiterOrders = () => {

  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  let url = `${Api}/orders`;

  useEffect(() => {
    helpHttp()
      .get(url)
      .then((res) => {
        if (!res.err) {
          setOrders(res.filter((element) => element.status === "delivering"));;
          setError(null);
        } else {
          setError(res);
        }
      });
  }, []);

  const updateOrders = () => {
    helpHttp()
      .get(url)
      .then((res) => {
        if (!res.err) {
          setOrders(res.filter((element) => element.status === "delivering"));
        } else {
          setError(res);
        }
      });
  };

  return (
    <div>
      <Navbar/>
      <div className="styleCrudsOrders">
        <h3 className="Title">This is your order...</h3>
        <table className="Table-order">
          <thead>
            <tr>
              <th>Name Client</th>
              <th>Order</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="3">Not data</td>
              </tr>
            ) : (
              orders.map((element) => (  
                <TableRowOrders
                  key={element.id}
                  el={element}
                  updateOrders={updateOrders}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WaiterOrders;
