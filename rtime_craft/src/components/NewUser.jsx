import React, { useState } from "react";
import "../newuser.css";

export default function NewUser({ assignUser }) {
  const [formData, setFormData] = useState({
    username: "",
    weekly_hours: 0.0,
    work_days: 0,
  });
  const [errors, setErrors] = useState({}); // State for storing validation errors

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));

    // Perform basic validation on change
    const newErrors = validateInput(name, value);
    setErrors(newErrors);
  }

  function validateInput(name, value) {
    const newErrors = { ...errors }; // Copy existing errors
    switch (name) {
      case "username":
        if (!value) {
          newErrors.username = "Username cannot be empty.";
        } else if (value.length < 3) {
          newErrors.username = "Username must be at least 3 characters long.";
        } else {
          delete newErrors.username; // Remove error if valid
        }
        break;
      case "weekly_hours":
        const numValue = parseFloat(value);
        if (isNaN(numValue) || numValue < 0) {
          newErrors.weekly_hours = "Weekly hours must be a positive number.";
        } else {
          delete newErrors.weekly_hours;
        }
        break;
      case "work_days":
        const intValue = parseInt(value);
        if (isNaN(intValue) || intValue < 0 || intValue > 7) {
          newErrors.work_days = "Work days must be a number between 0 and 7.";
        } else {
          delete newErrors.work_days;
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
      console.error("Please fix form errors before submitting.");
      return; // Prevent form submission if errors exist
    }

    // Rest of your form submission logic here (unchanged)
    // ...
  }

  return (
    <main className="new-user-container">
      <h1 className="title">New User</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">What is your name?</label>
        <br />
        <input
          type="text"
          name="username"
          onChange={handleChange}
          // Display error message below input if it exists
          aria-describedby={`username-error ${errors.username ? "error" : ""}`}
        />
        <br />
        <span id="username-error" className="error-message">
          {errors.username}
        </span>
        <br /><br />

        <label htmlFor="weekly_hours">
          How many hours would you like to work per week?
        </label>
        <br />
        <input
          type="text"
          name="weekly_hours"
          onChange={handleChange}
          aria-describedby={`weekly_hours-error ${
            errors.weekly_hours ? "error" : ""
          }`}
        />
        <br />
        <span id="weekly_hours-error" className="error-message">
          {errors.weekly_hours}
        </span>
        <br /><br />

        <label htmlFor="work_days">How many days per week do you work?</label>
        <br />
        <input
          type="text"
          name="work_days"
          onChange={handleChange}
          aria-describedby={`work_days-error ${errors.work_days ? "error" : ""}`}
        />
        <br />
        <span id="work_days-error" className="error-message">
          {errors.work_days}
        </span>
        <br /><br />

        <div className="submit">
          <button type="submit" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </form>
    </main>
  );
}

