import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const Todo = () => {
  const { user } = useOutletContext();
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('tmbill-acccess-token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/todo/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      
      const data = await response.json();
      setTodos(data);
    } catch (err) {
    //   setError(err.message);
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    
    try {
      const token = localStorage.getItem('tmbill-acccess-token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/todo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ text: newTodo })
      });
      
      if (!response.ok) {
        throw new Error('Failed to add todo');
      }
      
      const addedTodo = await response.json();
      setTodos([...todos, addedTodo]);
      setNewTodo('');
    } catch (err) {
      setError(err.message);
      console.error('Error adding todo:', err);
    }
  };

  const toggleComplete = async (id) => {
    const todoToToggle = todos.find(todo => todo._id === id);
    if (!todoToToggle) return;
    
    try {
      const token = localStorage.getItem('tmbill-acccess-token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/todo/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ completed: !todoToToggle.completed })
      });
      
      if (!response.ok) {
        throw new Error('Failed to update todo');
      }
      
      setTodos(todos.map(todo => 
        todo._id === id ? { ...todo, completed: !todo.completed } : todo
      ));
    } catch (err) {
      setError(err.message);
      console.error('Error updating todo:', err);
    }
  };

  const startEditing = (todo) => {
    setEditingId(todo._id);
    setEditText(todo.text);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditText('');
  };

  const updateTodo = async (id) => {
    if (!editText.trim()) return;
    
    try {
      const token = localStorage.getItem('tmbill-acccess-token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/todo/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ text: editText })
      });
      
      if (!response.ok) {
        throw new Error('Failed to update todo');
      }
      
      setTodos(todos.map(todo => 
        todo._id === id ? { ...todo, text: editText } : todo
      ));
      setEditingId(null);
      setEditText('');
    } catch (err) {
      console.error('Error updating todo:', err);
      setError(err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const token = localStorage.getItem('tmbill-acccess-token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/todo/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }
      
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      setError(err.message);
      console.error('Error deleting todo:', err);
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.length - completedCount;

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg md:p-8">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">My Todo List</h1>
        <p className="text-gray-600">Organize your tasks and boost productivity</p>
      </div>

      {/* Add Todo Form */}
      <form onSubmit={addTodo} className="flex mb-6 space-x-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task..."
          className="flex-grow px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add
        </button>
      </form>

      {/* Filters */}
      <div className="flex flex-wrap justify-between mb-6 text-sm">
        <div className="flex space-x-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-md transition-colors ${filter === 'all' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-3 py-1 rounded-md transition-colors ${filter === 'active' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-1 rounded-md transition-colors ${filter === 'completed' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            Completed
          </button>
        </div>
        <div className="mt-2 text-gray-500 sm:mt-0">
          <span className="mr-3">{activeCount} active</span>
          <span>{completedCount} completed</span>
        </div>
      </div>

      {/* Todo List */}
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="p-4 text-center text-red-500 bg-red-50 rounded-md">
          {error}
        </div>
      ) : filteredTodos.length === 0 ? (
        <div className="py-12 text-center text-gray-500">
          {todos.length === 0 ? "No todos yet. Add one above!" : "No todos match your filter."}
        </div>
      ) : (
        <ul className="overflow-hidden divide-y divide-gray-200 rounded-md shadow-sm border border-gray-200">
          {filteredTodos.map(todo => (
            <li 
              key={todo._id} 
              className={`transition-colors ${todo.completed ? 'bg-green-50' : 'bg-white'}`}
            >
              {editingId === todo._id ? (
                <div className="flex items-center p-4">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-grow px-3 py-1 mr-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={() => updateTodo(todo._id)}
                      className="px-3 py-1 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="px-3 py-1 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center flex-grow mr-4">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleComplete(todo._id)}
                      className="w-5 h-5 mr-3 text-blue-600 border-gray-300 rounded cursor-pointer focus:ring-blue-500"
                    />
                    <span className={`text-gray-800 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                      {todo.text}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => startEditing(todo)}
                      className="px-2 py-1 text-sm text-blue-600 bg-blue-100 rounded hover:bg-blue-200 focus:outline-none"
                      aria-label="Edit todo"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTodo(todo._id)}
                      className="px-2 py-1 text-sm text-red-600 bg-red-100 rounded hover:bg-red-200 focus:outline-none"
                      aria-label="Delete todo"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Todo;