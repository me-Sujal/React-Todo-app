import React, { useEffect, useState } from "react";
import { CategoryList } from "./CategoryList";

import "./Sidebar.css"

export default function Sidebar(props) {
    const [addCategory, setAddCategory] = useState(true)
    const [newCategory, setNewCategory] = useState("")
    const [filterCategory, setFilterCategory] = useState("")
    const tasks = props.allTasks

    useEffect(() => {
        props.filterTask(filterCategory)
    }, [filterCategory])

    const createCategory = props.categoryList.map(element => {
        return (
            <CategoryList
                key={element.id}
                category={element.category}
                number={element.number}
                filterBy={(value) => setFilterCategory(value)}
            />
        )
    })

    return (
        <>
            <div className="sidebar">
                <div className="menu-container">
                    <span className="menu-text">Menu</span>
                    <button
                        onClick={props.collapseSidebar}
                        className="menu-button inside-sidebar"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </button></div>
                <div className="all-tasks" onClick={() => setFilterCategory("")}>
                    <span className="all-task-text">All Tasks</span>
                    <span className="all-task-count">{tasks.length}</span>
                </div>
                <span className="category-text">Categories</span>
                <div className="category-space">
                    {createCategory}
                    {
                        addCategory
                            ? <button className="add-category-button"
                                onClick={() => setAddCategory(!addCategory)}
                            ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg><span >Add category</span></button>
                            : <div className="category-input">
                                <input
                                    type="text"
                                    value={newCategory}
                                    onInput={(e) => setNewCategory(e.target.value)}
                                    className="category-input-field"
                                ></input>
                                <div className="add-category-buttons-container">
                                    <button
                                        className="add-input"
                                        onClick={() => {
                                            props.addCategory(newCategory)
                                            setNewCategory("")
                                            setAddCategory(!addCategory)
                                        }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                                    </button>
                                    <button
                                        className="discard-input"
                                        onClick={() => setAddCategory(!addCategory)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                    </button>
                                </div>
                            </div>
                    }
                </div>
            </div >
        </>
    )
}