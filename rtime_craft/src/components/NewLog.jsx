import React, { useState } from "react"
import "../newlog.css"

export default function NewLog() {
	const [formData, setFormData] = useState({
		taskId: '',
		timeOnTask: '',
		timeWasted: ''
	});

	function handleChange(e) {
	    const { name, value } = e.target;
	    setFormData(prevState => ({
		    ...prevState,
		    [name]: value
	}));
	}

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			const params = new URLSearchParams();
			params.append('taskId', formData.taskId)
			params.append('timeOnTask', formData.timeOnTask)
			params.append('timeWasted', formData.timeWasted)

			const response = await fetch ("http://127.0.0.1:5001/tc/v1/new_log", {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: params.toString(),
				});

				if (response.ok) {
					console.log("Form submitted successfully")
				} else {
					console.error("Failed to submit form")
				};
		} catch(e) {
			console.error("Error submitting form:", e);
		}
	};

	return (
	    <main className="new-log-container">
		<h1 className="title">New Log</h1>
		<form onSubmit={handleSubmit}>
 	   		<label htmlFor="taskId">What is the Task ID?</label>
    			<br />
    			<input type="text" name="taskId" onChange={handleChange}/>

	    		<br /><br />

	    		<label htmlFor="timeOnTask">How much time did you spend on
			    web-designing today</label>
    			<br />
    			<input type="text" name="timeOnTask" onChange={handleChange} />

 	   		<br /><br />

	    		<label htmlFor="timeWasted">How much time have you wasted today?<br />
        	            (It's okay, I won't judge)</label>
    			<br />
    			<input type="text" name="timeWasted" onChange={handleChange} />
		</form>
		<div className="submit">
		    <button type="submit" onClick={handleSubmit}>Log</button>
		</div>

	    </main>
	)
}
