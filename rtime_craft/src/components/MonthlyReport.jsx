import React, { useState } from "react";
import "../monthly.css"; // Import for monthly report styles

export default function MonthlyReport({ userId, assignUser }) {
  const [formData, setFormData] = useState({
    userId: "",
    month: "",
  });

  const [message, setMessage] = useState();
  const [errors, setErrors] = useState({});

  function handleChange(e) {
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
      case "month":
	const months = ["January", "February", "March",
			"April", "May", "June", "July",
			"August", "September", "October",
			"November", "December"];

	if (!months.includes(value)) {
	  newErrors.month = (<p className="input-error"> Enter a valid month
		  					(Make sure to capitalize the first letter)
		  	    </p>)
	} else {
	  delete newErrors.month;
	}	
        break;

      default:
        break;
    }
    return newErrors;
  }


  async function handleSubmit(e) {
    e.preventDefault();

    // Checks for any errors before submitting
    const hasErrors = Object.keys(errors).length > 0;
    if (hasErrors) {
      setMessage((<p className="input-errors"> Please fix all form errors before getting report</p>))
      return;
    }

    // Checks for empty submissions
    const emptyUserId = userId === "" ? validateInput('userId', formData.userId) : 0;
    const emptyMonth = validateInput('month', formData.month);

    if (Object.keys(emptyUserId).length > 0) {
      setMessage((<p className="input-errors">User ID can not be empty</p>))
      return;
    }
    if (Object.keys(emptyMonth).length > 0) {
      setMessage((<p className="input-errors">Month can not be empty</p>))
      return;
    }

    try {
      const params = new URLSearchParams();
      if (userId === "") {
	params.append('userId', formData.userId);
      } else {
      	  params.append("userId", userId);
      }
      params.append("month", formData.month);

      const response = await fetch(
        "http://127.0.0.1:5001/tc/v1/monthly_report",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: params.toString(),
        }
      );

      if (response.ok) {
        const reportJson = await response.json();
	if (reportJson.month !== undefined) {
	  setMessage((
	  	 <div>
          	   <h2 className="date">Date: {`${reportJson.month}, ${reportJson.year}`}</h2>
          	   <p>
            	   Total Productive Time: <span className="green">{`${reportJson.ttot_month}`} hour(s).
		  </span>
            	   <br /> Way to go!
            	   <br />
            	   Total Wasted Time: <span className="red">{`${reportJson.twt_month}`} hour(s)</span>.
            	   <br /> You did good. Here is to doing better next month!
          	   </p>
        	</div>))
	} else {
	  setMessage((<p> Looks like this user has no activity for {`${formData.month}`}. 
		  	  Try another month.</p>));
	}
      } else {
        console.error("I am not okay!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <main className="monthly-report-container">
      <h1 className="monthly-title">Monthly Report</h1>
      <form onSubmit={handleSubmit}>
        {userId === "" && (
          <div className="user-id">
            <label htmlFor="userId">Please enter the User ID:</label>
            <br /><br />
            <input type="text" name="userId" onChange={handleChange} />
	    {errors.userId && <span className="error-message">{errors.userId}</span>}
            <br /><br />
          </div>
        )}

        <label htmlFor="month">What month would you like to get a report for?</label>
        <br /><br />
        <input type="text" name="month" placeholder="February" onChange={handleChange} />
	{errors.month && <span className='error-message'>{errors.month}</span>}
        <br /> <br />
        <div className="submit">
          <button type="submit" onSubmit={handleSubmit}> Get my Report! </button>
        </div>
      </form>

      {message}
    </main>
  );
}
