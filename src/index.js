import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import { taskCompleted, titleChanged, taskDelete } from './store/task';

const store = configureStore();

const App = (params) => {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    store.subscribe(() => {
      setState(store.getState());
    });
  }, []);

  const completeTask = (taskId) => {
    store.dispatch(taskCompleted(taskId));
  };

  const changeTitle = (taskId) => {
    store.dispatch(titleChanged(taskId));
  };
  const changeDelete = (taskId) => {
    store.dispatch(taskDelete(taskId));
  };

  return (
    <>
      <h1>App</h1>
      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <h3>{el.title}</h3>
            <p>{el.description}</p>
            <p> {`Зроблено:${el.completed}`}</p>
            <button onClick={() => completeTask(el.id)}>Complete</button>
            <button onClick={() => changeTitle(el.id)}>Змінити назву</button>
            <button onClick={() => changeDelete(el.id)}>Видалити</button>
            <hr />
          </li>
        ))}
      </ul>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
