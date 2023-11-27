import React from "react";
import "./Headbar.css"


export default function Headbar(props) {

    // to show the task category if filtered or all task as header with number of tasks
    let count = ""
    const categoryList = props.categoryList
    let headText = props.header
    if (headText === "") {
        headText = "All tasks"
        count = props.allTaskCount

    } else {
        count = categoryList.map((element) => {
            if (element.category === props.header) {
                return (
                    element.number
                )
            }
        })
    }

    return (
        <div className="headbar">
            <button
                onClick={props.collapseSidebar}
                style={{ display: !props.collapsedSidebar ? "none" : "block" }}
                className="menu-button outside-sidebar"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
            </button>
            <div className="header-elements">
                <span className="category-at header-text">{headText}</span>
                <span className="category-at category-count">{count}</span>
            </div>
        </div>
    )
}