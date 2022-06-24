import React, {useEffect, useState} from "react";
import Api from "../../utils/Api";
import { helpHttp } from "../helpers/helpHttp";
import Navbar from "../shared/Navbar";
import TableRowOrders from "./TableRowOrders";

const TableOrders = ({ setDataToEdit, deleteData }) => {

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  console.log(data)

  let url = `${Api}/orders`;

  useEffect(() => {
    helpHttp()
      .get(url)
      .then((res) => {
        if (!res.err) {
          setData(res);
          setError(null);
        } else {
          setError(res);
        }
      });
  }, []);

  return (
    <div>
      <Navbar/>
      <h3>Esta es tu Orden</h3>
      <table>
        <thead>
          <tr>
            <th>Name Client</th>
            <th>Order</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.length === 0 ? (
            <tr>
              <td colSpan="3">Not data</td>
            </tr>
          ) : (
            data?.map((el) => (
              <TableRowOrders
                key={el.id}
                el={el}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableOrders;
