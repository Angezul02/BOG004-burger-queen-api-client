import React, { useState } from "react";
import Api from "../../utils/Api";
import { helpHttp } from "../helpers/helpHttp";
import { userToken } from "../Login/Login";
import Clientorders from "./Clientorders";

const TableRowOrders = ({ el, updateOrders }) => {

  let { client, products, id } = el;
  const [statusOrder, setStatusOrder] = useState({});

  let initTime = new Date(el.dateEntry)
  let finalyTime = new Date(el.dateProcessed)

  let totalTimeOrder = ((finalyTime.getTime() - initTime.getTime())/60000).toFixed(2)



  const updateStatus = () => {
    let url = `${Api}/orders/${id}`;
    const data = {
      status: "delivered",
      dateProcessed: new Date(),
    };
    helpHttp()
    .patch(url, {body:data})
      .then((resp) => {
        setStatusOrder(resp);
        updateOrders();
      });
  };

  return (
    <>
      <tr>
        <td>{client}</td>
        <td>
          <Clientorders products={products} />
        </td>
        <td>
            <button onClick={updateStatus}>Delivered</button>
            <div >Total order time: {totalTimeOrder} min</div>
        </td>
      </tr>
    </>
  );
};

export default TableRowOrders;