import React, { useEffect, useState } from "react";

const Todo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [message, sentMessage] = useState("");
  const [error, setError] = useState("");
  const apiUrl = "http://localhost:8000";
  const handleSubmit = () => {
    setError("");
    if (title.trim() !== "" && description.trim() !== "") {
      fetch(apiUrl + "/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      })
        .then((res) => {
          if (res.ok) {
            // Assuming todos is an array of objects
            setTodos([...todos, { title, description }]);

            // Assuming setMessage is the correct function to show success
            sentMessage("Item Added Successfully");

            setTimeout(() => {
              sentMessage("");
            }, 2000);
          } else {
            setError("Unable to create Todo Item");
          }
        })
        .catch(() => {
          setError("Unable to create Todo Item");
        });
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    fetch(apiUrl + "/todos")
      .then((res) => res.json())
      .then((res) => {
        setTodos(res);
      });
  };

  return (
    <>
      <div className="row bg-success p-3 text-light ">
        <h1>ToDo Project With MERN Stack</h1>
      </div>
      <div>
        <h3>Add Item</h3>
        {message && <p className="text-success">{message}</p>}
        <div className="form-group d-flex gap-2">
          <input
            type="text"
            value={title}
            className="form-control"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={handleSubmit} className="btn btn-dark">
            Submit
          </button>
        </div>
        {error && <p className="text-danger">{error}</p>}
      </div>
      <div className="row">
        <h1>Tasks</h1>
        <ul className="list-group ">
          {todos.map((item) => (
            <li className="list-group-item bg-info d-flex justify-content-between align-items-center">
              <div className="d-flex flex-column">
                <span className="fw-bold">{item.title}</span>
                <span>{item.description}</span>
              </div>
              <div className=" d-flex gap-2">
                <button className="btn btn-warning">Edit</button>
                <button className="btn btn-danger">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Todo;
