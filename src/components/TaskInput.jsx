import React,{useState} from "react";
function TaskInput(props){
    const[task,setTask]=useState({Task:'',priority:'',activity:'',completed:false,important:false,id:''});
    function handleChange(e){
        const {name,value}=e.target;
        setTask((prev)=>{
            return{
                ...prev,
                [name]:value,
            }
        })
    }
    async function AddTask(e){
        e.preventDefault();
        setTask({Task:'',priority:'',activity:'',completed:false,important:false,id:''});
        props.onAdd(task);
    }
    return(
        <div className="taskInput-container">
            <form onSubmit={AddTask} className="create-task">
                <input type="text" placeholder="Enter Task" name="Task" value={task.Task} onChange={handleChange} required />
                <select className='select-task-priority'
                    name="priority"
                    value={task.priority}
                    onChange={handleChange}
                    required >
                    <option value='' disabled>Priority</option>
                    <option value='High'>High</option>
                    <option value='Medium'>Medium</option>
                    <option value='Low'>Low</option>
                </select>
                <select className='select-task-activity'
                    name="activity"
                    value={task.activity}
                    onChange={handleChange}
                    required >
                    <option value='' disabled>Activity</option>
                    <option value='Outdoor'>Outdoor</option>
                    <option value='Indoor'>Indoor</option>
                </select>
                <button type="submit">Add Task</button>
            </form>
        </div>
    )
}
export default TaskInput;