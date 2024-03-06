import React from "react"

export default function NewTask() {
	return (
	    <main>
		<h1>New Task</h1>
    		<p> A New Task, cool! <br />
        	    But first, can I please see some ID?
    		</p>
    		<label for="user-id">User ID:</label>
    		<br />
    		<input type="text" name="user-id" />

    		<br /><br />

    		<label for="task-name">What do you want to call this task?</label>
    		<br />
    		<input type="text" name="task-name" />

    		<br /><br />

    		<label for="task-goals">How many hours would you like to
		    dedicate to this task?</label>
    		<br />
    		<input type="text" name="task-goals" />
	    </main>
	) 
}
