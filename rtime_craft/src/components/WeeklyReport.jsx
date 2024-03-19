import React, { useState } from "react"
import "../weekly.css"

export default function WeeklyReport({userId, assignUser}) {
	const [formData, setFormData] = useState({
		userId: '',
		week: '',
		dateOfWeek: ''
	});

	const [report, setReport] = useState({
		start_date: '',
		end_date: '',
		ttot_week: 0,
		twt_week: 0
	});

	const [showReport, setShowReport] = useState(false)

	const [isCustom, setIsCustom] = useState(false);

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
			params.append('week', formData.week);
		    params.append('dateOfWeek', formData.dateOfWeek)
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

		setShowReport(true)
	};

	function handleCustom() {
		setIsCustom(true);
		setFormData(prevState => ({
			...prevState,
			week: 'custom',
		}));
	}

	return (
	    <main className="weekly-report-container">
		<h1 className="title"> Weekly Report </h1>
		<form onSubmit={handleSubmit}>
		    {userId === "" && (
			<div className="user-id">
    		    	    <label htmlFor="userId">Please enter the User ID:</label>
    		    	    <br /><br />
			    <input type="text" name="userId" onChange={handleChange}/>
			    <br /><br />
			</div>
		    )}  

		    <label htmlFor="week">What week would you like to get a report for?</label>
		    <br />
        	        <div className="week-choice">
               		    <button type="button" className="week-btn"
						  onClick={() => setFormData({
								...formData,
								week: 'this_week',
								})}>
				This Week</button>
            		    <button type="button" className="week-btn"
						  onClick={() => setFormData({
								...formData,
								week: 'last_week',
								})}>
				Last Week</button>
            		    <button type="button" className="week-btn" onClick={handleCustom}>
				Custom</button>
        	        </div>
		    {isCustom && (
		    <div>
			 <label htmlFor="dateOfWeek"> Enter a custom Date: </label>
			 <br />
    		         <input type="text" name="dateOfWeek" onChange={handleChange} />
		    </div>)}
    		    <br /><br />
		    <div className="submit">
		        <button type="submit" onSubmit={handleSubmit}>Get my Report</button>
		    </div>

		</form>
    		
		{showReport && (
			<div>
		            <p className="date">{`Start Date: ${report.start_date}`}</p>
    		    	    <p className="date">{`End Date: ${report.end_date}`}</p>

    			    <p> Total Productive Time: <span className="green">{`${report.ttot_week} `} 
				hour(s)</span> 
		    	    <br />
        	    	    Total Wasted Time: <span className="red">{`${report.twt_week}`} hours</span><br />
        	    	    You can't be perfect, but you can be better! <br />
        	    	    See you next week! <br />
    			    </p>
			</div>
		)}
	    </main>
	);
}
