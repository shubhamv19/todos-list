
import './App.css';
import React,{useEffect, useState} from 'react'
import {AiOutlineDelete} from 'react-icons/ai';
import {BsCheckLg} from 'react-icons/bs';

  function App(){

    const [isCompleteScreen,setIsCompleteScreen]=useState(false);
    const [allTodos,setTodos]=useState([]);
    const [newTitle,setNewTitle]=useState('');
    const [newDescription,setNewDescription]=useState('');
    const [completedTodos,setCompletedTodos]=useState([]);

    const handleAddTodo=()=>{

      let newTodoItem={

        title:newTitle,
        description:newDescription
      }

      let updatedTodoArr=[...allTodos];
      updatedTodoArr.push(newTodoItem);
      setTodos(updatedTodoArr);
      localStorage.setItem('todolist',JSON.stringify(updatedTodoArr))
      setNewDescription('');
      setNewTitle('');

    }

    const handleDeleteTodo=(index)=>{

      let reducedTodo=[...allTodos];
      reducedTodo.splice(index,1);
      localStorage.setItem('todolist',JSON.stringify(reducedTodo))
      setTodos(reducedTodo)
    }

    const handleCompletedTodoDelete = (index) => {
      let reducedTodos = [...completedTodos];
      reducedTodos.splice (index,1);
      // console.log (reducedCompletedTodos);
      localStorage.setItem (
        'completedTodos',
        JSON.stringify (reducedTodos)
      );
      setCompletedTodos (reducedTodos);

      
    };

    const handleComplete=(index)=>{
    
      const date = new Date ();
      var dd = date.getDate ();
      var mm = date.getMonth () + 1;
      var yyyy = date.getFullYear ();
      var hh = date.getHours ();
      var minutes = date.getMinutes ();
      var ss = date.getSeconds ();
      var finalDate =dd + '-' + mm + '-' + yyyy + ' at ' + hh + ':' + minutes + ':' + ss;

      let filteredItem={
        ...allTodos[index],
        completedOn:finalDate,
      }
    
      let updatedCompletedArr=[...completedTodos,filteredItem];
      //  updatedCompletedArr.push(filteredItem);
      setCompletedTodos(updatedCompletedArr);
      handleDeleteTodo(index);
      localStorage.setItem('CompletedTodos',JSON.stringify(updatedCompletedArr));
      
    }

    

    useEffect(()=>{
      let savedTodo=JSON.parse(localStorage.getItem('todolist'));
      let savedCompletedTodos=JSON.parse(localStorage.getItem('CompletedTodos'))
      if(savedTodo){
        setTodos(savedTodo);
      }
      if(savedCompletedTodos){
        setCompletedTodos(savedCompletedTodos);
      }

    },[])

 return (
    
    <div className='App'>

      <h1 style={{marginBottom : '70px'}}>My Todos </h1>

      

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className ='todo-input-item'>
            <label >Title</label>
            <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="What's the task title?" />
          </div>
          <div className ='todo-input-item'>
            <label >Description</label>
            <input type="text" value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} placeholder="What's the task title?" />
          </div>
          <div className ='todo-input-item'>
            <button type='button' onClick={handleAddTodo} className="primary-btn">ADD</button>
         </div>
        </div>

        <div className="btn-area">
        <button
            className={`secondaryBtn ${isCompleteScreen === false && 'active'}`}
            onClick={() => setIsCompleteScreen (false)}
          >
            To Do
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen === true && 'active'}`}
            onClick={() => setIsCompleteScreen (true)}
          >
            Completed
          </button></div>
        <div className="todo-list">

          {isCompleteScreen===false && allTodos.map((item,index)=>{

            return(
              <div className="todo-list-item" key={index}>
          <div>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          </div>
          <div>
                  <AiOutlineDelete
                    title="Delete?"
                    className="icon"
                    onClick={() => handleDeleteTodo(index)}
                  />
                  <BsCheckLg
                    title="Completed?"
                    className=" check-icon"
                    onClick={() => handleComplete (index)}
                  />
                </div>
        </div>
            )
          })}

{isCompleteScreen===true && completedTodos.map((item,index)=>{

return(
  <div className="todo-list-item" key={index}>
<div>
<h3>{item.title}</h3>
<p>{item.description}</p>
<p><small>Completed On: {item.completedOn}</small></p>

</div>
<div>
      <AiOutlineDelete
        title="Delete?"
        className="icon"
        onClick={() => handleCompletedTodoDelete(index)}
      />
    
    </div>
</div>
)
})}
        
        </div>

      </div>
    </div>
         
  );
}

export default App;
