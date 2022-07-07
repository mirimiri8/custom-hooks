import React, { useEffect, useReducer } from 'react'
import { useForm } from '../../hooks/useForm';
import "./styles.css"
import { TodoAdd } from './TodoAdd';
import { TodoList } from './TodoList';
import { todoReducer } from './todoReducer';

const init = ()=>{
    return JSON.parse(localStorage.getItem("todos")) || [];
}

export const TodoApp = () => {

    const [todos, dispatch] = useReducer(todoReducer, [], init);

        

    useEffect(() => {
      localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos])
    
    const handleDelete = (todoId) => {


        const actionDelete = {
            type: "delete",
            payload: todoId
        }

        dispatch(actionDelete);
    }

    const handleToggle = (todoId)=>{

        const actionToggle = {
            type: "toggle",
            payload: todoId
        }

        dispatch(actionToggle);
    }

    const handleAdd = (newTodo)=>{

        dispatch({
            type: "add",
            payload: newTodo
        });
    }


  return (
    <div>
        <h1>TodoApp ({todos.length})</h1>
        <hr/>

        <div className='row'>
            <div className='col-7'>
                <TodoList todos={todos} handleDelete={handleDelete} handleToggle={handleToggle}/>
                {/* <ul className='list-group list-group-flush'>
                    {
                        todos.map( (todo, i) => (
                        
                            <li 
                                key={todo.id} 
                                className="list-group-item"
                            >
                                <p className={`${ todo.done && 'complete'}`}
                                    onClick={()=>handleToggle (todo.id)}
                                >
                                    {i+1}.{todo.desc}
                                </p>
                                <button
                                    className='btn btn-danger'
                                    onClick={()=>handleDelete (todo.id)}>
                                    Borrar
                                </button>
                            </li>
                        ))
                    }
                </ul> */}
            </div>
            <div className='col-5'>
                <TodoAdd handleAdd={handleAdd} />
            </div>

        </div>
    </div>
  )
}
