import React from "react"

export default function NewUser() {
	return (
	    <main>
		<h1>New User</h1>
    		<p> Hey There! Welcome to TImeCraft!. <br />
		    My name is Tiempo. Now it's your turn
		</p>
    	
		<form action="post">
        	    <label for="user-name">What is your name?</label>
        	    <br />
        	    <input type="text" name="user-name" />
        	    <br /><br />

        	    <label for="weekly-hours">How many hours would you 
			like to work per week?</label>
        	    <br />
        	    <input type="text" name="weekly-hours" />
        	    <br /><br />

        	    <label for="work-days">How many days per week do you
			work?</label>
        	    <br />
        	    <input type="text" name="work_days" /> 
    		</form>

    <button type="submit">Submit</button>
	    </main>
	)
}
