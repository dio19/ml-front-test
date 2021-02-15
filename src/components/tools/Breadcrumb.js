import React from "react";
import '../../styles/Breadcrumb.scss'

export default function Breadcrumb({ categories }) {
    let i = 0
    return (
        <div id='box-category-list' className="text-align-center-phone">
            {
                categories ? categories.map(category => {
                    let htmlReturn = <span key={category+1} id="normal-category">{category} > </span>
                    if (i === categories.length - 1) {
                        htmlReturn = <span key={category+1} id="selected-category">{category} </span>
                    }
                    i++;
                    return htmlReturn
                }) : <span id="normal-category">No existe categoria para este resultado de busqueda</span>
            }
        </div>
    )
};