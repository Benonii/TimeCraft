import React from "react"
import "../description.css"

export default function Description() {
	return (
	    <main className="description-container">
	        <h1 className="title">Welcome to <span className="tiempo"> TimeCraft</span>!</h1>
	<p className="intro">
		    This app will help you find all those
                    hours that seem to be misteriously disappearing.
        	</p>

		<h2 className="subtitle">Features:</h2>
    		<p className="features">TimeCraft can help you keep track of Time
			on Task and Time Wasted on a daily basis.
        	    It can also keep track of Total Productive Time and
		    Total Wasted Time. <br /><br /> And last but not least,
		    It can give you Daily, Weekly and Monthly reports
    		</p>
		<br /><br />
	    </main>
	)
}
