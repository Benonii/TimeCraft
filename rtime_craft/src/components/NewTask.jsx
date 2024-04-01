import React, { useState } from "react";
import "../newtask.css";

export default function NewTask({ userId, assignUser }) {
  const [formData, setFormData] = useState({
    userId: "",
    taskName: "",
    dailyGoal: 0, // Initialize as a number for validation
  });
  const [errors, setErrors] = useState({}); // State for storing validation errors

  function handleChange(e) {
    e.preventDefault(); // Prevent unnecessary default behavior
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
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
          delete newErrors.userId; // Remove error if valid
        }
        break;
      case "taskName":
        if (!value) {
          newErrors.taskName = "Task name cannot be empty.";
        } else {
          delete newErrors.taskName;
        }
        break;
      case "dailyGoal":
        const numValue = parseFloat(value);
        if (isNaN(numValue) || numValue <= 0) {
          newErrors.dailyGoal = "Daily goal must be a positive number.";
        } else {
          delete newErrors.dailyGoal;
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
      console.error("Please fix form errors before creating a task:");
      for (const error in errors) {
        console.error("- " + errors[error]); // Log each specific error
      }
      return; // Prevent form submission if errors exist
    }

    // Rest of your form submission logic here (unchanged)
    // ...
    try {
	const params = new URLSearchParams();
	userId === "" && assignUser(formData.userId);
	params.append('userId', userId);
	params.append('taskName', formData.taskName);
	params.append('dailyGoal', formData.dailyGoal);

	const response = await fetch('http://127.0.0.1:5001/tc/v1/new_task', {
		method: 'POST',
		headers: {
			    'Content-Type': 'application/x-www-form-urlencoded'
		  	 },
		body: params.toString(),
		mode: 'no-cors'
	});

	if (response !== {}) {
		console.log('Form submitted successfully');
	} else {
		console.error('Failed to submit form');
	}
    } catch (error) {
	console.error('Error submitting form:', error);
    }
  }

  return (
    <main className="new-task-container">
      <h1 className="task-title">New Task</h1>
      <form onSubmit={handleSubmit}>
        {userId === "" && (
          <div className="user-id">
            <p className="task-intro">
              A New Task, cool! <br /> But first, can I please see some ID?
            </p>
            <label htmlFor="userId">User ID:</label>
            <br />
            <input type="text" name="userId" onChange={handleChange} />
            <br /><br />
            {errors.userId && <span className="error-message">{errors.userId}</span>}
          </div>
        )}

        <label htmlFor="taskName">What do you want to call this task?</label>
        <br />
        <input type="text" name="taskName" onChange={handleChange} />
        <br /><br />
        {errors.taskName && <span className="error-message">{errors.taskName}</span>}

        <label htmlFor="dailyGoal">
          How many hours would you like to dedicate to this task?
        </label>
        <br />
        <input type="text" name="dailyGoal" onChange={handleChange} />
        <br /><br />
        {errors.dailyGoal && <span className="error-message">{errors.dailyGoal}</span>}

        <div className="submit">
          <button type="submit" onClick={handleSubmit}>
            Create
          </button>
        </div>
      </form>
    </main>
  );
}
