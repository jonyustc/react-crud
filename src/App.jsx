import { useState } from "react";
import logo from "./assets/lws-logo-en.svg";

const initTasks = [
  {
    id: "10111",
    taskName: "Db Migration",
    description: "Lorem ipsum dolor sit amet consectetur",
    tags: ["SQL", "ORACLE", "EF Core"],
    priority: "High",
    isFavorite: true,
  },
];

const newInitTask = {
  id: "",
  taskName: "",
  description: "",
  tags: "",
  priority: "High",
  isFavorite: false,
};

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState(initTasks);
  const [task, setTask] = useState(newInitTask);

  //const [tasks, dispatch] = useReducer(taskReducer, []);

  const [searchText, setSearchText] = useState("");

  // async function getTasks() {
  //   const res = await fetch("data.json");
  //   const data = await res.json();

  //   setTasks(data.tasks);
  // }

  // useEffect(() => {
  //   getTasks();
  // }, []);

  function handleAddTaskModal() {
    setShowAddTask(true);
  }

  function handleAddTask(newTask) {
    // setTasks((tasks) => {
    //   return tasks.map((task) => {
    //     return task.id === newTask.id ? newTask : task;
    //   });
    // });

    setTasks((tasks) => [...tasks, newTask]);
    setShowAddTask(false);
    setTask(newInitTask);
  }

  function handleUpdateTask(newTask) {
    setTasks((tasks) => {
      return tasks.map((task) => {
        return task.id === newTask.id ? newTask : task;
      });
    });
    setShowAddTask(false);
    setTask(newInitTask);
  }

  function handleCloseAddTaskModal() {
    setShowAddTask(false);
    setTask(newInitTask);
  }

  function handleEditTask(id) {
    setTask(tasks.find((x) => x.id === id));
    setShowAddTask(true);
  }

  function handleDeleteTask(id) {
    setTasks((tsk) => tsk.filter((t) => t.id !== id));
  }

  function handleDeleteAllTask() {
    setTasks([]);
  }

  function handleAddFavorite(id) {
    setTasks((tsk) =>
      tsk.map((t) => (t.id === id ? { ...t, isFavorite: !t.isFavorite } : t))
    );
  }

  function handleSearch(e) {
    e.preventDefault();

    setTasks((tsk) =>
      searchText
        ? tsk.filter((t) =>
            t.taskName.toLowerCase().includes(searchText.toLowerCase())
          )
        : tasks
    );
  }

  function handleOnSearchChange(text) {
    setSearchText(text);

    setTasks((tsk) =>
      searchText
        ? tsk.filter((t) =>
            t.taskName.toLowerCase().includes(text.toLowerCase())
          )
        : tasks
    );
  }

  function handleSetTask(newTask) {
    setTask(newTask);
  }

  return (
    <>
      <div className="container">
        <Header />

        <Hero />

        <TaskBoard
          onShowAddTaskModal={handleAddTaskModal}
          tasks={tasks}
          onDeleteTask={handleDeleteTask}
          onDeleteAllTask={handleDeleteAllTask}
          onAddFavorite={handleAddFavorite}
          onSearch={handleSearch}
          searchText={searchText}
          onEditTask={handleEditTask}
          onSetSearchText={handleOnSearchChange}
        />

        <Footer />
      </div>

      {showAddTask && (
        <AddTask
          task={task}
          onAddTask={handleAddTask}
          onUpdateTask={handleUpdateTask}
          showAddTask={showAddTask}
          onCloseModal={handleCloseAddTaskModal}
          onSetTask={handleSetTask}
        />
      )}
    </>
  );
}

export default App;

function Header() {
  return (
    <>
      <header className="header">
        <nav>
          <img src={logo} alt="logo" />
        </nav>
      </header>
    </>
  );
}

function Hero() {
  return (
    <>
      <section className="section-hero">
        <div className="section-hero-text">
          <h1>TASKER</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
            ab id quam dolore, minima ducimus reprehenderit. Rem, iusto.
            Consequatur nostrum similique, illum eos iusto quia in labore
            numquam quasi odit? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Blanditiis ab id quam dolore, minima ducimus
            reprehenderit. Rem, iusto. Consequatur nostrum similique, illum eos
            iusto quia in labore numquam quasi odit?
          </p>
        </div>
        <img src="frame.png" alt="Hero img" />
      </section>
    </>
  );
}

function AddTask({
  task,
  onSetTask,
  onAddTask,
  onUpdateTask,
  showAddTask,
  onCloseModal,
}) {
  console.log(task);
  function onChangeTask(e) {
    const value =
      e.target.name === "isFavorite" ? e.target.checked : e.target.value;
    const changeTsk = { ...task, [e.target.name]: value };

    onSetTask(changeTsk);
  }

  function handleAddTaskForm(e) {
    e.preventDefault();
    //with control state

    const newTask = { ...task };

    if (newTask.id) {
      newTask.tags = newTask.tags.includes(",")
        ? newTask.tags.split(",")
        : [newTask.tags];

      onUpdateTask(newTask);
      //setTask(newTask);
      //setShowAddTask(false);
    } else {
      newTask.id = Date.now().toString().slice(-6);
      newTask.tags = newTask.tags.includes(",")
        ? newTask.tags.split(",")
        : [newTask.tags];
      onAddTask(newTask);

      //setTasks((tsk) => [...tsk, newTask]);

      //setTask(newTask);
      //setShowAddTask(false);
    }

    //// without control state
    // const formData = new FormData(e.target);

    // const data = Object.fromEntries(formData);

    // if (!data.isFavorite) data.isFavorite = false;

    // data.tags = data.tags.includes(",") ? data.tags.split(",") : [data.tags];

    // data.id = Date.now().toString().slice(-6);
    // setTasks((tsk) => [...tsk, data]);
    // setShowAddTask(false);
  }

  return (
    <div className={`add-task-modal ${!showAddTask ? "hidden" : ""}`}>
      <button className="btn-close" onClick={onCloseModal}>
        &times;
      </button>
      <form className="add-task-form" onSubmit={handleAddTaskForm}>
        {/* <h2>Add Task</h2> */}
        <label htmlFor="taskName">Task Name</label>
        <input
          type="text"
          name="taskName"
          value={task.taskName}
          onChange={onChangeTask}
          placeholder="Add Task Name"
          id="taskName"
        />
        <label htmlFor="description">Task Description</label>
        <textarea
          name="description"
          value={task.description}
          onChange={onChangeTask}
        ></textarea>
        <label htmlFor="tags">Tags</label>
        <input
          type="text"
          name="tags"
          placeholder="Add Tags"
          id="tags"
          value={task.tags}
          onChange={onChangeTask}
        />
        <label htmlFor="priority">Priority</label>
        <select
          name="priority"
          id="priority"
          value={task.priority}
          onChange={onChangeTask}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <label htmlFor="isFavorite">Is Favorite</label>
        <input
          type="checkbox"
          name="isFavorite"
          checked={task.isFavorite}
          onChange={onChangeTask}
          id="isFavorite"
        />
        <button type="submit" className="btn btn-add-task">
          {task.id ? "Update Task" : "Add Task"}
        </button>
      </form>
    </div>
  );
}

function TaskBoard({
  onShowAddTaskModal,
  tasks,
  onEditTask,
  onDeleteTask,
  onDeleteAllTask,
  onAddFavorite,
  onSearch,
  onSetSearchText,
  searchText,
}) {
  return (
    <>
      <main className="section-task-board">
        <SearchTask
          searchText={searchText}
          onSetSearchText={onSetSearchText}
          onSearch={onSearch}
        />
        <div className="task-board">
          <div className="task-actions">
            <button className="btn btn-add" onClick={onShowAddTaskModal}>
              Add Task
            </button>
            <button className="btn btn-delete" onClick={onDeleteAllTask}>
              Delete All
            </button>
          </div>
          <table className="task-list">
            <thead>
              <tr>
                <th></th>
                <th>Task Name</th>
                <th>Description</th>
                <th>Tags</th>
                <th>Priority</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length > 0 &&
                tasks.map((task) => (
                  <TaskTable
                    key={task.id}
                    task={task}
                    onEditTask={onEditTask}
                    onDeleteTask={onDeleteTask}
                    onAddFavorite={onAddFavorite}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}

function TaskTable({ task, onEditTask, onDeleteTask, onAddFavorite }) {
  return (
    <tr>
      <td>
        <button onClick={() => onAddFavorite(task.id)}>
          {task.isFavorite ? "🧡" : "🤍"}
        </button>
      </td>
      <td>{task.taskName}</td>
      <td>{task.description}</td>
      <td>{task.tags?.join(",")}</td>
      <td>{task.priority}</td>
      <td>
        <button onClick={() => onEditTask(task.id)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </button>
        <button onClick={() => onDeleteTask(task.id)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
}

function SearchTask({ onSearch, searchText, onSetSearchText }) {
  return (
    <form className="form-search" onSubmit={onSearch}>
      <input
        type="search"
        name="search"
        placeholder="search task..."
        value={searchText}
        onChange={(e) => {
          onSetSearchText(e.target.value);
        }}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path
          fillRule="evenodd"
          d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
          clipRule="evenodd"
        />
      </svg>

      <input type="submit" className="hidden" />
    </form>
  );
}

function Footer() {
  return (
    <>
      <footer className="footer">
        <p>Copyright &copy; {new Date().getFullYear()}. All right reserved.</p>
      </footer>
    </>
  );
}
