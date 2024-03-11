import React, { useState } from "react"

export default function NewTask() {
	const [formData, setFormData] = useState({
		userId: '',
		taskName: '',
		/* Total time on task daily goal */
		dailyGoal: 0
	});

	function handleChange(e) {
		e.preventDefault()
		const { name, value} = e.target
		setFormData(prevFormData  => ({
			...prevFormData,
			[name]: value,
		}));
	}

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			const params = new URLSearchParams();
			params.append('userId', formData.userId);
			params.append('taskName', formData.taskName);
			params.append('dailyGoal', formData.dailyGoal);

			const response = await fetch('http://127.0.0.1:5001/tc/v1/new_task', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: params.toString(),
				mode: 'no-cors'
			});

			if (response !== {}) {
				console.log('Form submitted successfully');
			} else {
				console.error('Failed to submit form');
			}
		} catch (error) {
			console.error('Error submitting form:', error);
		}
	};

	return (
	    <main className="new-task-container">
		<h1 className="title">New Task</h1>
    		<p className="intro"> A New Task, cool! <br />
        	    But first, can I please see some ID?
    		</p>
		<form onSubmit={handleSubmit}>
    		    <label htmlFor="userId">User ID:</label>
    		    <br />
    		    <input type="text" name="userId" onChange={handleChange}/>

    		    <br /><br />

    		    <label htmlFor="taskName">What do you want to call this task?</label>
    		    <br />
    		    <input type="text" name="taskName" onChange={handleChange} />

    		    <br /><br />

    		    <label htmlFor="dailyGoal">How many hours would you like to
		        dedicate to this task?</label>
    		    <br />
    		    <input type="text" name="dailyGoal" onChange={handleChange} />
		</form>

		<button type="submit" onClick={handleSubmit}>Create</button>
	    </main>
	) 
}
