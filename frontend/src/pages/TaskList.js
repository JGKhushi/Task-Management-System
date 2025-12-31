import React, { useEffect, useState, useCallback } from 'react';
import api from '../utils/api';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import { useAuth } from '../context/AuthContext';
import { Filter } from 'lucide-react';

const TaskList = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ status: '', priority: '', page: 1 });
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    try {
      const { data } = await api.get('/tasks', { params: filters });
      setTasks(data.tasks);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleUpdateStatus = async (id, updates) => {
    try {
      await api.put(`/tasks/${id}`, updates);
      fetchTasks();
    } catch (err) {
      alert('Failed to update task');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this task?')) {
      try {
        await api.delete(`/tasks/${id}`);
        fetchTasks();
      } catch (err) {
        alert('Failed to delete task');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 space-y-6">
        <TaskForm user={user} onTaskCreated={fetchTasks} />
        
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <div className="flex items-center text-gray-700 font-bold mb-2">
            <Filter className="w-5 h-5 mr-2" /> Filters
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">Status</label>
            <select
              className="mt-1 block w-full border-gray-300 rounded-md p-2 border text-sm"
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</label>
            <select
              className="mt-1 block w-full border-gray-300 rounded-md p-2 border text-sm"
              value={filters.priority}
              onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
            >
              <option value="">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Your Tasks</h2>
          <span className="text-gray-500 text-sm">{tasks.length} tasks found</span>
        </div>

        {loading ? (
          <p>Loading tasks...</p>
        ) : tasks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tasks.map(task => (
              <TaskCard
                key={task._id}
                task={task}
                onUpdate={handleUpdateStatus}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg p-10 text-center border-2 border-dashed border-gray-200">
            <p className="text-gray-500">No tasks found. Create one to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
