import React from "react";
import "./Headbar.css"
import { CategoryList } from "./CategoryList";

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
                <img src="../images/three-bars.PNG" className="three-bars-icon" />
            </button>
            <div className="header-elements">
                <span className="category-at header-text">{headText}</span>
                <span className="category-at category-count">{count}</span>
            </div>
        </div>
    )
}