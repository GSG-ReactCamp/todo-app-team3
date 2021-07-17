import React, {useState ,useRef , useEffect} from 'react';
import TodoList from './TodoList';
import {v4 as uuidv4} from 'uuid';

const LocalStorageKey ='todoApp.todos'
///////app function ///
function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef()

  //////// store todos //////
  useEffect(()=> {
    const storedTodos = JSON.parse(localStorage.getItem(LocalStorageKey))
    if (storedTodos) setTodos(storedTodos) 
  },[])

  useEffect(()=> {
      localStorage.setItem(LocalStorageKey,JSON.stringify(todos))
  },[todos])

  function toggleTodo(id){
      const newTodos = [...todos]
      const todo = newTodos.find(todo => todo.id === id)
      todo.complete = !todo.complete
      setTodos(newTodos)
  }
/////// Add to do function /////////////

  function handleAddTodo (e){
      const name = todoNameRef.current.value
      if (name === '') return
      console.log(name)
      setTodos(prevTodos => {
        return [...prevTodos , {id: uuidv4 , name: name , complete: false}]
      })
      todoNameRef.current.value = ' '
  }
////////////////clear todos from the list //////////
  function clearTodos(){
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

////////////app return //////////////
  return(
    <div style = {{width:'40%', display:'flex',border:'none',flexDirection:'column',alignContent:'center',justifyContent:'center', margin: '3% 0 0 3%' , background:'gray'}}>
      <input type ="text" placeholder="Type Your List ..." style= {{paddingLeft:'15px',fontSize:'18px',border:'none',height:'40px',color:'green',background:'darkGray'}} ref = {todoNameRef}/>
      <div>
      <button onClick = {handleAddTodo} style={{width:'50%',height:'40px',fontSize:'14px',border:'0 0 0 2px solid black'}}>add to do </button>
      <button onClick = {clearTodos} style={{width:'50%',height:'40px',fontSize:'14px',border:'0 0 0 2px solid black'}}>clear compleated todos</button>
      </div>
      <div>you have {todos.filter(todo=> !todo.complete).length} todo lists</div>
      <TodoList todos = {todos} toggleTodo = {toggleTodo}/>
    </div>
    )}
export default App;