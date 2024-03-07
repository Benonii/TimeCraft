import React from "react"
import "../weekly.css"

export default function WeeklyReport() {
	return (
	    <main className="weekly-report-container">
		<h1 className="title"> Weekly Report </h1>
		<label htmlfor="week">What week would you like to get a report for?
		<br />
        	    <ol>
               		<li>This Week</li>
            		<li>Last Week</li>
            		<li>Custom</li>
        	    </ol>
    		</label>
    		<input type="text" name="week" />

    		<br /><br />

    		<p className="date">Start Date: March 4, 2024</p>
    		<p className="date">End Date: March 10, 2024</p>

    		<p> This week you spent <span className="green">3.0 hours</span> working <br />
        	    And you wasted a total of <span className="red">2.0 hours</span><br />
        	    You can't be perfect, but you can be better! <br />
        	    See you next week! <br />
    		</p>
	    </main>
	);
}
