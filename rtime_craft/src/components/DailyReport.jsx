import React, { useState } from "react"
import "../daily.css"

export default function DailyReport() {
	const [formData, setFormData] = useState({
		userId: '',
		date: ''
	});

	const [report, setReport] = useState({
		ttot_day: 0,
		twt_day: 0
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
	};

	return (
	    <main className="daily=report-container">
		<h1 className="title">Daily Report</h1>
		<form onSubmit={handleSubmit}>
		    <label htmlFor="userId">Can I please have some ID? </label>
		    <input type="text" name="userId" onChange={handleChange} />
		    <br />
		    <label htmlFor="date">What day would you like to get a report for?
		    </label>
    		    <br />
    		    <input type="text" name="date" onChange={handleChange}
		       	placeholder="Eg: today OR March 4 2024" />

		    <button type="submit">Get my report</button>
		</form>
    		
		<br /><br />

    		<h1 className="report-title">Tuesday, March 5 2024:</h1>
    		<p className="report-content"> You spent <span className="green">{`${report.ttot_day}`} hours</span> on Training toady <br />
        	    You spent <span className="green">{`${report.twt_day}`} hours</span> on sparring today <br />
        	    You have been productive for <span className="green">{`${report.ttot_day}`} hours </span>
		    today. Good Job! <br />
        	    You have wasted <span className="red">{`${report.twt_day}`} hours</span> today. <br />
        	    Tomorrow is always another day. Salute!
    		</p>
	    </main>
	)
}
