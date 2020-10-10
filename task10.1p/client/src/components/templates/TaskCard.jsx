import React from "react";
import PropTypes from "prop-types";
import C from "classnames";
import { Card } from "../base/Card";
import { Button } from "../base/Button";
import { CardHeader } from "../base/CardHeader";
import { CardBody } from "../base/CardBody";
import { CardFooter } from "../base/CardFooter";
import { CardTitle } from "../base/CardTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";

export const TaskCard = (props) => {
  return (
    <Card
      className={C(
        props.className,
        "flex-grow-1",
        props.active && "col-12 col-md-6 task-card-active"
      )}
    >
      <CardHeader className="d-flex justify-content-between">
        <CardTitle className="mb-0 ">{props.title}</CardTitle>
        {props.active && (
          <Button className="text-muted" onClick={props.toggleActive}>
            <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
          </Button>
        )}
      </CardHeader>
      <CardBody>
        <div className={C("d-flex flex-column")}>
          {props.active && <small>Description</small>}
          <span>{props.description}</span>
          {props.active && (
            <div className="my-1">
              <small>Question Details</small>{" "}
              <div className="d-flex flex-row ">
                <span>
                  Multiple Choice Questions:{" "}
                  {props.tasks &&
                    props.tasks.filter(
                      (task) => task.type === "Multiple Choice"
                    ).length}
                </span>
              </div>
              <div className="d-flex flex-row my-1">
                <span>
                  True or False Questions:{" "}
                  {props.tasks &&
                    props.tasks.filter((task) => task.type === "True or False")
                      .length}
                </span>
              </div>
              <div className="d-flex flex-row my-1">
                <span>
                  Long Form Questions:{" "}
                  {props.tasks &&
                    props.tasks.filter(
                      (task) => task.type === "Long Form Answer"
                    ).length}
                </span>
              </div>
              <div className="d-flex flex-row my-1">
                <span>
                  Image Processing Questions:{" "}
                  {props.tasks &&
                    props.tasks.filter(
                      (task) => task.type === "Image Processing"
                    ).length}
                </span>
              </div>
              <div className="d-flex flex-row">
                <span>
                  Total Reward Points:{" "}
                  {props.tasks &&
                    props.tasks.reduce((acc, { reward }) => {
                      return reward
                        ? parseInt(acc) + parseInt(reward)
                        : parseInt(acc);
                    }, 0)}
                </span>
              </div>
              {props.active && (
                <div className="my-1">
                  <small>Task Details</small>{" "}
                  <div className="d-flex flex-row">
                    <span>
                      Number of Permitted Workers: {props.noOfWorkers}
                    </span>
                  </div>
                  <div className="d-flex flex-row">
                    <span>
                      Experience Required:{" "}
                      {props.requireExperience ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </CardBody>
      <CardFooter className="d-flex justify-content-between">
        <div>
          {props.active && <small className="mr-2">Expiry Date</small>}
          <span>{props.expiryDate}</span>
        </div>
        {props.active && (
          <Button className="text-muted" onClick={props.deleteTask}>
            <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

TaskCard.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  expiryDate: PropTypes.string,
  noOfWorkers: PropTypes.string,
  requireExperience: PropTypes.bool,
  tasks: PropTypes.array,
  toggleActive: PropTypes.func,
  deleteTask: PropTypes.func,
};
