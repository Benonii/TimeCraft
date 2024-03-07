import React from "react"
import "../ttot.css"

export default function TotalTimeOnTask() {
	return (
	    <main className="total-time-on-task-container">
		<label htmlfor="task-id">Can I please have the Task ID?</label>
    		<br />
    		<input type="text" name="task-id" />

    		<br /><br />

    		<h1 className="task-time">So far, you've spent 3 hours Training. Way to go!</h1>
	    </main>
	);
}
