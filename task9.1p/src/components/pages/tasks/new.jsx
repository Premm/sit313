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

const TaskType = {
  CHOICE: "Multiple Choice",
  DECISION: "True or False",
  SENTENCE: "Long Form Answer",
};

export const NewTask = (props) => {
  const [taskTypeSelected, setTaskTypeSelected] = React.useState(
    TaskType.CHOICE
  );

  const [formData, setFormData] = React.useState({
    tasks: [],
    noOfWorkers: 1,
    requireExperience: false,
  });

  const [temporaryTask, setTemporaryTask] = React.useState({
    type: "",
    question: "",
    options: [],
    reward: 1,
  });

  const [temporaryTaskOptionData, setTemporaryTaskOptionData] = React.useState(
    {}
  );

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const onCheckboxToggle = (e) => {
    const name = e.target.id;
    setFormData((s) => {
      return { ...s, [name]: !s[name] };
    });
  };

  const onChangeDate = (date) => {
    setFormData((s) => ({ ...s, expiryDate: date }));
  };

  const onChangeTemporaryOption = (e) => {
    const value = e.target.value;
    setTemporaryTaskOptionData((s) => ({ ...s, option: value }));
  };

  return (
    <div className="container justify-content-center align-items-center">
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
              value={formData.requireExperience}
              onChange={onCheckboxToggle}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="noOfWorkers">Number of permitted Workers</label>
            <Input
              type="number"
              name="noOfWorkers"
              id="noOfWorkers"
              value={formData.noOfWorkers}
              onChange={onChange}
            ></Input>
          </FormGroup>
        </CardBody>
      </Card>

      <Card className="my-2">
        <CardHeader>
          <CardTitle className="mb-0">Task Questions</CardTitle>
        </CardHeader>
        <CardBody className="d-flex flex-column">
          <CardTitle>Question Type</CardTitle>
          <ButtonGroup>
            <Button
              variant="primary"
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
              variant="primary"
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
              variant="primary"
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
                            onChange={(e) =>
                              setTemporaryTask((s) => ({
                                ...s,
                                question: e.target.value,
                              }))
                            }
                          ></Input>
                        </TableHeaderCell>
                        <TableHeaderCell>
                          <label htmlFor="temporaryDescription">Reward</label>
                          <Input
                            type="number"
                            name="temporaryReward"
                            id="temporaryReward"
                            value={temporaryTask.reward}
                            onChange={(e) =>
                              setTemporaryTask((s) => ({
                                ...s,
                                reward: e.target.value,
                              }))
                            }
                          ></Input>
                        </TableHeaderCell>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableBodyCell colspan={2}>
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
                              <TableBodyCell colspan={2}>
                                {option}
                              </TableBodyCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </CardBody>
                </Card>
                <Button
                  className="w-100 my-2"
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
                                setTemporaryTask((s) => ({
                                  ...s,
                                  question: e.target.value,
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
                            onChange={(e) =>
                              setTemporaryTask((s) => ({
                                ...s,
                                reward: e.target.value,
                              }))
                            }
                          ></Input>
                        </TableHeaderCell>
                      </TableHeader>
                    </Table>
                  </CardBody>
                </Card>
                <Button
                  className="w-100 my-2"
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
                              setTemporaryTask((s) => ({
                                ...s,
                                question: e.target.value,
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
                            onChange={(e) =>
                              setTemporaryTask((s) => ({
                                ...s,
                                reward: e.target.value,
                              }))
                            }
                          ></Input>
                        </TableHeaderCell>
                      </TableHeader>
                    </Table>
                  </CardBody>
                </Card>
                <Button
                  className="w-100 my-2"
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
    </div>
  );
};
