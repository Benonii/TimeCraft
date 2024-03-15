import React, { useState } from "react";
import "../newuser.css";
export default function NewUser() {
	const [formData, setFormData] = useState({
		username: '',
		weekly_hours: 0.0,
		work_days: 0
	});
	
	function handleChange(e) {
		const { name, value } = e.target;
		setFormData(prevState => ({
			...prevState,
			[name]: value
		}));
		console.log(formData)
	};

	async function handleSubmit(e) {
		e.preventDefault();

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
				body: params.toString(),
			});

			if (response.ok) {
				console.log('Form submitted successfully');
			} else {
				console.error('Failed to submit form');
			}
		} catch (error) {
			console.error('Error submitting form:', error);
		}
	};

	return (
	    <main className="new-user-container">
		<h1 className="title">New User</h1>
    	
		<form onSubmit={handleSubmit}>
        	    <label htmlFor="username">What is your name?</label>
        	    <br />
        	    <input type="text" name="username" onChange={handleChange}/>
        	    <br /><br />
		    <br /><br />

        	    <label htmlFor="weekly_hours">How many hours would you 
			like to work per week?</label>
        	    <br />
        	    <input type="text" name="weekly_hours" onChange={handleChange}/>
        	    <br /><br />
		    <br /><br />

        	    <label htmlFor="work_days">How many days per week do you
			work?</label>
        	    <br />
        	    <input type="text" name="work_days" onChange={handleChange}/> 
    		</form>
		<div className="submit">
    		    <button type="submit" onClick={handleSubmit}>Save</button>
		</div>
	    </main>
	);
}
