import React from "react";

import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useHttp from "../../hooks/use-http";
const NewTask = (props) => {
  const { isLoading, error, sendRequest: enterTaskRequest } = useHttp();

  const newTaskHandler = (taskText) => {
    const postHandler = (data) => {
      const generatedId = data.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: taskText };

      props.onAddTask(createdTask);
    };
    enterTaskRequest(
      {
        url: "https://react-post-data-53086-default-rtdb.firebaseio.com/tasks.json",
        method: "POST",
        body: { text: taskText },
        headers: { "Content-Type": "application/json" },
      },
      postHandler
    );
  };
  return (
    <Section>
      <TaskForm onEnterTask={newTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
