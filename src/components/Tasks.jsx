import React, { useState } from "react"
import "./Tasks.css"

export default function Tasks(props) {
    const [completed, setCompleted] = useState(props.completed)
    const style = {
        textDecoration: completed ? "line-through" : "none",
        color: completed ? "grey" : "black"
    } // style the task when completed 

    return (
        <>
            <div className="task-container" style={style} onClick={() => props.expand(props.id)}>
                <label for="checkbox">
                    <input
                        type="checkbox"
                        checked={completed}
                        onChange={() => {
                            setCompleted(!completed)
                            props.onComplete(props.id, !completed)
                        }} />
                    <span className="task-title">{props.title !== "" ? props.title : "untitled"}</span>
                </label>
                <div className="other-detail">
                    {props.dueDate !== "" && <span className="due-date">
                        <span className="date-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="grey" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar-x"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /><line x1="10" x2="14" y1="14" y2="18" /><line x1="14" x2="10" y1="14" y2="18" /></svg>
                        </span>&nbsp;&nbsp;
                        {props.dueDate}
                    </span>}
                    {props.category !== "" && <span className="category category-name">{props.category}</span>}
                    {props.importance && (<span className="category important">
                        <img src="../images/filled-star.PNG" className="important-star-task" />
                        &nbsp;Important
                    </span>)}
                </div>
                <div className="expand" >
                    <img src="../images/expand.PNG" className="expand-icon"></img>
                </div>
            </div>

        </>
    )
}