import React, { useState } from "react";
import "../daily.css";

export default function DailyReport({ userId, assignUser }) {
  const [formData, setFormData] = useState({
    userId: "",
    date: "",
  });
  const [report, setReport] = useState({
    weekday: "",
    ttot_day: 0,
    twt_day: 0,
    date: "",
  });
  const [errors, setErrors] = useState({}); // State for storing validation errors
  const [showReport, setShowReport] = useState(false);

  function handleChange(e) {
    e.preventDefault(); // Prevent unnecessary default behavior
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Perform basic validation on change
    const newErrors = validateInput(name, value);
    setErrors(newErrors);
  }

  function validateInput(name, value) {
    const newErrors = { ...errors }; // Copy existing errors
    switch (name) {
      case "userId":
        if (!value) {
          newErrors.userId = "User ID cannot be empty.";
        } else {
          delete newErrors.userId;
        }
        break;
      default:
        break;
    }
    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Check for any remaining errors before submission
    const hasErrors = Object.keys(errors).length > 0;
    if (hasErrors) {
      console.error("Please fix form errors before getting report:");
      for (const error in errors) {
        console.error("- " + errors[error]); // Log each specific error
      }
      return; // Prevent form submission if errors exist
    }

    try {
		    const params = new URLSearchParams();
		    params.append('userId', formData.userId);
		    params.append('date', formData.date);
		    const response = await fetch(
			'http://84.204.6.209:5001/tc/v1/daily_report',
			{
			    method: 'POST',
			    headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
				},
			    body: params.toString(),
			});
		    if (response.ok) {
			    const reportJson =  await response.json();
			    if (reportJson !== {}) {
			      setReport(reportJson)
			    } 
			    console.log(report)
		    } else {
			    console.error("I am not okay!");
		    }

		} catch(error) {
			console.error("Error submitting form:", error);
		};
    setShowReport(true);
  }

  return (
    <main className="daily-report-container">
      <h1 className="title">Daily Report</h1>
      <form onSubmit={handleSubmit}>
        {userId === "" && (
          <div className="user-id">
            <label htmlFor="userId">Please enter the User ID:</label>
            <br />
            <input type="text" name="userId" onChange={handleChange} />
            <br /><br />
          </div>
        )}

        <label htmlFor="date">
          What day would you like to get a report for?
        </label>
        <br />
        <input
          type="text"
          name="date"
          onChange={handleChange}
          placeholder="Eg: today OR March 4 2024"
        />
        <br /><br />
        {errors.date && <span className="error-message">{errors.date}</span>}

        <div className="submit">
          <button type="submit">Get my report</button>
        </div>
      </form>

      {showReport ? (
        <div>
          <h1 className="report-title">{`Date: ${report.weekday}, ${report.date}`}</h1>
          <p className="report-content">
            Productive Time: <span className="green">{`${report.ttot_day}`} hour(s) </span>
            <br /> Good Job! <br />
            Wasted time: <span className="red">{`${report.twt_day}`} hour(s)</span><br />
            Tomorrow is always another day. Salute!
          </p>
        </div>
      ) : (<p> No report to show </p>)}
    </main>
  );
}

