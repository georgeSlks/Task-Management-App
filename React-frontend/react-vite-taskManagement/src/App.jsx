import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    completed: false,
    dueDate: '',
    priority: 'normal',
  });
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.title && task.description) {
      const newTask = { ...task, id: Date.now() }; // Adding a unique id
      if (editingIndex !== null) {
        // Edit an existing task
        const updatedTasks = tasks.map((t) =>
          t.id === task.id ? newTask : t // Update task by matching id
        );
        setTasks(updatedTasks);
        setEditingIndex(null); // Reset editing state
      } else {
        // Add a new task
        setTasks([...tasks, newTask]);
      }
      setTask({ title: '', description: '', completed: false, dueDate: '', priority: 'normal' });
    }
  };

  const handleDelete = (id) => {
    // Remove task by filtering it out from the tasks array
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEdit = (id) => {
    // Set the form values to the task being edited
    const taskToEdit = tasks.find((task) => task.id === id); // Find task by id
    setTask(taskToEdit);
    setEditingIndex(id); // Mark that we are editing this task
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value); // Update the search term
  };

  const handleCompletionToggle = (id) => {
    // Toggle task completion
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Filter tasks based on the search term
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group tasks by priority
  const groupedTasks = {
    urgent: filteredTasks.filter((task) => task.priority === 'urgent'),
    important: filteredTasks.filter((task) => task.priority === 'important'),
    normal: filteredTasks.filter((task) => task.priority === 'normal'),
  };

  // Check if a task is past due
  const isPastDue = (dueDate) => {
    const currentDate = new Date();
    const taskDate = new Date(dueDate);
    return taskDate < currentDate && !isNaN(taskDate);
  };

  // Set the background color based on priority
  const getPriorityClass = (priority) => {
    if (priority === 'urgent') {
      return 'urgent'; // Light pink for urgent tasks
    } else if (priority === 'important') {
      return 'important'; // Orange for important tasks
    }
    return ''; // Default class for normal tasks
  };

  const handleFilterChange = (priority) => {
    setFilter(priority === filter ? '' : priority); // Toggle filter state
  };

  const tasksToDisplay =
    filter === ''
      ? filteredTasks
      : groupedTasks[filter] || [];

  return (
    <div className="App">
      <header>
        <h1>Task Management</h1>
      </header>
      <main className="main-container">
        {/* Left side: Only the Add New Task Form */}
        <div className="left-section">
          <div className="form-container">
            <h2>{editingIndex !== null ? 'Edit Task' : 'Add a New Task'}</h2>
            <form onSubmit={handleSubmit} className="task-form">
              <input
                type="text"
                name="title"
                value={task.title}
                onChange={handleInputChange}
                placeholder="Task Title"
                className="input-field"
              />
              <textarea
                name="description"
                value={task.description}
                onChange={handleInputChange}
                placeholder="Task Description"
                className="input-field"
              />
              <input
                type="date"
                name="dueDate"
                value={task.dueDate}
                onChange={handleInputChange}
                className="input-field"
              />
              <select
                name="priority"
                value={task.priority}
                onChange={handleInputChange}
                className="input-field"
              >
                <option value="normal">Normal</option>
                <option value="important">Important</option>
                <option value="urgent">Urgent</option>
              </select>
              <button type="submit" className="submit-btn">
                {editingIndex !== null ? 'Save Changes' : 'Add Task'}
              </button>
            </form>
          </div>
        </div>

        {/* Right side: Search Bar and Task List */}
        <div className="right-section">
          {/* Search Bar */}
          <div className="search-container">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
          </div>

          {/* Filter Buttons */}
          <div className="filter-buttons">
            <button
              onClick={() => handleFilterChange('urgent')}
              className={`filter-btn ${filter === 'urgent' ? 'active' : ''} urgent`}
            >
              Urgent
            </button>
            <button
              onClick={() => handleFilterChange('important')}
              className={`filter-btn ${filter === 'important' ? 'active' : ''} important`}
            >
              Important
            </button>
            <button
              onClick={() => handleFilterChange('normal')}
              className={`filter-btn ${filter === 'normal' ? 'active' : ''} normal`}
            >
              Normal
            </button>
          </div>

          {/* Display grouped tasks */}
          {tasksToDisplay.map((task) => (
            <div
              key={task.id} // Use the unique task id for key
              className={`card ${task.completed ? 'completed' : ''} ${isPastDue(task.dueDate) ? 'past-due' : ''} ${getPriorityClass(task.priority)}`}
            >
              <div className="task-header">
                <h2>{task.title}</h2>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleCompletionToggle(task.id)} // Use id to toggle completion
                  className="completion-checkbox"
                />
              </div>
              <p>{task.description}</p>
              {task.dueDate && <p className="due-date">{new Date(task.dueDate).toLocaleDateString()}</p>}
              <p className="priority-label">{task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</p>
              <button onClick={() => handleEdit(task.id)} className="edit-btn">
                Edit
              </button>
              <button onClick={() => handleDelete(task.id)} className="delete-btn">
                Delete
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
