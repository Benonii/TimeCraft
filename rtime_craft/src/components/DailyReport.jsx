import React from "react"
import "../daily.css"

export default function DailyReport() {
	return (
	    <main className="daily=report-container">
		<h1 className="title">Daily Report</h1>
		<label htmlfor="date">What day would you like to get a report for?
		</label>
    		<br />
    		<input type="text" name="date"
			placeholder="Eg: today OR March 4 2024" />

    		<br /><br />

    		<h1 className="report-title">Tuesday, March 5 2024:</h1>
    		<p className="report-content"> You spent <span className="green">3.0 hours</span> on Training toady <br />
        	    You spent <span className="green">2.0 hours</span> on sparring today <br />
        	    You've been productive for <span className="green">5.0 hours</span> today. Good Job! <br />
        	    You've wasted <span className="red">2 hours</span> today. <br />
        	    Tomorrow is always another day. Salute!
    		</p>
	    </main>
	)
}
