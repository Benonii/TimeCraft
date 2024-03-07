import React from "react"

export default function MonthlyReport() {
	return (
	    <main>
		<h1 className="title">Monthly Report </h1>
		<label for="month">What month would you like to get a report for?
		</label>
    		<br /><br />
    		<input type="text" name="month" placeholder="February" />

		<h2 className="date">March, 2024 </h2>
    		<p>
            	    You've worked a total of <span className="green">3.0 hours</span>. Way to go!<br />
            	    You've wasted <span className="red">2.0 hours</span>. <br />
            	    You did good. Here is to doing better next month!
    		</p>
	    </main>
	)
}
