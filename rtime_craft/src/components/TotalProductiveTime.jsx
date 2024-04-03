import React, { useState } from "react";
import "../tpt.css";

export default function TotalProductiveTime({ userId, assignUser }) {
  const [formData, setFormData] = useState({
    userId: "",
    date: "", // Removed as input for Total Productive Time might not require a specific date
  });

  const [errors, setErrors] = useState({}); // State to store validation errors
  const [message, setMessage] = useState();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setMessage();

    // Perform basic validation on change (if applicable)
    const newErrors = validateInput(name, value);
    setErrors(newErrors);
  }

  function validateInput(name, value) {
    const newErrors = { ...errors }; // Copy existing errors
    switch (name) {
      case "userId":
        if (value.length !== 36) {
          newErrors.userId = (<p className='input-error'> User ID msut be exactly 36 characters long.
		  		</p>);
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
      setMessage((<p className="input-errors">Please fix form errors before getting report:</p>));
      return; // Prevent form submission if errors exist
    }

    // Check for empty submission
    const emptyUserId = userId === "" ? validateInput('userId', formData.userId) : 0;
    if (Object.keys(emptyUserId).length > 0) {
      setMessage((<p className="input-errors">User ID can not be empty </p>));
      return;
    }

    try {
      const params = new URLSearchParams();
      if (userId === "") {
	params.append("userId", formData.userId);
      } else {
        params.append("userId", userId);
      };

      const response = await fetch("http://127.0.0.1:5001/tc/v1/total_productive_time", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });
      if (response.ok) {
        const reportJson = await response.json();
	if (reportJson.tpt !== undefined) {
	  setMessage((
		  <div>
          		<h2 className="productive-time">
            		So far, you have logged in {`${reportJson.tpt} `} hours of solid work.
            		Keep it going!
          		</h2>
        	  </div>))
	} else if (reportJson.tpt === 0) {
	  setMessage((<p> It appears this user has not been very productive :(</p>))
	} else {
	  setMessage((<p>User not found. Please check your Id and try again </p>))
	}
      } else {
        console.error("I am not okay!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
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

      {message}
    </div>
  );
}
