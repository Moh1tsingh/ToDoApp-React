"use client";
import React, { useState } from "react";

const page = () => {
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [mainTask, setmainTask] = useState([]);
  const [completedTask, setcompletedTask] = useState([]);

  const deleteHandler = (i) => {
    let copyTask = [...mainTask];
    copyTask.splice(i, 1);
    setmainTask(copyTask);
  };

  const [isCompleted, setisCompleted] = useState(false);

  const completeHandler = (i) => {
    setisCompleted(true);
    document.getElementById("CompleteButton").style.display = "none";
    document.getElementById("desc").style.display = "none";
  };

  const submitHandler = (e) => {
    e.preventDefault();

    setmainTask([...mainTask, { title, desc }]);

    settitle("");
    setdesc("");
  };

  let renderTask = <h2>No Task Available</h2>;

  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => {
      return (
        <li key={i} className="flex items-center justify-between">
          <div className="flex justify-between mb-5 w-1/2">
            <h5
              className={`text-xl font-semibold ${
                isCompleted ? "text-green-500" : "text-black"
              }`}
            >
              {t.title}
            </h5>
            <h6 className={`text-lg `} id="desc">
              {t.desc}
            </h6>
          </div>

          <button
            className=" bg-green-400 text-white px-4 py-2 rounded font-bold mb-5"
            id="CompleteButton"
            onClick={() => {
              completeHandler(i);
            }}
          >
            Completed
          </button>

          <button
            className=" bg-red-400 text-white px-4 py-2 rounded font-bold mb-5"
            onClick={() => {
              deleteHandler(i);
            }}
          >
            Delete
          </button>
        </li>
      );
    });
  }

  return (
    <>
      <h1 className="  bg-black  text-white p-5 text-4xl font-bold text-center">
        My Todo List
      </h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          className="text-2xl border-zinc-800 border-2 m-5 px-4 py-2"
          placeholder="Enter Task"
          value={title}
          onChange={(e) => {
            settitle(e.target.value);
          }}
        />
        <input
          type="text"
          className="text-2xl border-zinc-800 border-2 m-5 px-4 py-2"
          placeholder="Enter Description"
          value={desc}
          onChange={(e) => {
            setdesc(e.target.value);
          }}
        />
        <button className="bg-black text-white px-4 py-3 text-xl font-bold rounded m-5">
          Add Task
        </button>
      </form>

      <button className="bg-black text-white px-4 py-3 text-xl font-bold rounded m-5">
        Completed Tasks
      </button>

      <hr />
      <div className="p-8 m-5 bg-slate-200">
        <ul>{renderTask}</ul>
      </div>
    </>
  );
};

export default page;
