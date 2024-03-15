import React, { useState } from "react"
import "../tpt.css"

export default function TotalProductiveTime() {
	const [formData, setFormData] = useState({
	userId: '',
	date: ''
	});

	const [report, setReport] = useState({
		tpt: 0
	});

	function handleChange(e) {
		const { name, value } = e.target;
		setFormData(prevState => ({
			...prevState,
			[name]: value,
		}));

		console.log(formData);
	};

	const [showReport, setShowReport] = useState(false)

	async function handleSubmit(e) {
		e.preventDefault();
		try {
		    const params = new URLSearchParams();
		    params.append('userId', formData.userId);
		    const response = await fetch(
			'http://127.0.0.1:5001/tc/v1/total_productive_time',
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
	    <div>
		<form onSubmit={handleSubmit} className="tpt-form">
		    <h1 className="title">Total Productive Time </h1>
		    <label htmlFor="userId">Please Enter the User ID: </label>
		    <br /><br />
		    <input type="text" name="userId" onChange={handleChange} />
		    <br /><br /><br />
		    <div className="submit">
		        <button type="submit" onClick={handleSubmit}> Get my Report!</button>
		    </div>
		</form>
		{showReport && (
		    <div>
	        	<h2 className="productive-time">So far, you have logged in {`${report.tpt} `}
							hours of solid work. Keep it going!
	        	</h2>
		    </div>
		)}
	    </div>
	)
}
