import React from "react";

export function CategoryList(props) {
    return (
        <>
            <div className="category-list" onClick={() => props.filterBy(props.category)}>
                <span className="category-name">
                    {props.category}
                </span>
                <span className="category-frequency">
                    {props.number}
                </span>
            </div>
        </>
    )
}