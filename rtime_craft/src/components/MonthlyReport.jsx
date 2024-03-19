import React, { useState } from "react"
import "../monthly.css"

export default function MonthlyReport({userId, assignUser}) {
	const [formData, setFormData] = useState({
		userId: '',
		month: ''
	});

	const [report, setReport] = useState({
		month: 'Hi',
		year: '',
		ttot_month: 0,
		twt_month: 0
	});

	const [showReport, setShowReport] = useState(false);

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
		    params.append('month', formData.month);
		    const response = await fetch(
			'http://127.0.0.1:5001/tc/v1/monthly_report',
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
			    console.log(reportJson)
		    } else {
			    console.error("I am not okay!");
		    }

		} catch(error) {
			console.error("Error submitting form:", error);
		};

		setShowReport(true);
	};

	return (
	    <main className="monthly-report-container">
		<h1 className="monthly-title">Monthly Report </h1>
		<form onSubmit={handleSubmit}>
		    {userId === "" && (
			<div className="user-id">
    		    	    <label htmlFor="userId">Please enter the User ID:</label>
    		    	    <br /><br />
			    <input type="text" name="userId" onChange={handleChange}/>
			    <br /><br />
			</div>
		    )}

		    <label htmlFor="month" onChange={handleChange}>What month would you like to get a report for?
		    </label>
    		    <br /><br />
    		    <input type="text" name="month" placeholder="February" onChange={handleChange}/>
		    <br /> <br />
		    <div className="submit">
		        <button type="submit" onSubmit={handleSubmit}> Get my Report! </button>
		    </div>
		</form>

		{showReport && (
		    <div>
		        <h2 className="date">Date: {`${report.month}, ${report.year}`}</h2>
    		        <p>
            	           Total Productive Time: <span className="green">{`${report.ttot_month}`} hour(s).</span>
			   <br /> Way to go!<br />
            	           Total Wasted Time: <span className="red">{`${report.twt_month}`} hour(s)</span>. <br />
            	           You did good. Here is to doing better next month!
    		        </p>
		    </div>)};
	    </main>
	);
};
