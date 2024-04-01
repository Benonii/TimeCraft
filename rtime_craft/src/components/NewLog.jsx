import React, { useState } from "react";
import "../newlog.css";

export default function NewLog() {
  const [formData, setFormData] = useState({
    taskId: "",
    timeOnTask: "",
    timeWasted: "",
  });
  const [errors, setErrors] = useState({}); // State for storing validation errors

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
      case "taskId":
        if (!value) {
          newErrors.taskId = "Task ID cannot be empty.";
        } else {
          delete newErrors.taskId;
        }
        break;
      case "timeOnTask":
        const numValue = parseFloat(value);
        if (isNaN(numValue) || numValue < 0) {
          newErrors.timeOnTask = "Time spent on task must be a non-negative number.";
        } else {
          delete newErrors.timeOnTask;
        }
        break;
      case "timeWasted":
        numValue = parseFloat(value);
        if (isNaN(numValue) || numValue < 0) {
          newErrors.timeWasted = "Time wasted must be a non-negative number.";
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
      console.error("Please fix form errors before logging:");
      for (const error in errors) {
        console.error("- " + errors[error]); // Log each specific error
      }
      return; // Prevent form submission if errors exist
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
				mode: 'no-cors'
				});

				if (response !== {}) {
					console.log("Form submitted successfully")
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
        <br /><br />
        {errors.taskId && <span className="error-message">{errors.taskId}</span>}

        <label htmlFor="timeOnTask">
          How much time did you spend on web-designing today?
        </label>
        <br />
        <input type="text" name="timeOnTask" onChange={handleChange} />
        <br /><br />
        {errors.timeOnTask && <span className="error-message">{errors.timeOnTask}</span>}

        <label htmlFor="timeWasted">
          How much time have you wasted today?
          <br />
          (It's okay, I won't judge)
        </label>
        <br />
        <input type="text" name="timeWasted" onChange={handleChange} />
        <br /><br />
        {errors.timeWasted && <span className="error-message">{errors.timeWasted}</span>}

        <div className="submit">
          <button type="submit" onClick={handleSubmit}>
            Log
          </button>
        </div>
      </form>
    </main>
  );
}

