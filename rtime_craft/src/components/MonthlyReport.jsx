import React, { useState } from "react"

export default function MonthlyReport() {
	const [formData, setFormData] = useState({
		userId: '',
		month: ''
	});

	const [report, setReport] = useState({
		ttot_month: 0,
		twt_month: 0
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
	};

	return (
	    <main>
		<h1 className="title">Monthly Report </h1>
		<form onSubmit={handleSubmit}>
		    <label htmlFor="userId">Can I please have some ID? </label>
		    <input type="text" name="userId" onChange={handleChange} />
		    <br />
		    <label htmlFor="month" onChange={handleChange}>What month would you like to get a report for?
		    </label>
    		    <br /><br />
    		    <input type="text" name="month" placeholder="February" onChange={handleChange}/>
		    <br /> <br />

		    <button type="submit" onSubmit={handleSubmit}> Get my Report! </button>
		</form>

		    <h2 className="date">March, 2024 </h2>
    		    <p>
            	        You have worked a total of <span className="green">{`${report.ttot_month}`} hours</span>.
			Way to go!<br />
            	        You have wasted <span className="red">{`${report.twt_month}`} hours</span>. <br />
            	        You did good. Here is to doing better next month!
    		</p>
	    </main>
	)
}
