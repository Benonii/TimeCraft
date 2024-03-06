import React from "react"
import "../style.css"
import Description from "./Description"
import NewUser from "./NewUser"
import NewTask from "./NewTask"
import NewLog from "./NewLog"
import DailyReport from "./DailyReport"
import WeeklyReport from "./WeeklyReport"
import MonthlyReport from "./MonthlyReport"
import TotalProductiveTime from "./TotalProductiveTime"
import TotalWastedTime from "./TotalWastedTime"
import TotalTimeOnTask from "./TotalTimeOnTask"

export default function Main({actionId}) {
	const actions = {
		0: <Description />,
		1: <NewUser />,
		2: <NewTask />,
		3: <NewLog />,
		4: <DailyReport />,
		5: <WeeklyReport />,
		6: <MonthlyReport />,
		7: <TotalProductiveTime />,
		8: <TotalWastedTime />,
		9: <TotalTimeOnTask />,
	}

	let component = actions[actionId];
    return (
        <main>
	    {component}
        </main>
    )
}
