import React from 'react';

function Todo({ todo , toggleTodo }){
    function handleTodoClick(){
        toggleTodo(todo.id)
    }
    return (
    
        <>
        <label>
        <input type = "checkbox" checked = {todo.complete} onChange={handleTodoClick}/>
        {todo.name}
        </label>
        
        </>
    );
}
export default Todo;