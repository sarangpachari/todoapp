import { useState } from "react";
import "./css/Todo.css";
import { useRef } from "react";
import { useEffect } from "react";
import TodoItems from "./TodoItems";
import plus from '../assets/plus.png';
import todolist from '../assets/todolist.png'

let count = 0;

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef(null);

  const add = () => {
    setTodos([
      ...todos,
      { no: count++, text: inputRef.current.value, display: "" },
    ]);
    inputRef.current.value = "";
    localStorage.setItem("todos_count",count)
  };

  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem("todos")));
    count = localStorage.getItem("todos_count")
  },[]);

  useEffect(() => {
    setTimeout(() => {
      console.log(todos);
      localStorage.setItem("todos", JSON.stringify(todos));
    }, 100);
  }, [todos]);

  return (
    <div className="todo">
      <div className="todo-header"> <img src={todolist} alt="" /> To-Do List</div>
      <div className="todo-add">
        <input
          ref={inputRef}
          className="todo-input"
          type="text"
          placeholder="Add your task"
        />
        <div
          onClick={() => {
            add();
          }}
          className="todo-add-btn"
        >
          <p>ADD</p>
          <img src = {plus} alt="" />
        </div>
      </div>
      <div className="todo-list">
        {todos.map((item, index) => {
          return (
            <TodoItems
              key={index}
              setTodos={setTodos}
              no={item.no}
              display={item.display}
              text={item.text}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
