import React, { Fragment, useState } from "react";
import { userId } from "../Login/Login";
import "../../assets/css/FormOrders.css";

const initialForm = {
  userId: userId,
  client: "",
  products: [],
  status: "",
  dateEntry: "",
};

const FormOrders = ({ createData, order, price, setPrice, setOrder }) => {
  const [form, setForm] = useState(initialForm);
  let [nameClient, setNameClient] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form) {
      alert("Incomplete data!");
      return;
    }

      form.userId = userId;
      form.products = order;
      form.status = "pending";
      form.dateEntry = new Date();
      form.client = nameClient;

    setForm(form);

    console.log(form);
    createData(form);
    window.confirm("Está seguro de enviar la orden?");
    handleReset();

  };

  const handleReset = () => {
    setForm(initialForm);
    setOrder([]);
    setPrice(0);
    setNameClient(null)
  };

  return (
    <div>
      <form className="Form-order" onSubmit={handleSubmit}>
        <label htmlFor="client">Name Client</label>
        <input
          type="text"
          name="client"
          placeholder="Name Client"
          onChange={(e) => {
            setNameClient(e.target.value);
          }}
        />
        <label htmlFor="table">User id</label>
        <input type="text" 
        name="table" 
        value={form.userId} disabled />
        <table className="Table-order">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
          {order.map((entry, index) => (
            <Fragment key={index}>
              <tbody id="Table-dataOrder">
                <tr>
                  {console.log("PRICE", entry.product.price, index)}
                  <td>{entry.product.name}</td>
                  <td>{entry.product.type}</td>
                  <td>{entry.qty}</td>
                  <td>${entry.product.price}</td>
                </tr>
              </tbody>
            </Fragment>
          ))}
              <tfoot>
                <tr>
                  <th>Total Price</th>
                  <td colSpan={3}>{price}</td>
                </tr>
              </tfoot>
        </table>
        <input type="submit" value="Register" onClick={handleSubmit} />
        <input type="reset" value="Clear" onClick={handleReset} />
      </form>
    </div>
  );
};

export default FormOrders;