import React from "react"
import { useState, useEffect } from "react"
import Sidebar from "./components/Sidebar"
import Headbar from "./components/Headbar"
import AddPanel from "./components/TaskPanel"
import Tasks from "./components/Tasks"
import { ExpandedTaskPanel } from "./components/TaskPanel"

import "./App.css"

export default function App() {

  let savedTask = JSON.parse(localStorage.getItem('tasks'))
  if (savedTask === null) { //if no data is saved in local storage initialize it as an empty array
    savedTask = []
  }

  const [allTasks, setAllTasks] = useState(savedTask)

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(allTasks))
  }, [allTasks])

  const [collapsedSidebar, setCollapsedSidebar] = useState(true)
  const [showAddTaskPanel, setShowAddTaskPanel] = useState(false) //panel to add task
  const [expandTask, setExpandTask] = useState(false)  // panel to expand the selected task
  const [expandedTaskData, setExpandedTaskData] = useState([]) //stores the selected task data
  const [addedCategory, setAddedCategory] = useState("") // to add a new category 
  const [filter, setFilter] = useState("") // to show tasks on basis of one category

  const categoryList = []
  allTasks.forEach((element) => {
    const index = categoryList.findIndex((cat) => cat.category === element.category)
    if (index === -1) {
      categoryList.push({ category: element.category, number: 1 })
    } else {
      categoryList[index].number++
    }
  }) // groups all the different categories with their frequency / count

  function getTask(title, description, category, important, dueDate) {
    const newTask = {
      id: allTasks.length,
      title: title,
      description: description,
      category: category,
      importance: important,
      dueDate: dueDate,
      completed: false
    }
    setAllTasks(prevState => {
      return [...prevState, newTask]
    })
  } // takes and updates allTask state

  function showPanel() {
    setShowAddTaskPanel(!showAddTaskPanel)
    if (expandTask) {
      setExpandTask(!expandTask)
    }
  } // shows the add task panel

  function expand(id) {
    setExpandTask(true)
    if (showAddTaskPanel) {
      setExpandTask(!showAddTaskPanel)
    }

    allTasks.map(element => {
      if (element.id === id) {
        setExpandedTaskData(element)
      } // to initialize the data of the expanded tasj
    })
  } // shows the expanded task panel

  function deleteTask(id) {
    const updatedTask = allTasks.filter((task) => task.id !== id)
    for (let i = id; i < updatedTask.length; i++) {
      updatedTask[i].id -= 1 // decreases the id of the tasks which are after the deleted task
    }
    setAllTasks(updatedTask)
    setExpandTask(false)
  } // deletes the task 

  function onComplete(id, completed) {
    setAllTasks((prevTasks) => {
      return prevTasks.map((task) =>
        task.id === id ? { ...task, completed } : task
      )
    })
  }


  const createElementTask = allTasks
    .slice(0)
    .reverse()
    .map(task => {
      const taskDetail =
        <Tasks
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          category={task.category}
          importance={task.importance}
          dueDate={task.dueDate}
          completed={task.completed}
          onComplete={onComplete}
          expand={expand}
        />
      if (task.category === filter) { // displays category filtered tasks
        return (
          taskDetail
        )
      } else if (filter === "") { // displays all task
        return (
          taskDetail
        )
      }
    })


  return (
    <>
      <div className={collapsedSidebar ? "main-app collapsed-sidebar" : "main-app filled-sidebar"}>
        <Sidebar
          allTasks={allTasks}
          collapseSidebar={() => setCollapsedSidebar(!collapsedSidebar)}
          addCategory={(value) => setAddedCategory(value)}
          filterTask={(value) => setFilter(value)}
          categoryList={categoryList}
        />
        <div className="main-container"
          style={{
            width: showAddTaskPanel ? "70%" : "100%"
          }}>
          <Headbar
            collapsedSidebar={collapsedSidebar}
            collapseSidebar={() => setCollapsedSidebar(!collapsedSidebar)}
            showPanel={showPanel}
            header={filter}
            categoryList={categoryList}
            allTaskCount={allTasks.length}
          />
          <div className="task-space">
            <button
              className="add-task"
              onClick={showPanel}
            >
              <img src="../images/plus.PNG" className="add-icon" />
              Add New Task
            </button>
            <div className="task-list">
              {createElementTask}
            </div>
          </div>
        </div>
        <div className="panel">
          {!expandTask
            ? <AddPanel
              showAddTaskPanel={showAddTaskPanel}
              showPanel={showPanel}
              getTask={getTask}
              newCategory={addedCategory}
            />
            : <div className="expanded-task">
              <ExpandedTaskPanel
                expandedTaskData={expandedTaskData}
                expand={() => setExpandTask(!expandTask)}
                delete={deleteTask}
              />
            </div>
          }
        </div>
      </div >
    </>
  )
}