import React, { useEffect, useState } from 'react';
import useHttp from './hooks/use-http';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';

function App() {
  const [tasks, setTasks] = useState([]);

  

  const {isLoading, error, sendRequest: fetchTasks} = useHttp()

  useEffect(() => {

    const transformTasks = (tasksOjs) => {
      const loadedTasks = [];
      for (const taskKey in tasksOjs) {
        loadedTasks.push({ id: taskKey, text: tasksOjs[taskKey].text });
      }
      setTasks(loadedTasks);
    }

    fetchTasks({
      url: 'https://custom-hooks-02-b2aeb-default-rtdb.firebaseio.com/tasks.json'}, 
      transformTasks
    )
  }, [fetchTasks]);

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
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
