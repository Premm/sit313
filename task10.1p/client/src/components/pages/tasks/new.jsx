import React from "react";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ButtonGroup } from "../../base/ButtonGroup";
import { Button } from "../../base/Button";
import { Card } from "../../base/Card";
import { CardBody } from "../../base/CardBody";
import { CardTitle } from "../../base/CardTitle";
import { CardHeader } from "../../base/CardHeader";
import { FormGroup } from "../../base/FormGroup";
import { Input } from "../../base/Input";
import { InputGroup } from "../../base/InputGroup";
import { InputGroupText } from "../../base/InputGroupText";
import { InputGroupAppend } from "../../base/InputGroupAppend";
import { TextArea } from "../../base/TextArea";
import { Table } from "../../base/Table";
import { TableHeader } from "../../base/TableHeader";
import { TableHeaderCell } from "../../base/TableHeaderCell";
import { TableBody } from "../../base/TableBody";
import { TableRow } from "../../base/TableRow";
import { TableBodyCell } from "../../base/TableBodyCell";
import { SectionHeading } from "../../base/SectionHeading";

//easy way to change all labels eassily and make sure all I dont make a syntax/spelling error.
const TaskType = {
  CHOICE: "Multiple Choice",
  DECISION: "True or False",
  SENTENCE: "Long Form Answer",
};

export const NewTask = (props) => {
  // state for tracking which type of task is selected.
  const [taskTypeSelected, setTaskTypeSelected] = React.useState(
    TaskType.CHOICE
  );

  // state for all completed fields in the form. options set here are just default values. Are not representative of all form data.
  const [formData, setFormData] = React.useState({
    tasks: [],
    noOfWorkers: 1,
    requireExperience: false,
  });

  //state for storing a temporaryTask, before they add it properly.
  const [temporaryTask, setTemporaryTask] = React.useState({
    type: "",
    question: "",
    options: [],
    reward: 1,
  });

  // state for storing temporary option values (while an new option for a task is still be filled out.)
  const [temporaryTaskOptionData, setTemporaryTaskOptionData] = React.useState(
    {}
  );

  //generic onChange handler for inputs.
  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  //toggle the value of this between true and false (can be used on all checkboxes)
  const onCheckboxToggle = (e) => {
    const name = e.target.id;
    setFormData((s) => {
      return { ...s, [name]: !s[name] };
    });
  };

  // need a different onChange function since react-datepicker doesn't pass an event with the same structure as js events.
  const onChangeDate = (date) => {
    setFormData((s) => ({ ...s, expiryDate: date }));
  };

  //for filling out the an option for multiple choice before adding it to the temporaryTask.
  const onChangeTemporaryOption = (e) => {
    const value = e.target.value;
    setTemporaryTaskOptionData((s) => ({ ...s, option: value }));
  };

  // save form data to mongo.
  const onSave = () => {
    console.log(JSON.stringify(formData));
    fetch("http://localhost:8000/tasks", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
  };

  return (
    <div className="container justify-content-center align-items-center">
      <SectionHeading>New Task</SectionHeading>
      <Card className="my-4">
        <CardHeader>
          <CardTitle className="mb-0">Task Details</CardTitle>
        </CardHeader>
        <CardBody className="d-flex flex-column">
          <FormGroup>
            <label htmlFor="title">Title</label>
            <Input
              name="title"
              id="title"
              type="text"
              value={formData.title || ""}
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="description">Description</label>
            <TextArea
              name="description"
              id="description"
              type="text"
              value={formData.description || ""}
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="expiryDate">Expiry Date</label>
            <div className="d-block">
              <DatePicker
                className="form-control"
                selected={formData.expiryDate || Date.now()}
                onChange={onChangeDate}
              />
            </div>
          </FormGroup>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="mb-0">Worker Requirements</CardTitle>
        </CardHeader>
        <CardBody>
          <FormGroup>
            <Input
              switch
              label="Require Experienced Workers"
              name="requireExperience"
              id="requireExperience"
              checked={formData.requireExperience}
              onChange={onCheckboxToggle}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="noOfWorkers">Number of permitted Workers</label>
            <Input
              type="number"
              name="noOfWorkers"
              id="noOfWorkers"
              value={formData.noOfWorkers.toString()}
              onChange={onChange}
            ></Input>
          </FormGroup>
        </CardBody>
      </Card>

      <Card className="mt-2 mb-4">
        <CardHeader>
          <CardTitle className="mb-0">Task Questions</CardTitle>
        </CardHeader>
        <CardBody className="d-flex flex-column">
          <CardTitle>Question Type</CardTitle>
          <ButtonGroup>
            <Button
              variant="secondary"
              active={taskTypeSelected === TaskType.CHOICE}
              onClick={() => {
                setTaskTypeSelected(TaskType.CHOICE);
                setFormData((s) => ({ ...s, taskType: TaskType.CHOICE }));
                setTemporaryTask((s) => ({
                  question: "",
                  options: [],
                  reward: 1,
                }));
              }}
            >
              {TaskType.CHOICE}
            </Button>
            <Button
              variant="secondary"
              active={taskTypeSelected === TaskType.DECISION}
              onClick={() => {
                setTaskTypeSelected(TaskType.DECISION);
                setFormData((s) => ({ ...s, taskType: TaskType.DECISION }));
                setTemporaryTask((s) => ({
                  question: "",
                  options: [],
                  reward: 1,
                }));
              }}
            >
              {TaskType.DECISION}
            </Button>
            <Button
              variant="secondary"
              active={taskTypeSelected === TaskType.SENTENCE}
              onClick={() => {
                setTaskTypeSelected(TaskType.SENTENCE);
                setFormData((s) => ({ ...s, taskType: TaskType.SENTENCE }));
                setTemporaryTask((s) => ({
                  question: "",
                  options: [],
                  reward: 1,
                }));
              }}
            >
              {TaskType.SENTENCE}
            </Button>
          </ButtonGroup>
          <small className="text-center mt-2">
            {taskTypeSelected === TaskType.CHOICE
              ? "A multiple choice question."
              : taskTypeSelected === TaskType.DECISION
              ? "A question requiring a true or false answer."
              : taskTypeSelected === TaskType.SENTENCE
              ? "A question or set of instructions requiring a free-form text-based answer."
              : ""}
          </small>
          {taskTypeSelected === TaskType.CHOICE && (
            <>
              <section>
                <Card className="my-2">
                  <CardBody className="p-0">
                    <Table striped className="mb-0">
                      <TableHeader>
                        <TableHeaderCell>
                          <label htmlFor="temporaryDescription">
                            New Question
                          </label>
                          <Input
                            type="text"
                            name="temporaryDescription"
                            id="temporaryDescription"
                            value={temporaryTask.question}
                            onChange={(e) => {
                              const value = e.target.value;
                              setTemporaryTask((s) => ({
                                ...s,
                                question: value,
                              }));
                            }}
                          ></Input>
                        </TableHeaderCell>
                        <TableHeaderCell>
                          <label htmlFor="temporaryDescription">Reward</label>
                          <Input
                            type="number"
                            name="temporaryReward"
                            id="temporaryReward"
                            value={temporaryTask.reward.toString()}
                            onChange={(e) => {
                              const value = e.target.value;
                              setTemporaryTask((s) => ({
                                ...s,
                                reward: value,
                              }));
                            }}
                          ></Input>
                        </TableHeaderCell>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableBodyCell colSpan={2}>
                            <label htmlFor="temporaryOption">
                              Add an Option
                            </label>
                            <form>
                              <InputGroup>
                                <Input
                                  type="text"
                                  name="temporaryOption"
                                  id="temporaryOption"
                                  onChange={onChangeTemporaryOption}
                                  value={temporaryTaskOptionData.option}
                                ></Input>
                                <InputGroupAppend>
                                  <Button
                                    submit
                                    variant="primary"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      if (temporaryTaskOptionData.option) {
                                        setTemporaryTask((s) => ({
                                          ...s,
                                          options: [
                                            ...s.options,
                                            temporaryTaskOptionData.option,
                                          ],
                                        }));
                                      }
                                      setTemporaryTaskOptionData({
                                        option: "",
                                      });
                                    }}
                                  >
                                    <FontAwesomeIcon
                                      icon={faPlus}
                                    ></FontAwesomeIcon>
                                  </Button>
                                </InputGroupAppend>
                              </InputGroup>
                            </form>
                          </TableBodyCell>
                        </TableRow>
                        {temporaryTask.options &&
                          temporaryTask.options.map((option) => (
                            <TableRow>
                              <TableBodyCell colSpan={2}>
                                {option}
                              </TableBodyCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </CardBody>
                </Card>
                <Button
                  className="my-2"
                  variant="primary"
                  onClick={() => {
                    if (
                      temporaryTask.question &&
                      temporaryTask.options &&
                      temporaryTask.options.length
                    ) {
                      setFormData((s) => ({
                        ...s,
                        tasks: [
                          ...s.tasks,
                          { ...temporaryTask, type: taskTypeSelected },
                        ],
                      }));
                      setTemporaryTask((s) => ({
                        question: "",
                        options: [],
                        reward: 1,
                      }));
                    }
                  }}
                >
                  Add Question
                </Button>
              </section>
            </>
          )}
          {taskTypeSelected === TaskType.DECISION && (
            <>
              <section>
                <Card className="my-2">
                  <CardBody className="p-0">
                    <Table striped className="mb-0">
                      <TableHeader>
                        <TableHeaderCell>
                          <label htmlFor="temporaryDescription">
                            New Question
                          </label>
                          <InputGroup>
                            <Input
                              type="text"
                              name="temporaryDescription"
                              id="temporaryDescription"
                              value={temporaryTask.question}
                              onChange={(e) => {
                                const value = e.target.value;
                                setTemporaryTask((s) => ({
                                  ...s,
                                  question: value,
                                }));
                              }}
                            ></Input>
                            <InputGroupAppend>
                              <InputGroupText>?</InputGroupText>
                            </InputGroupAppend>
                          </InputGroup>
                        </TableHeaderCell>
                        <TableHeaderCell>
                          <label htmlFor="temporaryDescription">Reward</label>
                          <Input
                            type="number"
                            name="temporaryReward"
                            id="temporaryReward"
                            value={temporaryTask.reward}
                            onChange={(e) => {
                              const value = e.target.value;
                              setTemporaryTask((s) => ({
                                ...s,
                                reward: value,
                              }));
                            }}
                          ></Input>
                        </TableHeaderCell>
                      </TableHeader>
                    </Table>
                  </CardBody>
                </Card>
                <Button
                  className="my-2"
                  variant="primary"
                  onClick={() => {
                    if (temporaryTask.question) {
                      setFormData((s) => ({
                        ...s,
                        tasks: [
                          ...s.tasks,
                          { ...temporaryTask, type: taskTypeSelected },
                        ],
                      }));
                      setTemporaryTask((s) => ({
                        question: "",
                        options: [],
                        reward: 1,
                      }));
                    }
                  }}
                >
                  Add Question
                </Button>
              </section>
            </>
          )}
          {taskTypeSelected === TaskType.SENTENCE && (
            <>
              <section>
                <Card className="my-2">
                  <CardBody className="p-0">
                    <Table striped className="mb-0">
                      <TableHeader>
                        <TableHeaderCell>
                          <label htmlFor="temporaryDescription">
                            New Question / Instructions
                          </label>

                          <TextArea
                            name="temporaryDescription"
                            id="temporaryDescription"
                            value={temporaryTask.question}
                            onChange={(e) => {
                              const value = e.target.value;
                              setTemporaryTask((s) => ({
                                ...s,
                                question: value,
                              }));
                            }}
                          ></TextArea>
                        </TableHeaderCell>
                        <TableHeaderCell>
                          <label htmlFor="temporaryDescription">Reward</label>
                          <Input
                            type="number"
                            name="temporaryReward"
                            id="temporaryReward"
                            value={temporaryTask.reward}
                            onChange={(e) => {
                              const value = e.target.value;

                              setTemporaryTask((s) => ({
                                ...s,
                                reward: value,
                              }));
                            }}
                          ></Input>
                        </TableHeaderCell>
                      </TableHeader>
                    </Table>
                  </CardBody>
                </Card>
                <Button
                  className="my-2"
                  variant="primary"
                  onClick={() => {
                    if (temporaryTask.question) {
                      setFormData((s) => ({
                        ...s,
                        tasks: [
                          ...s.tasks,
                          { ...temporaryTask, type: taskTypeSelected },
                        ],
                      }));
                      setTemporaryTask((s) => ({
                        question: "",
                        options: [],
                        reward: 1,
                      }));
                    }
                  }}
                >
                  Add Question
                </Button>
              </section>
            </>
          )}
        </CardBody>
      </Card>

      <section>
        {formData.tasks && formData.tasks.length ? (
          <Card className="my-4">
            <CardBody>
              <CardTitle>Questions Preview</CardTitle>

              <Card className="my-2">
                <CardBody className="p-0">
                  {formData.tasks.map((task) => (
                    <Table striped className="mb-0">
                      <TableHeader>
                        <TableHeaderCell>
                          <div className="d-flex justify-content-between">
                            <span>
                              {task.type} - {task.question}
                            </span>
                            <span>{task.reward}</span>
                          </div>
                        </TableHeaderCell>
                      </TableHeader>
                      {task.options && (
                        <TableBody>
                          {task.options.map((option) => (
                            <TableRow>
                              <TableBodyCell>{option}</TableBodyCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      )}
                    </Table>
                  ))}
                </CardBody>
              </Card>
            </CardBody>
          </Card>
        ) : null}
      </section>
      <Button
        variant="success"
        size="lg"
        className={"float-right"}
        onClick={onSave}
      >
        Save Task
      </Button>
    </div>
  );
};
