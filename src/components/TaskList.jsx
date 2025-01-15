import React,{useState,useEffect} from "react";
import axios from "axios";
function TaskList(props){
    const[weather,setWeather]=useState("");
    useEffect(()=>{
        async function fetchWeather(){
            if(props.activity==="Outdoor"){
                try{
                    const Key=import.meta.env.VITE_API_KEY;
                    console.log(Key);
                    const result=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=bangalore&appid=${Key}`);
                    const description=result.data.weather[0].description;
                    console.log(description);
                    setWeather(`weather: ${description}`);
                }catch(err){
                    console.error(err);
                    setWeather('Could not fetch the weather');
                }
            }
        }
        fetchWeather();
    },[props.activity]);
    return(
        <div className="taskListContainer">
            <div className="insideListContainer">
                <div className="component component1">
                    <input type="checkbox" checked={props.completed} onChange={props.onToggle} />
                    <p style={{textDecoration:props.completed?"line-through":"none"}}>{props.task}</p>
                </div>
                <div className="component component2">
                    <button className="star-btn" onClick={props.onToggleImp} style={{color:props.important?'gold':'black'}}>{props.important?"★":"☆"}</button>
                    {props.delete && <button className="delete-btn" onClick={props.onDelete}>Delete</button>}
                </div>
            </div>
            <div className="component component3">
                <p>Priority: {props.priority}</p>
                <p>{props.activity}</p>
                <p>{props.activity==="Outdoor" && (`${weather}`)}</p>
            </div>
        </div>
    )
}
export default TaskList;