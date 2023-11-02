import React, { useEffect, useState } from "react";




const Home = () => {

	const [inputValue, setInputValue] = useState("anfetirano")
	const [list, setList] = useState([])
	const [newTask, setNewTask] = useState("")

	const getList = async () => {
		try {
			const response = await fetch(`https://playground.4geeks.com/apis/fake/todos/user/${inputValue}`)
			if (!response.ok) {
				throw new Error("el response ok del get list dio falso")
			}
			const data = await response.json()

			setList(data)
		} catch (err) {
			console.log(err)
		}
	}
	const handlerClick = async () => {
		try {
			if (newTask) {
				const obj = {
					label: newTask,
					done: false
				}

				setList([...list, obj])
				const response = await fetch(`https://playground.4geeks.com/apis/fake/todos/user/${inputValue}`, {
					body: JSON.stringify([list]),
					method: "PUT",
					headers: {
						'Content-Type': 'application/json'
					}
				})
				if (!response.ok) {
					throw new Error("el response ok del get list dio falso")
				}
				const data = await response.json()
				console.log(data)

			}else {
			alert("for save write someting")
			}
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		getList()
	}, [inputValue])





	return (
		<div className="container">
			<h3>Seach your list for Name:</h3>
			<input
				type="text"
				onChange={(e) => setInputValue(e.target.value)}
			/>
			<h3>add new task:</h3>
			<input
				type="text"
				onChange={(e) => setNewTask(e.target.value)}

			/>
			<button onClick={handlerClick}>add task</button>
			<ul className="list-group list-group-flush">


				{
					list.map((ele, index) => {

						return <li className="list-group-item" key={index}>{ele.label}</li>
					})

				}


			</ul>
		</div>
	);

};

export default Home;
