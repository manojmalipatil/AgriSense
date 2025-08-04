import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle, Plus, Filter } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed';
  dueDate: string;
  category: string;
}

const TaskManager: React.FC = () => {
  const [tasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Apply Nitrogen Fertilizer',
      description: 'Apply recommended urea fertilizer to wheat field sector A',
      priority: 'high',
      status: 'pending',
      dueDate: '2025-01-15',
      category: 'Fertilization'
    },
    {
      id: '2',
      title: 'Pest Inspection',
      description: 'Check tomato plants for early blight symptoms',
      priority: 'medium',
      status: 'in-progress',
      dueDate: '2025-01-12',
      category: 'Disease Control'
    },
    {
      id: '3',
      title: 'Irrigation Schedule',
      description: 'Water the corn field - morning irrigation cycle',
      priority: 'high',
      status: 'completed',
      dueDate: '2025-01-10',
      category: 'Irrigation'
    },
    {
      id: '4',
      title: 'Soil pH Testing',
      description: 'Test soil pH levels in the new plantation area',
      priority: 'low',
      status: 'pending',
      dueDate: '2025-01-20',
      category: 'Soil Management'
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');

  const filteredTasks = tasks.filter(task => filter === 'all' || task.status === filter);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-700 mb-4">Task Manager</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Organize and track your agricultural tasks and activities
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Tasks</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <button className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
              <Plus className="w-4 h-4" />
              <span>Add Task</span>
            </button>
          </div>

          {/* Tasks Grid */}
          <div className="grid gap-6">
            {filteredTasks.map((task) => (
              <div key={task.id} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-start space-x-4">
                      <div className="mt-1">
                        <CheckCircle 
                          className={`w-5 h-5 ${
                            task.status === 'completed' 
                              ? 'text-green-500' 
                              : 'text-gray-300'
                          }`} 
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{task.title}</h3>
                        <p className="text-gray-600 mb-3">{task.description}</p>
                        <div className="flex items-center space-x-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                            {task.status.charAt(0).toUpperCase() + task.status.slice(1).replace('-', ' ')}
                          </span>
                          <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                            {task.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>
                        {new Date(task.dueDate) > new Date() 
                          ? `${Math.ceil((new Date(task.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left`
                          : 'Overdue'
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTasks.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Calendar className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-600 mb-2">No tasks found</h3>
              <p className="text-gray-500">Create your first task to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskManager;