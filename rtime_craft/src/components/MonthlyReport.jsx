import React from "react"

export default function MonthlyReport() {
	return (
	    <main>
		<label for="month">What month would you like to get a report for?
		</label>
    		<br /><br />
    		<input type="text" name="month" placeholder="February" />

    		<p> In the month of March: <br />
            	    You've worked a total of 3.0 hours. Way to go!<br />
            	    You've wasted 2.0 hours. <br />
            	    You did good. Here is to doing better next month!
    		</p>
	    </main>
	)
}
