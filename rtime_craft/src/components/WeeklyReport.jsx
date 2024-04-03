import React, { useState } from "react";
import "../weekly.css";

export default function WeeklyReport({ userId, assignUser }) {
  const [formData, setFormData] = useState({
    userId: "",
    week: "", // Initial value for handling custom week selection
    dateOfWeek: "",
  });

  const [errors, setErrors] = useState({}); // State for storing validation errors
  const [isCustom, setIsCustom] = useState(false);
  const [message, setMessage] =  useState();

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
        if (value.length !== 36) {
          newErrors.userId = (<p className="input-error">User ID has to be exactly 36 characters</p>);
        } else {
          delete newErrors.userId;
        }
        break;
      case "dateOfWeek":
        if ((isCustom && !value) || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
          newErrors.dateOfWeek = (<p className="input-error">
		  Invalid date format. Use YYYY-MM-DD (e.g., 2024-03-19).</p>)
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
      setMessage((<p className="input-errors">Please fix form errors before getting report.</p>));
      return; // Prevent form submission if errors exist
    }
    
    // Check for empty submissions
    const emptyUserId = userId === "" ? validateInput('userId', formData.userId) : 0;
    const emptyWeek = validateInput('week', formData.week);
    const emptyDateOfWeek = isCustom ? validateInput('dateOfWeek', formData.dateOfWeek)  					      	       : 0;
    if (Object.keys(emptyUserId).length > 0) {
      setMessage((<p className="input-errors">User Id can not be empty</p>));
      return; // prevent form submission if errors exist
    }

    if (Object.keys(emptyWeek).length > 0) {
      setMessage((<p classname="input-errors">Please choose between the options</p>));
      return; // prevent form submission if errors exist
    }
    
    if (Object.keys(emptyDateOfWeek).length > 0) {
      setMessage((<p className="input-errors">Custom Date can not be empty</p>));
      return; // prevent form submission if errors exist
    }

    try {
	const params = new URLSearchParams();
	if (userId === "") {
	  params.append('userId', formData.userId);
	} else {
	  params.append('userId', userId);
	}
	params.append('week', formData.week);
	isCustom && params.append('dateOfWeek', formData.dateOfWeek);

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
	    if (reportJson.start_date !== undefined) {
	      setMessage((
	          <div>
        	    <p className="date">{`Start Date: ${reportJson.start_date}`}</p>
	       	   <p className="date">{`End Date: ${reportJson.end_date}`}</p>

	            <p>
	              Total Productive Time: <span className="green">{`${reportJson.ttot_week} `}</span>
		      hour(s)
        	      <br />
        	      Total Wasted Time: <span className="red">{`${reportJson.twt_week}`} hours</span>
		      <br />
        	      You can't be perfect, but you can be better! <br />
        	      See you next week! <br />
        	    </p>
        	  </div>
	      ))
	    } else {
	      setMessage((<p> Could not find a report for that week. Please try again</p>));
	    }
	} else {
	    console.error("I am not okay!");
	}

    } catch(error) {
	console.error("Error submitting form:", error);
    };
  }

  function handleCustom() {
    // const value = e.target.value;
    setIsCustom(true);
    setMessage();
    setFormData((prevState) => ({
      ...prevState,
      week: "custom",
      // dateOfWeek: value
    }));
   // const dateError =  validateInput('dateOfWeek', formData.dateOfWeek);
   // setErrors(dateError);
    
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
	    {errors.userId && <span className="error-message">{errors.userId}</span>}
            <br /><br />
          </div>
        )}

        <label htmlFor="week">What week would you like to get a report for?</label>
        <br />
        <div className="week-choice">
  	  <input
    	    type="radio"
	    id="thisWeek"
	    name="week"
	    value="this_week"
	    onChange={() => { 
             setFormData({ 
               ...formData, 
               week: "this_week", 
             })
	     setIsCustom(false);
	     setMessage();
	    }
           } 
	  />
	  <label htmlFor="thisWeek">This Week</label>
	  <br />
	  <input
	    type="radio"
	    id="lastWeek"
	    name="week"
	    value="last_week"
	    onChange={() => { 
             setFormData({ 
               ...formData, 
               week: "last_week", 
             })
	     setIsCustom(false);
	     setMessage();
	    }
           }  
	  />
	  <label htmlFor="lastWeek">Last Week</label>
	  <br />
	  <input
	    type="radio"
	    id="customWeek"
	    name="week"
	    value="custom"
	    onChange={handleCustom}
	  />
	  <label htmlFor="customWeek">Custom</label>
	  <br />
	</div>
        {isCustom && (
          <div>
            <label htmlFor="dateOfWeek"> Enter a custom date: </label>
            <br />
            <input type="text" name="dateOfWeek" onChange={handleChange} />
            <br /><br />
            {errors.dateOfWeek && <span className="error-message">{errors.dateOfWeek}</span>}
          </div>
        )}
	{errors.week && <span className="error-message">{errors.week}</span>}
        <br /><br />
        <div className="submit">
          <button type="submit" onSubmit={handleSubmit}>Get my Report</button>
        </div>
      </form>

      {message}
    </main>
  );
}
