import axios from "axios";
import React, { useState, useEffect } from "react";
import Form from "./Form";

const url = "https://rest-api-without-db.herokuapp.com/users/";
const Index = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState(null);
  // for update
  const [selecteduser, setSelecteduser] = useState({ username: "", email: "" });
  const [selectedUserid, setSelecteduserid] = useState("");
  const [updataFlag, setUpdateFlag] = useState(false);

  // fetching data
  const fetchData = async (config) => {
    const response = await axios(config);
    return response;
  };
  const getAllData = () => {
    fetchData({ url })
      .then((res) => setData(res.data.users))
      .catch((error) => setError(error))
      .finally(() => setIsloading(false));
  };
  useEffect(() => {
    getAllData();
  }, []);

  // handle getting data from form and posting
  const handleGetInputData = (user) => {
    fetchData({ url, method: "POST", data: user })
      .then(() => getAllData())
      .catch((error) => setError(error));
  };

  // handle delete
  const handleDelete = (id) => {
    fetchData({ url: `${url}/${id}`, method: "DELETE" })
      .then(() => getAllData())
      .catch((error) => setError(error));
  };

  // handle edit
  const handelEdit = (id) => {
    setUpdateFlag(true);
    setSelecteduserid(id);
    const editedData = data.filter((data) => data.id === id);
    setSelecteduser({
      username: editedData[0].username,
      email: editedData[0].email,
    });
  };

  // handle update
  const handleUpdate = (user) => {
    fetchData({ url: `${url}/${selectedUserid}`, method: "PUT", data: user })
      .then(() => {
        getAllData();
        setUpdateFlag(false);
      })
      .catch((error) => setError(error));
  };

  const loading = <h2>Please wait, Data is loading ....</h2>;
  return (
    <>
      <h1>CRUD Operation</h1>
      <hr />

      {updataFlag ? (
        <Form
          selecteduser={selecteduser}
          getInputData={handleUpdate}
          btnTxt={"Update User"}
        />
      ) : (
        <Form getInputData={handleGetInputData} btnTxt={"Add User"} />
      )}

      {isLoading && loading}
      {error && <h2>{error.message}</h2>}
      <section>
        {data &&
          data.map((data) => {
            const { id, username, email } = data;
            return (
              <article key={id} className="card">
                <h2>{username}</h2>
                <h3>{email}</h3>
                <button className="btnCrud" onClick={() => handelEdit(id)}>
                  Edit
                </button>
                <button className="btnCrud" onClick={() => handleDelete(id)}>
                  Delete
                </button>
              </article>
            );
          })}
      </section>
    </>
  );
};

export default Index;
