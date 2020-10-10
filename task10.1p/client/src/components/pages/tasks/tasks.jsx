import React from "react";
import C from "classnames";
import { TaskCard } from "../../templates/TaskCard";
import { SectionHeading } from "../../base/SectionHeading";
import { Input } from "../../base/Input";
export const Tasks = (props) => {
  const [tasks, setTasks] = React.useState([]);
  const [filteredTasks, setFilteredTasks] = React.useState([]);
  const [filterData, setFilterData] = React.useState({});
  const [activeTask, setActiveTask] = React.useState("");
  React.useEffect(() => {
    fetch("http://localhost:8000/tasks")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTasks(data);
      });
  }, []);

  React.useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  //generic onChange handler for inputs.
  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);
    setFilterData((s) => ({ ...s, [name]: value }));
  };

  React.useEffect(() => {
    const tmpTasks = Array.from(tasks);
    if (filterData.title) {
      let fTasks = tmpTasks.filter((task) =>
        task.title.toLowerCase().includes(filterData.title.toLowerCase())
      );
      if (filterData.orderBy === "farthest") {
        fTasks.sort(
          (task1, task2) =>
            new Date(task2.expiryDate).getTime() -
            new Date(task1.expiryDate).getTime()
        );
      } else {
        fTasks.sort(
          (task1, task2) =>
            new Date(task1.expiryDate).getTime() -
            new Date(task2.expiryDate).getTime()
        );
      }
      setFilteredTasks(fTasks);
    } else {
      if (filterData.orderBy === "farthest") {
        tmpTasks.sort(
          (task1, task2) =>
            new Date(task2.expiryDate).getTime() -
            new Date(task1.expiryDate).getTime()
        );
      } else {
        tmpTasks.sort(
          (task1, task2) =>
            new Date(task1.expiryDate).getTime() -
            new Date(task2.expiryDate).getTime()
        );
      }
      setFilteredTasks(tmpTasks);
    }
  }, [filterData]);

  const deleteTask = (taskId) => {
    if (window.confirm("Delete this task from the database?")) {
      fetch("http://localhost:8000/tasks/" + taskId, {
        method: "delete",
      }).then(() => {
        setTasks((s) => s.filter((task) => task._id !== taskId));
      });
    }
  };

  return (
    <>
      <SectionHeading>Tasks</SectionHeading>
      <div className="container d-flex flex-row flex-wrap">
        <div className="col-12 d-flex flex-row justify-content-between">
          <div className=" d-flex align-items-center mr-2">
            <span className="mr-2">Search: </span>
            <Input name="title" id="title" onChange={onChange}></Input>
          </div>
          <div className="d-flex align-items-center">
            <span className="mr-2">Order By Expiry: </span>
            <select name="orderBy" id="orderBy" onChange={onChange}>
              <option value="closest">Closest First</option>
              <option value="farthest">Farthest First</option>
            </select>
          </div>
        </div>
        <hr />
        {filteredTasks &&
          filteredTasks.map((task) => (
            <div
              key={task._id}
              className={C(
                "col-6 col-md-4 col-lg-3 p-2",
                activeTask === task._id && "position-static"
              )}
            >
              <div
                className={C(
                  activeTask === task._id && "task-card-active-container",
                  "task-card-container"
                )}
                onClick={() => setActiveTask(task._id)}
              >
                <div className="d-flex justify-content-center align-items-center flex-grow-1">
                  <TaskCard
                    active={activeTask === task._id}
                    className={C(activeTask === task._id && "col-12 col-md-6")}
                    title={task.title}
                    description={task.description}
                    expiryDate={task.expiryDate}
                    tasks={task.tasks}
                    noOfWorkers={task.noOfWorkers}
                    requireExperience={task.requireExperience}
                    toggleActive={(e) => {
                      //was activating the onClick of the parent, which was setting it back.
                      e.stopPropagation();
                      setActiveTask(null);
                    }}
                    deleteTask={(e) => {
                      e.stopPropagation();
                      deleteTask(task._id);
                    }}
                  ></TaskCard>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
