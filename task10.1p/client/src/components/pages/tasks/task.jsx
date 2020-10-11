import React from "react";
import { useParams } from "react-router-dom";

import { Card } from "../../base/Card";
import { CardBody } from "../../base/CardBody";
import { CardHeader } from "../../base/CardHeader";
import { TextArea } from "../../base/TextArea";
import { Input } from "../../base/Input";
import { Button } from "../../base/Button";
import { FormGroup } from "../../base/FormGroup";
import { MutlipleChoiceOptions } from "../../templates/MutlipleChoiceOptions";
import { TrueOrFalse } from "../../templates/TrueOrFalse";

export const Task = (props) => {
  const [task, setTask] = React.useState({});
  const { taskId } = useParams();

  const [submittedTaskData, setSubmittedTaskData] = React.useState({
    taskId: "",
    userId: "",
    questions: [],
  });
  const [formData, setFormData] = React.useState({});

  React.useEffect(() => {
    fetch("http://localhost:8000/tasks/" + taskId)
      .then((res) => res.json())
      .then((data) => setTask(data));
  }, []);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const SubmitTask = () => {
    setFormData((s) => ({ ...s, userId: "abc123", taskId: task._id }));

    const questions = Object.keys(formData).map((questionKey) => ({
      questionId: questionKey,
      answer: formData[questionKey],
    }));

    const data = {
      userId: "abc123",
      taskId: task._id,
      questions: questions,
    };
    console.log(data);
    fetch("http://localhost:8000/submittedTasks/", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  };

  return (
    <div>
      <section>
        {task.tasks && task.tasks.length
          ? task.tasks.map((taskObj) => (
              <Card className="my-2">
                <CardHeader>
                  <div className="d-flex justify-content-between">
                    <span className="mr-2">{taskObj.question}</span>
                    <span>{taskObj.reward}</span>
                  </div>
                </CardHeader>
                <CardBody>
                  {taskObj.type === "Multiple Choice" && taskObj.options && (
                    <MutlipleChoiceOptions
                      options={taskObj.options}
                      onSelect={(option) =>
                        setFormData((s) => ({
                          ...s,
                          [taskObj._id]: option,
                        }))
                      }
                    ></MutlipleChoiceOptions>
                  )}
                  {taskObj.type === "True or False" && (
                    <TrueOrFalse
                      onSelect={(choice) =>
                        setFormData((s) => ({
                          ...s,
                          [taskObj._id]: choice,
                        }))
                      }
                    ></TrueOrFalse>
                  )}
                  {taskObj.type === "Long Form Answer" && (
                    <TextArea
                      id={taskObj._id}
                      name={taskObj._id}
                      value={formData[taskObj]}
                      onChange={onChange}
                    ></TextArea>
                  )}
                  {taskObj.type === "Image Processing" && (
                    <>
                      <div className="d-flex justify-content-center">
                        <img src={taskObj.imageURI} height="300px"></img>
                      </div>
                      <FormGroup className="my-2">
                        <Input
                          type="text"
                          name={taskObj._id}
                          id={taskObj._id}
                          value={formData[taskObj]}
                          onChange={onChange}
                        ></Input>
                      </FormGroup>
                    </>
                  )}
                </CardBody>
              </Card>
            ))
          : null}
        <Button
          variant={"success"}
          className="float-right"
          onClick={SubmitTask}
        >
          Submit Task
        </Button>
      </section>
    </div>
  );
};
