import React, { useState } from "react";
import "../newlog.css";

export default function NewLog() {
  const [formData, setFormData] = useState({
    taskId: "",
    timeOnTask: "",
    timeWasted: "",
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
    let numValue = 0;
    switch (name) {
      case "taskId":
        if (value.length !== 36) {
          newErrors.taskId = (<p className="input-error">Task ID must be exactly 36 characters.</p>);
        } else {
          delete newErrors.taskId;
        }
        break;
      case "timeOnTask":
         numValue = parseFloat(value);
        if (isNaN(numValue) || numValue < 0) {
          newErrors.timeOnTask = (<p className="input-error">
		  Time spent on task must be a non-negative number.</p>)
        } else {
          delete newErrors.timeOnTask;
        }
        break;
      case "timeWasted":
        numValue = parseFloat(value);
        if (isNaN(numValue) || numValue < 0) {
          newErrors.timeWasted = (<p className="input-error">
		  Time wasted must be a non-negative number.</p>)
        } else {
          delete newErrors.timeWasted;
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
      setMessage((<p className="input-errors">Please fix form errors before logging</p>));
      for (const error in errors) {
        console.error("- " + errors[error]); // Log each specific error
      }
      return; // Prevent form submission if errors exist
    }

    // Check for empty submission
    const emptyTaskId = validateInput('taskId', formData.taskId);
    const emptyTimeOnTask = validateInput('timeOnTask', formData.timeOnTask);
    const emptyTimeWasted = validateInput('timeWasted', formData.timeWasted);
    if (Object.keys(emptyTaskId).length > 0) {
      setMessage((<p className="input-errors">Task ID can not be empty </p>))
      return;
    }
    if (Object.keys(emptyTimeOnTask).length > 0) {
      setMessage((<p className="input-errors">Time on task can not be empty </p>))
      return;
    }
    if (Object.keys(emptyTimeWasted).length > 0) {
      setMessage((<p className="input-errors">Time Wasted can not be empty </p>))
      return;
    }

    try {
			const params = new URLSearchParams();
			params.append('taskId', formData.taskId)
			params.append('timeOnTask', formData.timeOnTask)
			params.append('timeWasted', formData.timeWasted)

			const response = await fetch ("http://127.0.0.1:5001/tc/v1/new_log", {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: params.toString(),
				});

				if (response.ok) {
					const reportJson = await response.json();
					if (reportJson.log_date !== undefined) {
					  setMessage((<p>
						  Log recorded.<br />
						  Log Date: <b> {`${reportJson.log_date}`} </b>
						  </p>))
					} else {
					  setMessage((<p> Failed to record log. Please try again </p>))
					}
				} else {
					console.error("Failed to submit form")
				};
		} catch(e) {
			console.error("Error submitting form:", e);
		}
  }

  return (
    <main className="new-log-container">
      <h1 className="title">New Log</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="taskId">What is the Task ID?</label>
        <br />
        <input type="text" name="taskId" onChange={handleChange} />
        {errors.taskId && <span className="error-message">{errors.taskId}</span>}
 	<br />

        <label htmlFor="timeOnTask">
          How much time did you spend on this task today?
        </label>
        <br />
        <input type="text" name="timeOnTask" onChange={handleChange} />
        {errors.timeOnTask && <span className="error-message">{errors.timeOnTask}</span>}
        <br />

        <label htmlFor="timeWasted">
          How much time have you wasted today?
          <br />
          (It's okay, I won't judge)
        </label>
        <br />

	<input type="text" name="timeWasted" onChange={handleChange} />
        {errors.timeWasted && <span className="error-message">{errors.timeWasted}</span>}
        <br />

        <div className="submit">
          <button type="submit" onClick={handleSubmit}>
            Log
          </button>
        </div>
      </form>
      {message}
    </main>
  );
}

