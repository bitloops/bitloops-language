import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './App.css';
import { TodoServiceClient } from './bitloops/proto/TodoServiceClientPb';
import { AddTodoRequest, CompleteTodoRequest, DeleteTodoRequest, GetAllTodosRequest, ModifyTitleTodoRequest, Todo, UncompleteTodoRequest } from './bitloops/proto/todo_pb';
import TodoPanel from './components/TodoPanel';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import { AUTH_URL, REGISTRATION_URL } from './config';

async function sha256Hash(message: string) {
  // Convert the message to a Uint8Array
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  // Generate the hash
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  // Convert the hash to a hexadecimal string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}


function App(props: {service: TodoServiceClient}): JSX.Element {
  const { service } = props;
  const [todos, setTodos] = useState<Todo.AsObject[]>(localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos') || '') : []);
  const [user, setUser] = useState<{access_token: string} | null>(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : null);
  const [newValue, setNewValue] = useState('');
  const [editable, setEditable] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const loginWithEmailPassword = async (email: string, password: string) => {
    try {
      const response = await axios.post(AUTH_URL, { email, password });
      if (response.data) {
        setUser(response.data);
      }
    } catch (error: any) {
      if (error?.response?.data?.message === 'Unauthorized') setErrorMessage('Invalid credentials!');
    }
  };

  const registerWithEmailPassword = async (email: string, password: string) => {
    try {
      await axios.post(REGISTRATION_URL, { email, password });
    } catch (error: any) {
      setErrorMessage(error?.response?.data?.message);
    }
    
  };

  const clearAuth = () => {
    setUser(null);
    setTodos([]);
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (user) {
      getAllTodos();
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);


  async function getAllTodos() {
    try {
      const response = await service.getAll(new GetAllTodosRequest(), {authorization: `Bearer ${user?.access_token}`, 'cache-hash': await sha256Hash(JSON.stringify(todos))});
      if (response.hasError()) {
        const error: any = response.getError();
        console.error(error?.message);
        return;
      } else {
        setTodos(response.getOk()?.getTodosList().map((todo) => todo.toObject()) || []);
      }
    } catch (error: any) {
      // If there error message is CACHE_HIT, it means that the response was
      // cached and we don't need to do anything.
      if (error.message !== 'CACHE_HIT') {
        if (error?.message === 'Invalid JWT token') {
          clearAuth();
        }
      }
    }
  }

  async function addTodo(e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const request = new AddTodoRequest();
    request.setTitle(newValue);
    try {
      const response = await service.add(request, {authorization: `Bearer ${user?.access_token}`});
      if (response.hasError()) {
        const error = response.getError();
        console.error(error);
        return;
      } else {
        setNewValue('');
      }
    } catch (error: any) {
      if (error?.message === 'Invalid JWT token') {
        clearAuth();
      }
    }
  }

  async function modifyTodoTitle(e: any) {
    const { id, value } = e.target;
    const request = new ModifyTitleTodoRequest();
    request.setId(id);
    request.setTitle(value);
    const response = await service.modifyTitle(request, {authorization: `Bearer ${user?.access_token}`});
    if (response.hasError()) {
      const error: any = response.getError();
      if (error?.message === 'Invalid JWT token') {
        clearAuth();
      }
      return;
    }
  }

  async function deleteTodo(id: string) {
    const request = new DeleteTodoRequest();
    request.setId(id);
    try { 
      await service.delete(request, {authorization: `Bearer ${user?.access_token}`});
    } catch (error: any) {
      if (error?.message === 'Invalid JWT token') {
        clearAuth();
      }
    }
  }

  async function completeTodo(id: string) {
    const request = new CompleteTodoRequest();
    request.setId(id);
    try { 
    await service.complete(request, {authorization: `Bearer ${user?.access_token}`});
    } catch (error: any) {
      if (error?.message === 'Invalid JWT token') {
        clearAuth();
      }
    }
  }

  async function uncompleteTodo(id: string) {
    const request = new UncompleteTodoRequest();
    request.setId(id);
    try { 
    await service.uncomplete(request, {authorization: `Bearer ${user?.access_token}`});
    } catch (error: any) {
      if (error?.message === 'Invalid JWT token') {
        clearAuth();
      }
    }
  }

  async function updateLocalItem(e: any) {
    const { id, value } = e.target;
    const newData: Todo.AsObject[] = JSON.parse(JSON.stringify(todos));
      for (let i = 0; i < newData.length; i += 1) {
      if (newData[i].id === id) {
        newData[i].title = value;
        setTodos(newData);
        break;
      }
    }
  }

  async function handleCheckbox(e: any): Promise<void> {
    const { id } = e.target;
    const { checked } = e.target;
    const newData: Todo.AsObject[] = JSON.parse(JSON.stringify(todos));
    for (let i = 0; i < newData.length; i += 1) {
      if (newData[i].id === id) {
        newData[i].completed = checked;
        if (checked) {
          await completeTodo(newData[i].id);
        } else {
          await uncompleteTodo(newData[i].id);
        }
      }
    }
  }

  return (
    <div className="App">
      {user && <Header user={user} logout={clearAuth} />}
      {!user && <LoginForm loginWithEmailPassword={loginWithEmailPassword} registerWithEmailPassword={registerWithEmailPassword} />}
      {user && <TodoPanel
        newValue={newValue}
        setNewValue={setNewValue}
        addItem={addTodo}
        updateLocalItem={updateLocalItem}
        modifyTitle={modifyTodoTitle}
        removeItem={deleteTodo}
        editable={editable}
        setEditable={setEditable}
        handleCheckbox={handleCheckbox}
        data={todos}
      />}
      <div className="error-message">{errorMessage}</div>
    </div>
  );
}

export default App;
