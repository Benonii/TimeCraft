import React, { useState } from "react";
import "../daily.css";

export default function DailyReport({ userId, assignUser }) {
  const [formData, setFormData] = useState({
    userId: "",
    date: " ",
  });

  const [errors, setErrors] = useState({}); // State for storing validation errors
  const [message, setMessage] = useState();

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
        if (value.length !== 36) {
          newErrors.userId = (<p className="input-error">User ID must be exactly 36 characters</p>);
        } else {
          delete newErrors.userId;
        }
        break;
      case "date":
	if (value !== "today" && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
	  newErrors.date = (<p className="input-error"> Please match the format specified in the example
		  	    </p>)
	} else {
	  delete newErrors.date;
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
      setMessage((<p className="input-errors">Please fix form errors before getting report</p>));
      return; // Prevent form submission if errors exist
    }

    // Check for empty submits
    const emptyUserId = userId === "" ? validateInput('userId', formData.userId): 0;
    const emptyDate = validateInput('date', formData.date);
    
    if (Object.keys(emptyUserId).length > 0) {
      setMessage((<p className="input-errors"> User ID can not be emtpy</p>));
      return; // Prevent form submission if errors exist
    }

    if (Object.keys(emptyDate).length > 0) {
      setMessage((<p className="input-errors">Date can not be empty</p>));
      return; // Prevent form submission if errors exist
    }
    try {
		    const params = new URLSearchParams();
	    	    userId === ""
	    		? params.append('userId', formData.userId)
	    		: params.append('userId', userId);
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
			    if (reportJson.date !== undefined) {
			      setMessage(
				      <div>
         	 			<h1 className="report-title">
				      		{`Date: ${reportJson.date}`}</h1>
          				<p className="report-content">
            				Productive Time:
				      <span className="green">{` ${reportJson.ttot_day}`} hour(s)
				      </span>
            				<br /> Good Job! <br />
            				Wasted time:
				      <span className="red">{` ${reportJson.twt_day}`} hour(s)</span>
				      <br />
            				Tomorrow is always another day. Salute!
          				</p>
        			      </div>)
			    } else {
			      setMessage(<p>
				      Looks like there is no activity for that date.<br />
				      Try another date</p>);
			    }
		    } else {
			    console.error("I am not okay!");
		    }

		} catch(error) {
			console.error("Error submitting form:", error);
		};
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
	    {errors.userId && <span className="error-message">{errors.userId}</span>}

            <br />
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
          placeholder="Eg: today OR 2024-03-04"
        />
        <br />
        {errors.date && <span className="error-message">{errors.date}</span>}

        <div className="submit">
          <button type="submit">Get my report</button>
        </div>
      </form>

      {message}
    </main>
  );
}

