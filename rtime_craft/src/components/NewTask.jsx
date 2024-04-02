import React, { useState } from "react";
import "../newtask.css";

export default function NewTask({ userId, assignUser }) {
  const [formData, setFormData] = useState({
    userId: "",
    taskName: "",
    dailyGoal: 0, // Initialize as a number for validation
  });

  const [taskIsCreated, setTaskIsCreated] = useState(false);
  const [message, setMessage] = useState();
  const [taskId, setTaskId] = useState("");
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
        if (!value || value === "") {
          newErrors.userId = (<p className="input-errors">User ID cannot be empty.</p>);
        } else {
          delete newErrors.userId; // Remove error if valid
        }
        break;
      case "taskName":
        if (!value || value === "") {
          newErrors.taskName = (<p className="input-errors">Task name cannot be empty.</p>);
        } else {
          delete newErrors.taskName;
        }
        break;
      case "dailyGoal":
        const numValue = parseFloat(value);
        if (isNaN(numValue) || numValue <= 0) {
          newErrors.dailyGoal = (<p className="input-errors">Daily goal must be a positive number.</p>);
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

    // Check for empty submits
    const emptyTaskName = validateInput('taskName', formData.taskName);
    // Check for any remaining errors before submission
    const hasErrors = Object.keys(errors).length > 0;

    if (hasErrors) {
      setMessage((<p className="input-errors">Please fix form errors before creating a task.</p>));
      for (const error in errors) {
        console.error("- " + errors[error]); // Log each specific error
      }
      return; // Prevent form submission if errors exist
    };

    if (Object.keys(emptyTaskName).length > 0) {
      setMessage((<p className="input-errors"> Task name can not be empty </p>));
      return;
    };

    // Rest of your form submission logic here (unchanged)
    // ...
    try {
	const params = new URLSearchParams();
	if (userId === "") {
	  params.append('userId', formData.userId);
	} else {
	  console.log(userId);
	  params.append('userId', userId);
	}
	params.append('taskName', formData.taskName);
	params.append('dailyGoal', formData.dailyGoal);

	const response = await fetch('http://127.0.0.1:5001/tc/v1/new_task', {
		method: 'POST',
		headers: {
			    'Content-Type': 'application/x-www-form-urlencoded'
		  	 },
		body: params.toString(),
	});

	if (response.ok) {
		console.log('Form submitted successfully');
		const taskJson = await response.json();

		if (taskJson !== {}) { 
		  setTaskId(taskJson.task_id);
		  setMessage((<p>
			  The task is saved. Your Task ID is {taskId}. Keep it safe
			  </p>));
		} else {
		  setMessage((<p> Task creation failed. Try again </p>));
		};
	} else {
		console.log('Failed to submit form');
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
      
      {message};

    </main>
  );
}
