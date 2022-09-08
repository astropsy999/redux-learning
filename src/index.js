import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { getError } from './store/errors';
import configureStore from './store/store';
import {
  titleChanged,
  taskDelete,
  completeTask,
  loadTasks,
  getTasks,
  getTasksLoadingStatus,
  createTask,
} from './store/task';

const store = configureStore();

const App = (params) => {
  const state = useSelector(getTasks());
  const dispatch = useDispatch();
  const isLoading = useSelector(getTasksLoadingStatus());
  const error = useSelector(getError());

  useEffect(() => {
    dispatch(loadTasks());
  }, [dispatch]);

  const addNewTask = () => {
    dispatch(createTask({ userId: 1, title: 'Нова задача', completed: false }));
  };

  const changeTitle = (taskId) => {
    dispatch(titleChanged(taskId));
  };
  const changeDelete = (taskId) => {
    dispatch(taskDelete(taskId));
  };

  if (isLoading) {
    return <h1>Завантаження...</h1>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <h1>App</h1>
      <div>
        <button onClick={addNewTask}>Додати задачу</button>
      </div>
      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p> {`Зроблено:${el.completed}`}</p>
            <button onClick={() => dispatch(completeTask(el.id))}>
              Завершено
            </button>
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
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
