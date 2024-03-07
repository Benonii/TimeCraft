import React from "react"

export default function NewLog() {
	return (
	    <main className="new-log-container">
		<h1 className="title">New Log</h1>
    		<label htmlfor="task-id">What is the Task ID?</label>
    		<br />
    		<input type="text" name="task-id" />

    		<br /><br />

    		<label htmlfor="tot">How much time did you spend on
		    web-designing today</label>
    		<br />
    		<input type="text" name="tot" />

    		<br /><br />

    		<label htmlfor="tw">How much time have you wasted today?<br />
                    (It's okay, I won't judge)</label>
    		<br />
    		<input type="text" name="tw" />
	    </main>
	)
}
