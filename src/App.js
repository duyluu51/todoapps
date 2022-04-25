import { useState, useEffect, useRef } from "react";
import "./app.css";
import clsx from 'clsx';

function App() {
  const [task, setTask] = useState("");
  const [listTodo, setListTodo] = useState([]);
  const inputRef = useRef();
  const [completeList,setCompleteList]=useState([])

  // Add
  const handleAddTask = (e) => {
    setListTodo((prev) => [...prev, task]);
    inputRef.current.focus();
    setTask("");
  };

  // Delete
  const handleDelete = (indexDelete,e) => {
    e.stopPropagation()
    let resultDeleteList = listTodo.filter((task,index)=>(index!==indexDelete))
    let resultCompleteList = completeList.map((item,index) => {
      if (item>indexDelete) {
        return item-1
      }else {
        return item
      }
    })
    console.log(resultCompleteList);
    setListTodo(resultDeleteList)
    setCompleteList(resultCompleteList)
  };

  // Toogle complete

  const handleToogleComplete = indexComplete => {
    let resultList
    if(completeList.includes(indexComplete)) {
      resultList = completeList.filter((item,index)=>(item!==indexComplete))
    } else {
      resultList = [...completeList,indexComplete]
    }
    console.log(resultList)
    setCompleteList(resultList)
  }

  return (
    <div className="App container">
      <div className="instruction">
        <h1>To-Do List</h1>
        <p>Enter text into the input feild to add items to your list.</p>
        <p>Click the "X" to remove the item from your list</p>
        <p>Click the item to mark it as complete</p>
        <div className="todoArea">
          <div className="addArea">
            <input
              ref={inputRef}
              type="text"
              onChange={(e) => setTask(e.target.value)}
              value={task}
            ></input>
            <button className="addButton" onClick={(e) => handleAddTask(e)}>
              <i className="fa-solid fa-circle-plus" />
            </button>
          </div>

          <div className="listTodo">
            <ul>
              
              {listTodo.map((taskItem, index) => (
                <li 
                  key={index}
                  onClick={e=>handleToogleComplete(index)}
                  className={clsx(completeList.includes(index)&&'bg-success')}
                  >
                    <span>{taskItem}</span>
                    <i 
                      className="fas fa-times"
                      onClick={e=> handleDelete(index,e)}
                      >
                    </i>
                </li>

              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
