import React, { useState, useEffect } from "react";
import Api from "../../utils/Api";
import { helpHttp } from "../helpers/helpHttp";
import Loader from "../Loader/Loader";
import Message from "../Loader/Message";
import GenericNavbar from "../shared/GenericNavbar";
import CreateUsers from "./CreateUsers";
import ManageUsers from "./ManageUsers";
import "../../assets/css/TableOrders.css";
import { userToken } from "../Login/Login";

const AdminColaborator = () => {
  const [colaborators, setColaborators] = useState([]);
  const [editColaborator, setEditColaborator] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  let url = `${Api}/users`;

  useEffect(() => {
    setLoading(true);
    getColaborators();
  }, []);

  const getColaborators = () => {
    helpHttp()
      .get(url)
      .then((res) => {
        if (!res.err) {
          setColaborators(res);
          setError(null);
        } else {
          setColaborators(null);
          setError(res);
        }
        setLoading(false);
      })
      .catch(console.error);
  }

  const createData = async (data) => {
    await helpHttp()
      .post(url, {headers: {"Content-Type": "application/json",
        authorization: userToken},
        body: data,
      })
      .then((res) => {
        if (!res.err) { 
          console.log(res)         
        } else {
          setError(res);
        }
      });
      getColaborators()
  };

  const updateData = (data) => {
    let urlUpdate = `${Api}/users/${data.id}`
    helpHttp()
      .patch(urlUpdate, {
        body: data,
      })
      .then((res) => {
        if (!res.err) {
          let newData = colaborators.map((colaborator) =>
            colaborator.id === data.id ? data : colaborator
          );
          setColaborators(newData)
        } else {
          setError(res);
        }
      });
  };

  const deleteData = (id) => {
    let isDelete = window.confirm(`¿Estás seguro de eliminar el registro con el id '${id}'?`)
   
    if(isDelete){
      let endPoint =`${Api}/users/${id}`
      helpHttp()
      .del(endPoint, {headers:{'Content-Type': 'application/json'}})
      .then(res => {
        if(!res.err){
          let newData = colaborators.filter((colaborator)=> colaborator.id !== id);
          setColaborators(newData)
        }else{
          setError(res)
        }
      })
    }else{
      return;
    }
  }

  return (
    <>
      <div>
        <GenericNavbar />
      </div>
      <div className="styleCrudsOrders">
        <CreateUsers
          createData={createData}
          updateData={updateData}
          editColaborator={editColaborator} 
          setEditColaborator={setEditColaborator}
        />
        {loading && <Loader />}
        {error && (
          <Message
            msg={`Error ${error.status}:${error.statusText}`}
            bgColor="#dc3545"
          />
        )}
        {colaborators && (
          <ManageUsers
            colaborators={colaborators}
            setEditColaborator={setEditColaborator}
            deleteData={deleteData}
          />
        )}
      </div>
    </>
  );
};

export default AdminColaborator;
