import React, { useState } from "react";
import "../ttot.css";

export default function TotalTimeOnTask() {
  const [formData, setFormData] = useState({
    taskId: "",
  });

  const [errors, setErrors] = useState({}); // State to store validation errors
  const [message, setMessage] = useState();

  function handleChange(e) {
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
      case "taskId":
        if (value.length !== 36) {
          newErrors.taskId = (<p className="input-error">Task ID must be exactly 36 characters long.</p>);
        } else {
          delete newErrors.taskId;
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
   const emptyTaskId = validateInput('taskId', formData.taskId);
   if (Object.keys(emptyTaskId).length > 0) {
     setMessage((<p className="input-errors">User ID can not be empty</p>));
     return;
  }

    try {
      const params = new URLSearchParams();
      params.append("taskId", formData.taskId);
      const response = await fetch("http://127.0.0.1:5001/tc/v1/total_time_on_task", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });
      if (response.ok) {
        const reportJson = await response.json();
	if (reportJson.ttot !== undefined) {
	  setMessage((
		<h1 className="task-time">
          	So far, you have spent {`${reportJson.ttot}`} hours on {`${reportJson.taskName}`}.
		Way to go!
        	</h1>
	  ))
	} else {
	  setMessage((<p> Could not find that task. Please check your ID and try again </p>))
	}
      } else {
        console.error("I am not okay!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <main className="total-time-on-task-container">
      <form onSubmit={handleSubmit} className="ttot-form">
        <h1 className="task-title">Total Time on Task</h1>
        <label htmlFor="task-id">Can I please have the Task ID?</label>
        <br /><br />
        <input type="text" name="taskId" onChange={handleChange} />
        <br /><br />
        {errors.taskId && <span className="error-message">{errors.taskId}</span>}
        <div className="submit">
          <button type="submit" onClick={handleSubmit}>
            Get my Report!
          </button>
        </div>
      </form>

      {message}
    </main>
  );
}
