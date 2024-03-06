import React from "react"

export default function WeeklyReport() {
	return (
	    <main>
		<label for="week">What week would you like to get a report for?
		<br />
        	    <ol>
               		<li>This Week</li>
            		<li>Last Week</li>
            		<li>Custom</li>
        	    </ol>
    		</label>
    		<input type="text" name="week" />

    		<br /><br />

    		<p>Start Date: March 4, 2024</p>
    		<p>End Date: March 10, 2024</p>

    		<p> This week you spent 3.0 hours working <br />
        	    And you wasted a total of 2.0 <br />
        	    You can't be perfect, but you can be better! <br />
        	    See you next week! <br />
    		</p>
	    </main>
	)
}
