import React from "react";
import "../newuser.css";
export default function NewUser() {
	return (
	    <main className="new-user-container">
		<h1 className="title">New User</h1>
    		<p className="intro"> Hey There! Welcome to TImeCraft!. <br />
		    My name is <span className="tiempo">Tiempo</span>. Now it's your turn
		</p>
    	
		<form action="post">
        	    <label htmlfor="user-name">What is your name?</label>
        	    <br />
        	    <input type="text" name="user-name" />
        	    <br /><br />

        	    <label htmlfor="weekly-hours">How many hours would you 
			like to work per week?</label>
        	    <br />
        	    <input type="text" name="weekly-hours" />
        	    <br /><br />

        	    <label htmlfor="work-days">How many days per week do you
			work?</label>
        	    <br />
        	    <input type="text" name="work_days" /> 
    		</form>

    <button type="submit">Submit</button>
	    </main>
	);
}
