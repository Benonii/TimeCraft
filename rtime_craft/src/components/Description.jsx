import React from "react"
import "../description.css"

export default function Description() {
	return (
	    <main className="description-container">
	        <h1 className="title">Welcome to TimeCraft! </h1>
	<p className="intro"> Hey there! <br />This is <span className="tiempo"> TimeCraft. </span>
		    I'm here to help you find all those
                    hours that seem to be misteriously disappearing.
        	</p>

		<h2 className="subtitle">Things I can do:</h2>
    		<p className="features"> I can help you keep track of Time
			on Task and Time Wasted on a daily basis.
        	    I also keep track of Total Productive Time and
		    Total Wasted Time. <br /><br /> And last but not least,
		    I can give you Daily, Weekly and Monthly reports
    		</p>

		<br /><br />
	    </main>
	)
}
