import React, { useState } from "react";
import "../weekly.css";

export default function WeeklyReport({ userId, assignUser }) {
  const [formData, setFormData] = useState({
    userId: "",
    week: "", // Initial value for handling custom week selection
    dateOfWeek: "",
  });
  const [report, setReport] = useState({
    start_date: "",
    end_date: "",
    ttot_week: 0,
    twt_week: 0,
  });
  const [errors, setErrors] = useState({}); // State for storing validation errors
  const [showReport, setShowReport] = useState(false);
  const [isCustom, setIsCustom] = useState(false);

  function handleChange(e) {
    e.preventDefault(); // Prevent unnecessary default behavior
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Perform basic validation on change (if applicable)
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
      case "dateOfWeek":
        if (isCustom && (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value))) {
          newErrors.dateOfWeek = "Invalid date format. Use YYYY-MM-DD (e.g., 2024-03-19).";
        } else {
          delete newErrors.dateOfWeek;
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

    setShowReport(true);
  }

  function handleCustom() {
    setIsCustom(true);
    setFormData((prevState) => ({
      ...prevState,
      week: "custom",
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
            <input type="text" name="userId" onChange={handleChange} />
            <br /><br />
          </div>
        )}

        <label htmlFor="week">What week would you like to get a report for?</label>
        <br />
        <div className="week-choice">
          <button
            type="button"
            className="week-btn"
            onClick={() =>
              setFormData({
                ...formData,
                week: "this_week",
              })
            }
          >
            This Week
          </button>
          <button
            type="button"
            className="week-btn"
            onClick={() =>
              setFormData({
                ...formData,
                week: "last_week",
              })
            }
          >
            Last Week
          </button>
          <button type="button" className="week-btn" onClick={handleCustom}>
            Custom
          </button>
        </div>
        {isCustom && (
          <div>
            <label htmlFor="dateOfWeek"> Enter a custom Date: </label>
            <br />
            <input type="text" name="dateOfWeek" onChange={handleChange} />
            <br /><br />
            {errors.dateOfWeek && <span className="error-message">{errors.dateOfWeek}</span>}
          </div>
        )}
        <br /><br />
        <div className="submit">
          <button type="submit" onSubmit={handleSubmit}>Get my Report</button>
        </div>
      </form>

      {showReport && (
        <div>
          <p className="date">{`Start Date: ${report.start_date}`}</p>
          <p className="date">{`End Date: ${report.end_date}`}</p>

          <p>
            Total Productive Time: <span className="green">{`${report.ttot_week} `}</span> hour(s)
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
