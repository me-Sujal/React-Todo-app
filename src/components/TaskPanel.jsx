import React, { useEffect, useState } from "react"
import Select from "react-select";
import "./TaskPanel.css"

export default function AddPanel(props) { //for the add task panel
    const [tempTask, setTempTask] = useState({
        title: "",
        description: "",
        category: "",
        important: false,
        dueDate: ""
    }) // stores the task information temporarily

    const [options, setOptions] = useState([
        { value: "Personal", label: "Personal" },
        { value: "Work", label: "Work" },
        { value: "Casual", label: "Casual" },
    ]) // categories options 

    function capitalize(word) {
        return word.charAt(0).toUpperCase() + word.slice(1)
    } // function to capitalize the first letter of the sentence

    useEffect(() => {
        if (props.newCategory !== "") {
            const newOption = {
                value: capitalize(props.newCategory),
                label: capitalize(props.newCategory)

            }
            setOptions(prevOptions => {
                return [...prevOptions, newOption]
            })
        }
    }, [props.newCategory]) // updates the category with added value

    function sendTask() {
        props.getTask(tempTask.title, tempTask.description, tempTask.category, tempTask.important, tempTask.dueDate)
        setTempTask(prevState => {
            return {
                ...prevState,
                title: "",
                description: "",
                category: "",
                important: false,
                dueDate: ""
            }
        })
    }//send temporary task to save in allTasks 

    function handleSelect(selectedOption) {
        const selected = selectedOption
        setTempTask(prevState => {
            return {
                ...prevState,
                category: selected.value
            }
        })
    }

    return (
        <div
            className="add-task-panel-container"
            style={{
                display: props.showAddTaskPanel ? "block" : "none"
            }}
        >
            <div className="add-task-panel">
                <h1>Add Task :</h1>
                <textarea
                    placeholder="Task title"
                    className="task-input task-title-field"
                    maxLength={40}
                    value={tempTask.title}
                    onInput={(e) => setTempTask(prevState => {
                        return {
                            ...prevState,
                            title: e.target.value
                        }
                    })}
                ></textarea>
                <br />
                <textarea
                    placeholder="Task description"
                    className="task-input task-discription-field"
                    value={tempTask.description}
                    onInput={(e) => setTempTask(prevState => {
                        return {
                            ...prevState,
                            description: e.target.value
                        }
                    })}
                ></textarea>
                <div className="category-selector">
                    <span className="category-text">Category </span>
                    <Select
                        options={options}
                        autoFocus={true}
                        className="select-option"
                        onChange={handleSelect}
                    />
                    <img
                        src={tempTask.important ? "../images/filled-star.PNG" : "../images/star.PNG"}
                        className="important-star"
                        onClick={() => setTempTask(prevState => {
                            return {
                                ...prevState,
                                important: !tempTask.important
                            }
                        })}
                    />
                </div>
                <div className="date-selector">
                    <span className="due-date-text">Due date</span>
                    <input
                        type="date"
                        className="date-input"
                        value={tempTask.dueDate}
                        onChange={(e) => setTempTask((prevState) => {
                            return {
                                ...prevState,
                                dueDate: e.target.value
                            }
                        })
                        } />
                </div>
                <br />
                <button
                    className="task-panel-button discard-button"
                    onClick={props.showPanel}
                >Discard</button>
                <button
                    className="task-panel-button save-button"
                    onClick={sendTask}
                >Save Changes</button>
            </div>
        </div >
    )
}

export function ExpandedTaskPanel(props) { // for the exapanded task panel to show full task information
    const data = props.expandedTaskData
    function capitalize(word) {
        return word.charAt(0).toUpperCase() + word.slice(1)
    } // function to capitalize the first letter
    return (
        <>
            <div className="card-container">
                <div className="close" >
                    <h1>Task: </h1>
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x" onClick={(props.expand)}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                </div>
                <span className="expanded-task-title">
                    {capitalize(data.title)}&nbsp;&nbsp;
                    {data.importance && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#ff8304" stroke="#ff8304" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>}
                </span>
                <div className="expanded-task-description">
                    {data.description}
                </div>
                <div className="expanded-task-due">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar-x"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /><line x1="10" x2="14" y1="14" y2="18" /><line x1="14" x2="10" y1="14" y2="18" /></svg>
                    <span className="date">
                        {data.dueDate}</span>
                </div>
                <div className="expanded-task-category">
                    {data.category}
                </div>
                <button className="delete-button" onClick={() => props.delete(data.id)}>Delete Task</button>
            </div>
        </>
    )
}