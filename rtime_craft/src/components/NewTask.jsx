import React from "react"

export default function NewTask() {
	return (
	    <main className="new-task-container">
		<h1 className="title">New Task</h1>
    		<p className="intro"> A New Task, cool! <br />
        	    But first, can I please see some ID?
    		</p>
    		<label htmlfor="user-id">User ID:</label>
    		<br />
    		<input type="text" name="user-id" />

    		<br /><br />

    		<label htmlfor="task-name">What do you want to call this task?</label>
    		<br />
    		<input type="text" name="task-name" />

    		<br /><br />

    		<label htmlfor="task-goals">How many hours would you like to
		    dedicate to this task?</label>
    		<br />
    		<input type="text" name="task-goals" />
	    </main>
	) 
}
