import React, { useState, useEffect } from "react";
import Api from "../../utils/Api";
import { helpHttp } from "../helpers/helpHttp";
import Loader from "../Loader/Loader";
import Message from "../Loader/Message";
import GenericNavbar from "../shared/GenericNavbar";
import CreateProducts from "./CreateProducts";
import ManageProducts from "./ManageProducts";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  let url = `${Api}/products`;

  useEffect(() => {
    setLoading(true);
    helpHttp()
      .get(url)
      .then((res) => {
        if (!res.err) {
          setProducts(res);
          setError(null);
        } else {
          setProducts(null);
          setError(res);
        }
        setLoading(false);
      })
      .catch(console.error);
  }, [url]);

  const createProducts = (data) => {
    helpHttp()
      .post(url, {
        body: data,
      })
      .then((res) => {
        if (!res.err) {
          setProducts([...products, res]);
        } else {
          setError(res);
        }
      });
  };

  const updateProducts = (data) => {
    let urlUpdate = `${url}/${data.id}`;
    helpHttp()
      .patch(urlUpdate, {
        body: data,
      })
      .then((res) => {
        if (!res.err) {
          let newData = products.map((product) =>
            product.id === data.id ? data : product
          );
          setProducts(newData);
        } else {
          setError(res);
        }
      });
  };

  const deleteProducts = (id) => {
    let isDelete = window.confirm(
      `¿Estás seguro de eliminar el producto con el id '${id}?`
    );

    if (isDelete) {
      let endPoint = `${url}/${id}`;
      helpHttp()
        .del(endPoint, { header: { "Content-Type": "application.json" } })
        .then((res) => {
          if (!res.err) {
            let newData = products.filter((product) => product.id !== id);
            setProducts(newData);
          } else {
            setError(res);
          }
        });
    } else {
      return;
    }
  };

  return (
    <>
      <div>
        <GenericNavbar />
      </div>
      <div>
        <CreateProducts
          createProducts={createProducts}
          updateProducts={updateProducts}
          editProduct={editProduct}
          setEditProduct={setEditProduct}
        />
        {loading && <Loader />}
        {error && (
          <Message
            msg={`Error ${error.status}:${error.statusText}`}
            bgColor="#dc3545"
          />
        )}
        <ManageProducts
          products={products}
          setEditProduct={setEditProduct}
          deleteProducts={deleteProducts}
        />
      </div>
    </>
  );
};

export default AdminProducts;
