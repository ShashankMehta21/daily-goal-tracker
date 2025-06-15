import React, { useEffect, useState } from 'react'
import Task from '../Task/Task'

const Home = () => {
    const [task,setTask]=useState(localStorage.getItem("task")?JSON.parse(localStorage.getItem("task")):[])
    const [title,setTitle]=useState("")
    const [description,setDescription]=useState("")

    const submitHandler = (e)=>{
        e.preventDefault();

        setTask([...task,{
            title:title,
            description:description
        }])
        setTitle("");
        setDescription("")
    }

    const deleteTask=(index)=>{
        const filteredArr = task.filter((val,i)=>{
            return i !== index
        })
        setTask(filteredArr)
    }

    useEffect(()=>{
        localStorage.setItem("task",JSON.stringify(task))
    },[task])

  return (
    <div className='container'>
        <h1>DAILY GOAL</h1>
        <form onSubmit={submitHandler}>
            <input type="text" placeholder='Enter the title' value={title} onChange={(e)=>setTitle(e.target.value)} />
            <textarea name="" id="" placeholder='Enter the description' value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
            <button type='submit'>Add</button>
        </form>

        {task.map((item,index)=>(
            <Task key={index} title={item.title} description={item.description} deleteTask={deleteTask} index={index}/>
        ))}
    </div>
  )
}

export default Home