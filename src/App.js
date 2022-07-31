import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useFetch } from './hooks/useFetch.js';

import { configs } from './configs/mainConfig';
import { todoActions } from './store';

import Error from './components/Error';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { setTodos } = todoActions;
  const { connection: { BASE_URL: url } } = configs;
  const { data, error } = useFetch(url);

  useEffect(() => {
    dispatch(setTodos(data))
  },[data,dispatch,setTodos])

  return (
    <div className='App'>
      {data && <TodoList />}
      {error && <Error />}
    </div>
  )
}

export default App;
