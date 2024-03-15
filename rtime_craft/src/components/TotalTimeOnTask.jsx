import React, { useState } from "react"
import "../ttot.css"

export default function TotalTimeOnTask() {
	const [formData, setFormData] = useState({
		taskId: '',
	});

	const [report, setReport] = useState({
		ttot: 0
	});

	const [showReport, setShowReport] = useState(false)

	function handleChange(e) {
		const { name, value } = e.target;
		setFormData(prevState => ({
			...prevState,
			[name]: value,
		}));

		console.log(formData);
	};

	async function handleSubmit(e) {
		e.preventDefault();
		try {
		    const params = new URLSearchParams();
		    params.append('taskId', formData.taskId);
		    const response = await fetch(
			'http://127.0.0.1:5001/tc/v1/total_time_on_task',
			{
			    method: 'POST',
			    headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
				},
			    body: params.toString(),
			});
		    if (response.ok) {
			    const reportJson =  await response.json();
			    setReport(reportJson)
			    console.log(report)
		    } else {
			    console.error("I am not okay!");
		    }
		
		} catch(error) {
			console.error("Error submitting form:", error);
		};
		setShowReport(true)
	};

	return (
	    <main className="total-time-on-task-container">
		<form onSubmit={handleSubmit} className="ttot-form">
		    <label htmlFor="task-id">Can I please have the Task ID?</label>
    		    <br /><br />
    		    <input type="text" name="taskId" onChange={handleChange} />

    		    <br /><br />

		    <div className="submit">
		        <button type="submit" onClick={handleSubmit}>Get my Report!</button>
		    </div>
		</form>

		{showReport && (
    		<h1 className="task-time">So far, you have spent {`${report.ttot}`} hours Training. Way to go!
		</h1>
		)}
	    </main>
	);
};
