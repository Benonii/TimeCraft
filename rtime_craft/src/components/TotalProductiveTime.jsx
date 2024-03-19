import React, { useState } from "react";
import "../tpt.css";

export default function TotalProductiveTime({ userId, assignUser }) {
  const [formData, setFormData] = useState({
    userId: "",
    date: "", // Removed as input for Total Productive Time might not require a specific date
  });

  const [report, setReport] = useState({
    tpt: 0,
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
      case "userId":
        if (!value) {
          newErrors.userId = "User ID cannot be empty.";
        } else {
          delete newErrors.userId;
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
      params.append("userId", formData.userId);
      const response = await fetch("http://127.0.0.1:5001/tc/v1/total_productive_time", {
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
    <div>
      <form onSubmit={handleSubmit} className="tpt-form">
        <h1 className="title">Total Productive Time</h1>
        {userId === "" && (
          <div>
            <label htmlFor="userId">Please enter the User ID</label>
            <br /><br />
            <input type="text" name="userId" onChange={handleChange} />
            <br /><br />
            {errors.userId && <span className="error-message">{errors.userId}</span>}
          </div>
        )}
        <br /><br /><br />
        <div className="submit">
          <button type="submit" onClick={handleSubmit}>
            Get my Report!
          </button>
        </div>
      </form>
      {showReport && (
        <div>
          <h2 className="productive-time">
            So far, you have logged in {`${report.tpt} `} hours of solid work.
            Keep it going!
          </h2>
        </div>
      )}
    </div>
  );
}
