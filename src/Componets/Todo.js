import React, { useEffect, useRef, useState } from 'react'
import "./Todo.css"
import {IoMdDoneAll} from "react-icons/io"
import {FiEdit} from "react-icons/fi"
import { MdDelete} from "react-icons/md"


function Todo() {
    
    const [Todo,setTodo] = useState('')
    const [Todos,setTodos] = useState([])
    const [EditId,setEditId] = useState(0)

    const to = () =>{
       if(Todo !== ""){
        setTodos([...Todos,{list : Todo, id : Date.now(), status: false}])
        console.log(Todos);
        setTodo('')
       }
       
       if(EditId){
        const editTodo = Todos.find((to)=> to.id == EditId)
        const updateTodo = Todos.map((to)=>to.id == editTodo.id 
        ? (to = {id : to.id, list : Todo}) :
        (to = {id : to.id, list:to.list}))
        setTodos(updateTodo)
        setEditId(0)
        setTodo('')
        console.log(updateTodo)
       }
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
    } 
    // input filedile yeppoyum mini kodirikkan 
    const inputRef = useRef("null")
    useEffect(()=>{
        inputRef.current.focus()
    })
    const onDelete = (id)=>{
       setTodos(Todos.filter((to)=> to.id !== id))
    }
    const onComplete = (id)=>{
        let Complete = Todos.map((item) =>{
            if(item.id === id){
                return({...item, status : !item.status})
            }return item
        })
        setTodos(Complete)
    }; 
    const onEdit = (id)=>{
        const editTodo = Todos.find((to)=> to.id === id)
        setTodo(editTodo.list)
        setEditId(editTodo.id)
    }


  return (

    <div className='container'>
        <h2>TODO APP</h2>
        <from onSubmit={handleSubmit}>
            <input type='text' value={Todo} ref={inputRef} placeholder='Enter your todo' onChange={(event)=>setTodo(event.target.value)}/>
            <button onClick={to}>{EditId ? "EDIT" : "ADD"}</button>
        </from> 
        <div>=
            <ul>
              {
                Todos.map((i) => (
                    <li><span id={i.status ? "item": ""}>{i.list}</span>
                    <span>
                        < IoMdDoneAll className="icon" onClick={() => onComplete(i.id)} title='Complete' />
                        < FiEdit  className="icon" onClick={()=> onEdit(i.id)} title='Edit' />
                        < MdDelete  className="icon" onClick={()=>onDelete(i.id)} title='Delete'/>
                    </span>
                    </li>
                ))
              }

            </ul>
        </div>
    </div>
  )
}

export default Todo