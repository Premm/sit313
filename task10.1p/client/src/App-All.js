import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import { Nav } from "./components/base/Nav";
import { NavBar } from "./components/base/NavBar";
import { NavBrand } from "./components/base/NavBrand";
import { NavItem } from "./components/base/NavItem";
import { NavLink } from "./components/base/NavLink";
import { Button } from "./components/base/Button";
import { Input } from "./components/base/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Home } from "./components/pages/home";
import { NewTask } from "./components/pages/tasks/new";
import { Tasks } from "./components/pages/tasks/tasks";

/* 
########################################################
    FOR TASK 10.1P UPDATES, HEAD TO LINE 232. 
#########################################################   
*/
/*
####################################################
CSS I ADDED - I used bootrstrap for the rest.
####################################################

@font-face {
  font-family: "Roboto";
  src: url("./fonts/Roboto-Regular.ttf");
}

.hero-image {
  max-height: 400px;
}

html,
body {
  font-family: "Roboto", Arial, Helvetica, sans-serif;
}

*/

const variantMapper = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  info: "btn-info",
  success: "btn-success",
  warning: "btn-warning",
  danger: "btn-danger",
};

const sizeMapper = {
  sm: "btn-sm",
  lg: "btn-lg",
};

const Button = (props) => {
  return (
    <button
      className={C(
        "btn",
        props.variant && variantMapper[props.variant],
        props.size && sizeMapper[props.size],
        props.className
      )}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
Button.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func,
};

const FeaturedUser = (props) => {
  return (
    <div className={C("d-flex", "col-6", "col-lg-3", "col-md-4")}>
      <div className={C("card", "mb-2")}>
        <div className={C("card-image")}>
          <img src={props.imageUri} width="100%" alt={props.alt} />
        </div>
        <div className={C("card-body")}>
          <h3>{props.name}</h3>
          <p>{props.description}</p>
        </div>
      </div>
    </div>
  );
};

FeaturedUser.propTypes = {
  className: PropTypes.string,
  imageUri: PropTypes.string,
  alt: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
};

const FeaturedUserContainer = (props) => {
  return (
    <div className={C("d-flex flex-row flex-wrap py-2", props.className)}>
      {props.children}
    </div>
  );
};

const HeroImage = (props) => {
  return (
    <div
      className={C(
        "hero-image",
        "d-flex",
        "align-items-center",
        "justify-content-center",
        "overflow-hidden"
      )}
    >
      <img src={props.uri} alt={props.alt} />
    </div>
  );
};
HeroImage.propTypes = {
  className: PropTypes.string,
  uri: PropTypes.string,
  alt: PropTypes.string,
};

const Input = (props) => {
  return (
    <input
      className={C(props.className, "form-control")}
      name={props.name}
      id={props.id}
      value={props.value}
      onChange={props.onChange}
    ></input>
  );
};
Input.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

const bgMapper = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  info: "bg-info",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  light: "bg-light",
  dark: "bg-dark",
};

const Nav = (props) => {
  return (
    <div className={C(props.bg && bgMapper[props.bg])}>
      <nav
        className={C(
          "nav d-flex justify-content-between container",
          props.className
        )}
      >
        {props.children}
      </nav>
    </div>
  );
};

Nav.propTypes = {
  className: PropTypes.string,
  bg: PropTypes.string,
};

const NavBar = (props) => {
  return <div className={C("navbar")}>{props.children}</div>;
};

NavBar.propTypes = {
  className: PropTypes.string,
};

const NavBrand = (props) => {
  return <div className={C(props.className)}>{props.children}</div>;
};

NavBrand.propTypes = {
  className: PropTypes.string,
};

const NavItem = (props) => {
  return <div className={C("nav-item", props.className)}>{props.children}</div>;
};

NavItem.propTypes = {
  className: PropTypes.string,
};

const NavLink = (props) => {
  return (
    <Link className={C("nav-link", props.className)} to={props.to}>
      {props.children}
    </Link>
  );
};

NavLink.propTypes = {
  className: PropTypes.string,
  to: PropTypes.string,
};

const SectionHeading = (props) => {
  return (
    <div className={"d-flex justify-content-center py-4"}>
      <h2>{props.children}</h2>
    </div>
  );
};

/*
##############################################
NEW CSS CREATED FOR TASK 10.2P
##############################################

.task-card-container {
  transition: background-color 0.15s ease-in-out;
}

.task-card-active-container {
  z-index: 99;
  padding-right: 15px;
  padding-left: 15px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  min-height: 100vh;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  transition: background-color 0.15s ease-in-out;
}

.card.task-card-active {
  padding-right: 0;
  padding-left: 0;
}
*/
/*
##############################################
NEW BASE COMPONENTS CREATED IN TASK 10.1P/10.2D 

I did task 10.1P and 10.2D at the same time, 
so I can't really distinguish which components were made in Task10.1P and Task10.2D.

All the components below are the same components that were in my submission for Task10.1P.
##############################################
*/

export const ButtonGroup = (props) => {
  return (
    <div className={C("btn-group", props.className)}>{props.children}</div>
  );
};

ButtonGroup.propTypes = {
  className: PropTypes.string,
};

export const Card = (props) => {
  return (
    <div className={C("card", props.className)} onClick={props.onClick}>
      {props.children}
    </div>
  );
};

Card.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export const CardBody = (props) => {
  return (
    <div className={C("card-body", props.className)}>{props.children}</div>
  );
};

CardBody.propTypes = {
  className: PropTypes.string,
};

export const CardFooter = (props) => {
  return (
    <div className={C("card-footer", props.className)}>{props.children}</div>
  );
};

CardFooter.propTypes = {
  className: PropTypes.string,
};

export const CardHeader = (props) => {
  return (
    <div className={C("card-header", props.className)}>{props.children}</div>
  );
};

CardHeader.propTypes = {
  className: PropTypes.string,
};

export const CardTitle = (props) => {
  return <h5 className={C("card-title", props.className)}>{props.children}</h5>;
};

CardTitle.propTypes = {
  className: PropTypes.string,
};

export const FormGroup = (props) => {
  return (
    <div className={C("form-group", props.className)}>{props.children}</div>
  );
};

FormGroup.propTypes = {
  className: PropTypes.string,
};

export const InputGroup = (props) => {
  return (
    <div className={C(props.className, "input-group")}>{props.children}</div>
  );
};
InputGroup.propTypes = {
  className: PropTypes.string,
};

export const InputGroupAppend = (props) => {
  return (
    <div className={C(props.className, "input-group-append")}>
      {props.children}
    </div>
  );
};
InputGroupAppend.propTypes = {
  className: PropTypes.string,
};

export const InputGroupText = (props) => {
  return (
    <span className={C(props.className, "input-group-text")}>
      {props.children}
    </span>
  );
};
InputGroupText.propTypes = {
  className: PropTypes.string,
};

const tableVariantMapper = {
  light: "table-light",
  dark: "table-dark",
};

export const Table = (props) => {
  return (
    <table
      className={C(
        "table",
        props.striped && "table-striped",
        props.varaint && tableVariantMapper[props.variant],
        props.className
      )}
    >
      {props.children}
    </table>
  );
};

Table.propTypes = {
  className: PropTypes.string,
  striped: PropTypes.bool,
  variant: PropTypes.string,
};

export const TableBody = (props) => {
  return <tbody className={C(props.className)}>{props.children}</tbody>;
};

TableBody.propTypes = {
  className: PropTypes.string,
};

export const TableBodyCell = (props) => {
  return (
    <td
      colSpan={props.colSpan}
      rowSpan={props.rowSpan}
      className={C(props.className)}
    >
      {props.children}
    </td>
  );
};

TableBodyCell.propTypes = {
  className: PropTypes.string,
  scope: PropTypes.string,
  colSpan: PropTypes.number,
  rowSpan: PropTypes.number,
};

const tableHeaderVariantMapper = {
  light: "thead-light",
  dark: "thead-dark",
};

export const TableHeader = (props) => {
  return (
    <thead
      className={C(
        props.className,
        props.variant && tableHeaderVariantMapper[props.variant]
      )}
    >
      <tr>{props.children}</tr>
    </thead>
  );
};

TableHeader.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.string,
};

export const TableHeaderCell = (props) => {
  return (
    <th scope={props.scope || "col"} className={C(props.className)}>
      {props.children}
    </th>
  );
};

TableHeaderCell.propTypes = {
  className: PropTypes.string,
  scope: PropTypes.string,
};

export const TableRow = (props) => {
  return <tr className={C(props.className)}>{props.children}</tr>;
};

TableRow.propTypes = {
  className: PropTypes.string,
  scope: PropTypes.string,
};

export const TextArea = (props) => {
  return (
    <textarea
      className={C(props.className, "form-control")}
      name={props.name}
      id={props.id}
      value={props.value}
      onChange={props.onChange}
    ></textarea>
  );
};
TextArea.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

/*
###################################
NEW TASKS PAGE - tasks/new

This includes the image processing functionality - which was also present in my task 10.1P submission.
###################################
*/
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

//easy way to change all labels easily and make sure all I dont make a syntax/spelling error.
const TaskType = {
  CHOICE: "Multiple Choice",
  DECISION: "True or False",
  SENTENCE: "Long Form Answer",
  IMAGE: "Image Processing",
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
    imageURI: "",
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
                  imageURI: "",
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
                  imageURI: "",
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
                  imageURI: "",
                }));
              }}
            >
              {TaskType.SENTENCE}
            </Button>
            <Button
              variant="secondary"
              active={taskTypeSelected === TaskType.IMAGE}
              onClick={() => {
                setTaskTypeSelected(TaskType.IMAGE);
                setFormData((s) => ({ ...s, taskType: TaskType.IMAGE }));
                setTemporaryTask((s) => ({
                  question: "",
                  options: [],
                  reward: 1,
                  imageURI: "",
                }));
              }}
            >
              {TaskType.IMAGE}
            </Button>
          </ButtonGroup>
          <small className="text-center mt-2">
            {taskTypeSelected === TaskType.CHOICE
              ? "A multiple choice question."
              : taskTypeSelected === TaskType.DECISION
              ? "A question requiring a true or false answer."
              : taskTypeSelected === TaskType.SENTENCE
              ? "A question or set of instructions requiring a free-form text-based answer."
              : taskTypeSelected === TaskType.IMAGE
              ? "A question based on an image displayed."
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
                        imageURI: "",
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
                        imageURI: "",
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
                        imageURI: "",
                      }));
                    }
                  }}
                >
                  Add Question
                </Button>
              </section>
            </>
          )}
          {taskTypeSelected === TaskType.IMAGE && (
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
                      <TableBody>
                        <TableRow>
                          <TableBodyCell colSpan={2}>
                            <label htmlFor="temporaryOption">
                              Add an Image URI
                            </label>
                            <Input
                              type="text"
                              name="image"
                              id="image"
                              onChange={(e) => {
                                const value = e.target.value;
                                setTemporaryTask((s) => ({
                                  ...s,
                                  imageURI: value,
                                }));
                              }}
                              value={temporaryTask.imageURI}
                            ></Input>
                          </TableBodyCell>
                        </TableRow>
                      </TableBody>
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
                        imageURI: "",
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
                      {task.imageURI && (
                        <TableBody>
                          <TableRow>
                            <TableBodyCell>
                              {<img src={task.imageURI}></img>}
                            </TableBodyCell>
                          </TableRow>
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

/*
####################################
END NEW TASKS PAGE
###################################
*/

/*
####################################
UPDATED APP COMPONENT
###################################
*/
function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Nav bg="light">
        <NavBar>
          <NavBrand>
            <h3>ICrowdTasker</h3>
          </NavBrand>
        </NavBar>
        <NavBar>
          <NavItem>
            <NavLink to="#">How It Works</NavLink>
          </NavItem>

          <NavItem>
            <NavLink to="#">Requesters</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="#">Workers</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="#">Pricing</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="#">About</NavLink>
          </NavItem>
        </NavBar>
        <NavBar>
          <Button variant="primary">Login</Button>
        </NavBar>
      </Nav>

      {/* Content */}
      <section className="flex-grow-1 d-flex flex-column align-items-center  mb-5">
        <Switch>
          <Route path="/tasks/new">
            <NewTask />
          </Route>
          <Route path="/tasks">
            <Tasks />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </section>
      {/* End Content */}

      <footer>
        <Nav bg="light">
          <NavBar>
            <NavItem>
              <h4>Newsletter</h4>
            </NavItem>
            <NavItem>
              <form>
                <div className="input-group px-2 d-flex flex-row">
                  <Input
                    name="email"
                    onChange={() => console.log("control value here")}
                  />
                  <div className="input-group-append">
                    <Button
                      variant={"secondary"}
                      onClick={(e) => e.preventDefault()}
                    >
                      Subscribe
                    </Button>
                  </div>
                </div>
              </form>
            </NavItem>
          </NavBar>
          <NavBar>
            <NavItem>
              <h4>Connect</h4>
            </NavItem>
            <NavItem>
              <NavLink to="#">
                <FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="#">
                <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="#">
                <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>
              </NavLink>
            </NavItem>
          </NavBar>
        </Nav>
      </footer>
    </div>
  );
}

export default App;

/*
####################################
NEW TASKS MONGOOSE DB MODEL CODE - Commented out so that this still file runs.
###################################

const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  expiryDate: String,
  requireExperience: Boolean,
  noOfWorkers: Number,
  tasks: [
    {
      type: { type: String },
      question: String,
      reward: String,
      options: [String],
      imageURI: String,
    },
  ],
});

module.exports = mongoose.model("Task", taskSchema);

####################################
TASKS MONGOOSE API CODE  FOR POST/GET and DELETE - Commented out so that this still file runs.
###################################


 // tasks
  app
    .route("/tasks")
    // Retrieve
    .get((req, res) => {
      db.models.Task.find((err, tasks) => {
        if (err) {
          return res.send(err);
        }
        res.json(tasks);
      });
    })
    //Add
    .post((req, res) => {
      console.log(req.body);
      const task = new db.models.Task(req.body);
      console.log(task);
      task
        .save()
        .then(() => {
          res.json("saved successfully!");
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json("failed to save!");
        });
    });

  app.route("/tasks/:taskId").delete((req, res) => {
    db.models.Task.deleteOne({ _id: req.params.taskId }, (err) => {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(200).json("Task Deleted");
    });
  });


*/
