import React, { useEffect, useState } from 'react';
import useHttp from './hooks/use-http';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';

function App() {
  const [tasks, setTasks] = useState([]);
  const {isLoading, error, sendRequest} = useHttp()

  useEffect(() => {
    // arrange tasks informations into an array in a simpler way
    const transformTasks = (tasksOjs) => {
      const loadedTasks = [];
      for (const taskKey in tasksOjs) {
        loadedTasks.push({ id: taskKey, text: tasksOjs[taskKey].text });
      }
      setTasks(loadedTasks);
    }
    
    // function recieved from the useHttp rook, configuring the http request
    sendRequest(
      {
        url: 'https://custom-hooks-02-b2aeb-default-rtdb.firebaseio.com/tasks.json'
      }, 
      transformTasks
    )

  }, [sendRequest]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={sendRequest}
      />
    </React.Fragment>
  );
}

export default App;
