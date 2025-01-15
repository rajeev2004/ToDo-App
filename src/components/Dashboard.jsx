import React,{useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import './Dashboard.css';
function Dashboard(){
    const navigate=useNavigate();
    const[tasks,setTask]=useState([]);
    const[type,setType]=useState("all");
    const[loading,setLoading]=useState(false);
    useEffect(()=>{
        const savedTask=localStorage.getItem('tasks');
        if(savedTask){
            console.log("Loading tasks from localStorage:",savedTask);
            setTask(JSON.parse(savedTask));
            setLoading(true);
        }
    },[]);
    useEffect(()=>{
        if(loading){
            console.log("Saving tasks to localStorage:",tasks);
            localStorage.setItem('tasks',JSON.stringify(tasks));
        }
    },[tasks,loading]);
    async function addTask(task){
        const newTask={...task,id:Date.now()};
        setTask((prev)=>[...prev,newTask]);
    }
    function taskCompletion(id){
        console.log("Toggling completion for task with id",id);
        setTask((prev)=>prev.map((task,i)=>task.id===id?{...task,completed:!task.completed}:task));
    }
    const filterTasks=tasks.filter((task)=>{
        if(type==="complete"){
            return task.completed;
        }else if(type==="important"){
            return task.important;
        }
        return true;
    })
    const currentTasks=filterTasks.filter((task)=>task).sort((a,b)=>{
        const order={High:1,Medium:2,Low:3};
        if(a.completed!=b.completed){
            return a.completed-b.completed;
        }
        return order[a.priority]-order[b.priority];
    });
    function taskImportamt(id){
        setTask((prev)=>prev.map((task,i)=>task.id===id?{...task,important:!task.important}:task));
    }
    function deleteTask(id){
        setTask((prev)=>prev.filter((task,i)=>task.id!==id));
    }
    function logout(){
        localStorage.removeItem('isauthenticated');
        localStorage.removeItem('user');
        localStorage.removeItem('tasks');
        navigate('/');
    }
    return(
        <div className="dashboard-container">
            <div className="hamburger-menu">
                <nav className="navbar navbar-expand-lg navbar-light bg-light"> {/*this code is taken from bootstrap */}
                    <div className="container-fluid">
                        <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        >
                        <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <div>
                                    <li className="nav-item">
                                        <button className="btn btn-primary" onClick={()=>setType("all")}>All tasks</button>
                                    </li>
                                </div>
                                <div>
                                    <li className="nav-item">
                                        <button className="btn btn-secondary" onClick={()=>setType("complete")}>Completed tasks</button>
                                    </li>
                                </div>
                                <div>
                                    <li className="nav-item">
                                        <button className="btn btn-success" onClick={()=>setType("important")}>Important tasks</button>
                                    </li>
                                </div>
                                <div>
                                    <li className="nav-item">
                                        <button className="btn logout-btn" onClick={()=>logout()}>Logout</button>
                                    </li>
                                </div>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
            <TaskInput onAdd={addTask}/>
            <div className="task-list">
                {currentTasks.map((task,index)=>{
                    return(
                        <div className="All-task" key={index}>
                            <TaskList task={task.Task} priority={task.priority} activity={task.activity} completed={task.completed} important={task.important} onToggle={()=>taskCompletion(task.id)} onToggleImp={()=>taskImportamt(task.id)} delete={true} onDelete={()=>deleteTask(task.id)}/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default Dashboard;