import React, { useState } from "react";
import "../assignuser.css";

export default function AssignUser({ assignUser }) {
  const [formData, setFormData] = useState({
    userId: "",
  });
  const [errors, setErrors] = useState({}); // State for storing validation errors
  const [message, setMessage] = useState();

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
          newErrors.username = (<p className="input-error">User ID cannot be empty.</p>);
        } else if (value.length !== 36) {
          newErrors.username = (<p className="input-error">User ID must be exactly 36 characters long.</p>);
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
      setMessage(<p className="input-errors"> Please fix form errors before submitting.</p>);
      return; // Prevent form submission if errors exist
    }

    try {
      const userName = await assignUser(formData.userId);
      userName.name === undefined 
        ? setMessage(<p className="input-error">
		Could not find that user. Please check your ID and try again. </p>)
        : setMessage(<p> Default user set to <b>{`${userName.name}`}</b></p>);	
    } catch (error) {
	console.error('Error submitting form:', error);
    }
  };

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
      {message}
    </main>
  );
}
