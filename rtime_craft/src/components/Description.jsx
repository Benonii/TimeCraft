import React from "react"
import "../description.css"

export default function Description() {
	return (
	    <main className="description-container">
	        <h1 className="title">Welcome to TimeCraft! </h1>
		<p className="intro"> Hey there! My name is <span className="tiempo">Tiempo</span>. <br />
	            I'm here to help you find all those
                    hours that seem to be misteriously disappearing.
        	</p>

		<h2 className="subtitle">Things I can do:</h2>
    		<p className="features"> I can help yoy keep track of time
			on task and time wasted on a daily basis. <br />
        	    I also keep track of total productive time and
		    total wasted time. <br /> And last but not least,
		    I can give you daily, weekly and monthly reports
    		</p>
	    </main>
	)
}
