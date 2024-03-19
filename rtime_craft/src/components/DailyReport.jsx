import React, { useState } from "react"
import "../daily.css"

export default function DailyReport({userId, assignUser}) {
	const [formData, setFormData] = useState({
		userId: '',
		date: ''
	});

	const [report, setReport] = useState({
		weekday: '',
		ttot_day: 0,
		twt_day: 0,
		date: ''
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
		    userId === "" && assignUser(formData.userId);
		    params.append('userId', userId);
		    params.append('date', formData.date);
		    const response = await fetch(
			'http://127.0.0.1:5001/tc/v1/daily_report',
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

		setShowReport(true);
	};

	return (
	    <main className="daily-report-container">
		<h1 className="title">Daily Report</h1>
		<form onSubmit={handleSubmit}>
		    {userId === "" && (
			<div className="user-id">
    		    	    <label htmlFor="userId">Please enter the User ID:</label>
    		    	    <br />
			    <input type="text" name="userId" onChange={handleChange}/>
			    <br /><br />
			</div>
		    )}  

		    <label htmlFor="date">What day would you like to get a report for?
		    </label>
    		    <br />
    		    <input type="text" name="date" onChange={handleChange}
		       	placeholder="Eg: today OR March 4 2024" />
		    <br /><br />
		    <div className="submit">
		        <button type="submit">Get my report</button>
		    </div>
		</form>
    		
		<br /><br />
	
		{showReport && (
		    <div>
		        <h1 className="report-title">{`Date: ${report.weekday}, ${report.date}`}</h1>
    		        <p className="report-content">
        	            Productive Time: <span className="green">{`${report.ttot_day}`} hour(s) </span>
		            <br /> Good Job! <br />
        	            Wasted time: <span className="red">{`${report.twt_day}`} hour(s)</span><br />
        	            Tomorrow is always another day. Salute!
    		        </p>
		    </div>)}
	    </main>
	)
}
