import React from "react"
import Sidebar from "./components/Sidebar"
import Main from "./components/Main"
import Split from "react-split"
import {nanoid} from "nanoid"
import "./style.css"


export default function App() {
	const [action, setAction] = React.useState(0)
	const [userId, setUserId] = React.useState("");
	
	function onActionClick(id) {
		setAction(id)
	}

	async function getUser() {
		try {

			const response = fetch("http://localhost:5001/tc/v1/get_session_user",
						{
							method: 'GET',
							headers: {
								'Content-Type': 'application/json'
							}
						});
			if (response.ok) {
				const responseJSON = await response.json();
				const userId = responseJSON.user_id;
				
				if (userId !== null || userId !== "") {
					setUserId(userId);
					console.log("Ladies and Gentlemen, we got him");
				} else {
					console.error("User ID is null, just thought you should know");
				};
			} else {
				console.error("Couldn't get user");
				console.log(response)
			};
		} catch(error){
			console.error("Error submitting form: ", error);
		};
	};
	getUser();

	async function assignUser(userID) {
		
		if (userID === null || userID === "") {
			console.error("Please enter a valid User ID")
		} else { 
			const param = new URLSearchParams();
			param.append('userID', userID)
			const response = fetch("http://localhost:5001/tc/v1/switch_user",
						{
							method: 'POST',
							headers: {
								'Content-Type': 'x-www-form-urlencoded'
							},
							body: param.toString(),
						})
			if (response.ok) {
				setUserId(userId);
				console.log("User Changed Successfully");
			} else {
				console.error("Couldn't switch user");
			}
		};
	};	

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
                <Main actionId={action} userId={userId} />
              
            </Split>
        </main>
    )
}		
