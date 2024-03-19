import React, { useState } from "react";
import "../assignuser.css";

export default function NewUser({ assignUser }) {
  const [formData, setFormData] = useState({
    userId: "",
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
      case "userId":
        if (!value) {
          newErrors.username = "User ID cannot be empty.";
        } else if (value.length < 3) {
          newErrors.username = "User ID must be at least 3 characters long.";
        } else {
          delete newErrors.username; // Remove error if valid
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
    <main className="assign-user-container">
      <h1 className="title">Assign User</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="userId">Please enter the User ID</label>
        <br />
        <input
          type="text"
          name="userId"
          onChange={handleChange}
          // Display error message below input if it exists
          aria-describedby={`userId-error ${errors.userId ? "error" : ""}`}
        />
        <br />
        <span id="userId-error" className="error-message">
          {errors.username}
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

