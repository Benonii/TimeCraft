import React, { useState } from "react"
import "../weekly.css"

export default function WeeklyReport() {
	const [formData, setFormData] = useState({
		userId: '',
		week: ''
	});

	const [report, setReport] = useState({
		ttot_week: 0,
		twt_week: 0
	});

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
		    params.append('userId', formData.userId);
		    params.append('week', formData.week);
		    const response = await fetch(
			'http://127.0.0.1:5001/tc/v1/weekly_report',
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
	};
	return (
	    <main className="weekly-report-container">
		<h1 className="title"> Weekly Report </h1>
		<form onSubmit={handleSubmit}>
		    <label htmlFor="userId">Can I please have some ID? </label>
		    <input type="text" name="userId" onChange={handleChange} />
		    <br /><br />
		    <label htmlFor="week">What week would you like to get a report for?
		    <br />
        	        <ol>
               		    <li>This Week</li>
            		    <li>Last Week</li>
            		    <li>Custom</li>
        	        </ol>
    		    </label>
    		<input type="text" name="week" onChange={handleChange}/>

    		    <br /><br />
		<button type="submit" onSubmit={handleSubmit}>Get my Report</button>
		</form>
    		
		<p className="date">Start Date: March 4, 2024</p>
    		<p className="date">End Date: March 10, 2024</p>

    		<p> This week you spent <span className="green">{`${report.ttot_week}`} hours</span> working 
		    <br />
        	    And you wasted a total of <span className="red">{`${report.twt_week}`} hours</span><br />
        	    You can't be perfect, but you can be better! <br />
        	    See you next week! <br />
    		</p>
	    </main>
	);
}
