import React from "react"
import "../sidebar.css"

export default function Sidebar(props){
    return (
        <section className="pane sidebar">
            <div className="sidebar--header">
                <h3>TimeCraft</h3>
            </div>
            <div className="sidebar--actions">
                <button className="primary_btn"
	    		onClick={() => {props.onClick(0)}}>
	    		What is TimeCraft</button>
                <button className="primary_btn"
	    		onClick={() => {props.onClick(1)}}>
	    		New User</button>
                <button className="primary_btn"
	    		onClick={() => {props.onClick(2)}}>
	    		New Task</button>
                <button className="primary_btn" 
	    		onClick={() => {props.onClick(3)}}>New Log</button>
                <button className="primary_btn"
	    		onClick={() => {props.onClick(4)}}>Daily Report</button>
	    	<button className="primary_btn"
	    		onClick={() => {props.onClick(5)}}>Weekly Report</button>
                <button className="primary_btn"
	    		onClick={() => {props.onClick(6)}}>Monthly Report</button>
                <button className="primary_btn"
	    		onClick={() => {props.onClick(7)}}>
	    		Total Productive Time</button>
                <button className="primary_btn"
	    		onClick={() => {props.onClick(8)}}>
	    		Total Wasted Time</button>
                <button className="primary_btn"
	    		onClick={() => {props.onClick(9)}}>
	    		Total Time On Task</button>
            </div>
        </section>
    )
}
