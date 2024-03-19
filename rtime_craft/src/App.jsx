import React from "react"
import Sidebar from "./components/Sidebar"
import Main from "./components/Main"
import Split from "react-split"
import "./style.css"


export default function App() {
	const [action, setAction] = React.useState(0)
	
	function onActionClick(id) {
		setAction(id)
	}

	return (
        <main>
	    <Split
		sizes={[30, 70]}
                direction="horizontal"
                className="split"
            >
		<Sidebar
	    	    onClick={onActionClick}
		/>
                <Main actionId={action} />
              
            </Split>
        </main>
    )
}		
