import React from "react";

const TodoList = () => {
  return (
    <>
      <div className="row">
        <h1>Tasks</h1>
        <ul className="list-group ">
          <li className="list-group-item bg-info d-flex justify-content-between align-items-center">
            <div className="d-flex flex-column">
              <span className="fw-bold">title</span>
              <span>description</span>
            </div>
            <div className=" d-flex gap-2">
                <button className="btn btn-warning">Edit</button>
                <button className="btn btn-danger">Delete</button>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default TodoList;
