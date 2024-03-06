import React from "react"

export default function DailyReport() {
	return (
	    <main>
		<label for="date">What day would you like to get a report for?
		</label>
    		<br />
    		<input type="text" name="date"
			placeholder="Eg: today OR March 4 2024" />

    		<br /><br />

    		<h1>Tuesday, March 5 2024:</h1>
    		<p> You spent 3.0 hours on Training toady <br />
        	    You spent 2.0 hours on sparring today <br />
        	    You've been productive for 5.0 hours today. Good Job! <br />
        	    You've wasted 2 hours today. <br />
        	    Tomorrow is always another day. Salute!
    		</p>
	    </main>
	)
}
