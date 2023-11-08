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
	const handlerClick = async (e) => {
		if (e.key == "Enter" || !e.key) {


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


				} else {
					alert("for save write someting")
				}
			} catch (err) {
				console.log(err)
			}
			setNewTask("")
		}
	}

	useEffect(() => {
		getList()
	}, [inputValue])

	const handleDelete = async (index) => {
		try {
			const updatedList = [...list];
			updatedList.splice(index, 1);

			const response = await fetch(`https://playground.4geeks.com/apis/fake/todos/user/${inputValue}`, {
				body: JSON.stringify(updatedList),
				method: "PUT",
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (!response.ok) {
				throw new Error("La solicitud de eliminar la tarea falló");
			}

			setList(updatedList);
		} catch (err) {
			console.error(err);
		}
	};

	const handleClearAll = async () => {
		try {
			const response = await fetch(`https://playground.4geeks.com/apis/fake/todos/user/${inputValue}`, {
				method: "DELETE",
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (!response.ok) {
				throw new Error("La solicitud para borrar todas las tareas falló");
			}

			setList([]); // Limpiar la lista localmente después de borrar las tareas en el servidor
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="container">

			<div className="task">{list.length}</div>

			<h1 className="title"> ToDo List</h1>

			<div className="search-container">
				<h5>Find your Agenda:</h5>
				<input className="first"
					type="text"
					onChange={(e) => setInputValue(e.target.value)}
					placeholder="Agenda's Name"
				/>
			</div>
			<h5>Add new task:</h5>
			<input className="second"
				type="text"
				value={newTask}
				onChange={(e) => setNewTask(e.target.value)}
				placeholder="Write your task here..."
				onKeyDown={(e) => handlerClick(e)}

			/>
			<button onClick={handlerClick}>add task</button>
			<ul className="list-group list-group-flush">


				{
					list.map((ele, index) => {

						return <li className="list-group-item" key={index}>{ele.label}<i className="fa-solid fa-trash trash" onClick={() => handleDelete(index)}></i></li>
					})

				}


			</ul>
			<div className="centered-button-container">
				<button className="clear-button" onClick={handleClearAll}>Clear All</button>
			</div>
		</div>
	);

};

export default Home;
