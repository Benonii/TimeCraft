import React, { useState } from "react"
import "../twt.css"

export default function TotalWastedTime() {
	const [formData, setFormData] = useState({
		userId: '',
	});

	const [report, setReport] = useState({
		twt: 0
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
		    params.append('userId', formData.userId);
		    const response = await fetch(
			'http://127.0.0.1:5001/tc/v1/total_wasted_time',
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
	    <div>
		<form onSubmit={handleSubmit} className="twt-form">
		    <h1 className="title"> Total Wasted Time </h1>
		    <label htmlFor="userId">Can I please have some ID? </label>
		    <input type="text" name="userId" onChange={handleChange} />
		    <br />
		    <div className="sumbit">
		        <button type="sumbit" onClick={handleSubmit}>Get my Report!</button>
		    </div>
		</form>

		{showReport && (
		    <div>
			<h4 className="waste-report">So far, you have wasted <span className="wasted-time">
			{` ${report.twt} `} hours.<br /></span>Remember, it's about progress not perfection. Keep 			  going!</h4>
		    </div>
		)}
	    </div>
	)
}
