import React, { useState } from "react";
import "../ttot.css";

export default function TotalTimeOnTask() {
  const [formData, setFormData] = useState({
    taskId: "",
  });

  const [report, setReport] = useState({
    ttot: 0,
  });

  const [errors, setErrors] = useState({}); // State to store validation errors
  const [showReport, setShowReport] = useState(false);

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
        if (!value) {
          newErrors.taskId = "Task ID cannot be empty.";
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
      console.error("Please fix form errors before getting report:");
      for (const error in errors) {
        console.error("- " + errors[error]); // Log each specific error
      }
      return; // Prevent form submission if errors exist
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
        setReport(reportJson);
        console.log(reportJson);
      } else {
        console.error("I am not okay!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }

    setShowReport(true);
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

      {showReport && (
        <h1 className="task-time">
          So far, you have spent {`${report.ttot}`} hours Training. Way to go!
        </h1>
      )}
    </main>
  );
}
