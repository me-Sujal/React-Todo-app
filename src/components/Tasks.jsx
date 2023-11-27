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
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#ff8100" stroke="#ff8100" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>

                    </span>)}
                </div>
                <div className="expand" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="grey" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6" /></svg>
                </div>
            </div>

        </>
    )
}