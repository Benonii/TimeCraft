import React from "react"

export default function Sidebar(){
    return (
        <section className="pane sidebar">
            <div className="sidebar--header">
                <h3>TimeCraft</h3>
            </div>
            <ul className="actions">
                <li>What is TimeCraft?</li>
                <li>New User</li>
                <li>New Task</li>
                <li>New Log</li>
                <li>Daily Report</li>
                <li>Weekly Report</li>
                <li>Monthly Report</li>
                <li>Total Productive Time</li>
                <li>Total Wasted Time</li>
                <li>Help</li>
            </ul>
        </section>
    )
}