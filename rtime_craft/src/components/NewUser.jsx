import React, { useState } from 'react';
import '../newuser.css';

export default function NewUser ({ assignUser }) {
  const [formData, setFormData] = useState({
    username: '',
    weekly_hours: 0.0,
    work_days: 0
  });
  const [errors, setErrors] = useState({}); // State for storing validation errors 
  const [message, setMessage] = useState();

  function handleChange (e) {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));

    // Perform basic validation on change
    const newErrors = validateInput(name, value);
    setErrors(newErrors);
  }


  function validateInput (name, value) {
    const newErrors = { ...errors }; // Copy existing errors
    switch (name) {
      case 'username':
        if (!value || value === "") {
          newErrors.username = (<p className="input-error">
		  		Username cannot be empty. </p>);
        } else if (value.length < 3) {
          newErrors.username = (<p className="input-error">
		  		Username must be at least 3 characters long.</p>);
        } else {
          delete newErrors.username; // Remove error if valid
        }
        break;
      case 'weekly_hours':
        const numValue = parseFloat(value);
        if (isNaN(numValue) || numValue < 0 || numValue > 100) {
          newErrors.weekly_hours = (<p className="input-error">
		  		    Weekly hours must be a positive number between 0 and 100.</p>);
        } else {
          delete newErrors.weekly_hours;
        }
        break;
      case 'work_days':
        const intValue = parseInt(value);
        if (isNaN(intValue) || intValue < 0 || intValue > 7) {
          newErrors.work_days = (<p className="input-error">
		  		 Work days must be a number between 1 and 7.</p>);
        } else {
          delete newErrors.work_days;
        }
        break;
      default:
        break;
    }
    return newErrors;
  }

  async function handleSubmit (e) {
    e.preventDefault();

    // Check for any remaining errors before submission
    const emptyUserName = validateInput('username', formData.username);

    const hasErrors = Object.keys(errors).length > 0;
    if (hasErrors) {
      setMessage(<p className="input-errors">Please fix form errors before submitting</p>);
      return; // Prevent form submission if errors exist
    }
    if (Object.keys(emptyUserName).length > 0) {
      setMessage(<p> Username can not be empty </p>);
      return;
    }

    try {
      const params = new URLSearchParams();
      params.append('username', formData.username);
      params.append('weekly_hours', formData.weekly_hours);
      params.append('work_days', formData.work_days);
      const response = await fetch('http://127.0.0.1:5001/tc/v1/new_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params.toString()
      });

      if (response.ok) {
        const responseJSON = await response.json();
	if (responseJSON !== {}) {
	  console.log("Form submitted successfully");
	  setMessage((
		  <p>
		    User created successfully.<br /> 
		    Here is the User id: {responseJSON.user_id}<br />
		    Keep it safe, you might need it later.
		  </p>
	  ));
          console.log(`user id: ${responseJSON.use}`)
          assignUser(responseJSON.user_id);
        } else {
	  setMessage((
		  <p> Operation failed. Please try again
		  </p>
	  ));
	}
      } else {
	 console.error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }

  return (
    <main className='new-user-container'>
      <h1 className='title'>New User</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>What is your name?</label>
        <br />
        <input
          type='text'
          name='username'
          onChange={handleChange}
          // Display error message below input if it exists
          aria-describedby={`username-error ${errors.username ? 'error' : ''}`}
        />
        <br />
        <span id='username-error' className='error-message'>
          {errors.username}
        </span>
        <br /><br />

        <label htmlFor='weekly_hours'>
          How many hours would you like to work per week?
        </label>
        <br />
        <input
          type='text'
          name='weekly_hours'
          onChange={handleChange}
          aria-describedby={`weekly_hours-error ${
            errors.weekly_hours ? 'error' : ''
          }`}
        />
        <br />
        <span id='weekly_hours-error' className='error-message'>
          {errors.weekly_hours}
        </span>
        <br /><br />

        <label htmlFor='work_days'>How many days per week do you work?</label>
        <br />
        <input
          type='text'
          name='work_days'
          onChange={handleChange}
          aria-describedby={`work_days-error ${errors.work_days ? 'error' : ''}`}
        />
        <br />
        <span id='work_days-error' className='error-message'>
          {errors.work_days}
        </span>
        <br /><br />

        <div className='user-submit'>
          <button type='submit' onClick={handleSubmit}>
            Create User
          </button>
        </div>
      </form>

      {message}
    </main>
  );
}
