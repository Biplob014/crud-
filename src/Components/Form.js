import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Form = (props) => {
  const { btnTxt, selecteduser, getInputData } = props;
  const [user, setUser] = useState({ username: "", email: "" });

  // handle Change
  const handleChange = (event) => {
    const selectedField = event.target.name;
    const selectedFieldValue = event.target.value;
    setUser((previousUser) => {
      return { ...previousUser, [selectedField]: selectedFieldValue };
    });
  };

  // handle Submit
  const handleSubmit = (event) => {
    event.preventDefault();
    getInputData(user);
    setUser({ username: "", email: "" });
  };

  // for update
  useEffect(() => {
    setUser({
      username: selecteduser.username,
      email: selecteduser.email,
    });
  }, [selecteduser]);

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="user">User Form</h1>
      <div>
        <label htmlFor="name">User Name :</label>
        <input
          type="text"
          placeholder="Enter your name"
          id="name"
          name="username"
          value={user.username}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email">User Email :</label>
        <input
          type="email"
          placeholder="Enter your email"
          id="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btnCrud">
        {btnTxt}
      </button>
    </form>
  );
};

Form.defaultProps = {
  selecteduser: {
    username: "",
    email: "",
  },
};

export default Form;
