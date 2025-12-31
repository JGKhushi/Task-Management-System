import React from 'react';
import { Clock, AlertCircle, CheckCircle, Trash2 } from 'lucide-react';

const TaskCard = ({ task, onUpdate, onDelete }) => {
  const priorityColors = {
    High: 'text-red-600 bg-red-100',
    Medium: 'text-yellow-600 bg-yellow-100',
    Low: 'text-green-600 bg-green-100'
  };

  const handleToggleStatus = () => {
    onUpdate(task._id, { status: task.status === 'Pending' ? 'Completed' : 'Pending' });
  };

  return (
    <div className="bg-white rounded-lg shadow p-5 border-l-4 border-indigo-500">
      <div className="flex justify-between items-start">
        <h3 className={`text-lg font-semibold ${task.status === 'Completed' ? 'line-through text-gray-400' : 'text-gray-900'}`}>
          {task.title}
        </h3>
        <span className={`px-2 py-1 text-xs font-medium rounded ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>
      <p className="mt-2 text-gray-600 text-sm line-clamp-2">{task.description}</p>
      
      <div className="mt-4 flex items-center text-gray-500 text-xs">
        <Clock className="w-4 h-4 mr-1" />
        <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
      </div>

      <div className="mt-4 flex justify-between items-center pt-4 border-t border-gray-100">
        <button
          onClick={handleToggleStatus}
          className={`flex items-center text-sm font-medium ${task.status === 'Completed' ? 'text-green-600' : 'text-indigo-600'}`}
        >
          {task.status === 'Completed' ? (
            <><CheckCircle className="w-4 h-4 mr-1" /> Completed</>
          ) : (
            <><AlertCircle className="w-4 h-4 mr-1" /> Mark Done</>
          )}
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
