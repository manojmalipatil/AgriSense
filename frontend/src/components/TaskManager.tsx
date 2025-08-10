import React, { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle, Plus, Filter, X, Edit, Trash2, Droplets, Sprout, Scissors, Eye, MoreHorizontal } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed';
  due_date: string;
  category: 'watering' | 'fertilising' | 'harvesting' | 'monitoring' | 'others';
  created_at: string;
  updated_at: string;
}

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    category: 'watering' as Task['category'],
    priority: 'medium' as Task['priority'],
    due_date: new Date().toISOString().split('T')[0]
  });

  const categories = [
    { id: 'watering', name: 'Watering', icon: <Droplets className="w-4 h-4" />, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { id: 'fertilising', name: 'Fertilising', icon: <Sprout className="w-4 h-4" />, color: 'text-green-600', bgColor: 'bg-green-100' },
    { id: 'harvesting', name: 'Harvesting', icon: <Scissors className="w-4 h-4" />, color: 'text-orange-600', bgColor: 'bg-orange-100' },
    { id: 'monitoring', name: 'Monitoring', icon: <Eye className="w-4 h-4" />, color: 'text-purple-600', bgColor: 'bg-purple-100' },
    { id: 'others', name: 'Others', icon: <MoreHorizontal className="w-4 h-4" />, color: 'text-gray-600', bgColor: 'bg-gray-100' }
  ];

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTasks(data || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('tasks')
        .insert([
          {
            ...newTask,
            user_id: user.id
          }
        ])
        .select()
        .single();

      if (error) throw error;

      setTasks([data, ...tasks]);
      setShowAddModal(false);
      setNewTask({
        title: '',
        description: '',
        category: 'watering',
        priority: 'medium',
        due_date: new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTaskStatus = async (taskId: string, status: Task['status']) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ status })
        .eq('id', taskId);

      if (error) throw error;

      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, status } : task
      ));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);

      if (error) throw error;

      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const filteredTasks = tasks.filter(task => filter === 'all' || task.status === filter);

  const getTaskStats = () => {
    const total = tasks.length;
    const pending = tasks.filter(t => t.status === 'pending').length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const overdue = tasks.filter(t => 
      t.status !== 'completed' && new Date(t.due_date) < new Date()
    ).length;

    return { total, pending, completed, overdue };
  };

  const stats = getTaskStats();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryInfo = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId) || categories[4];
  };

  const isOverdue = (dueDate: string, status: string) => {
    return status !== 'completed' && new Date(dueDate) < new Date();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-green-700 font-medium">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-amber-50 py-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-lg flex items-center justify-center">
            <Sprout className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="absolute top-32 right-16 animate-float-delayed">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl shadow-lg flex items-center justify-center">
            <Droplets className="w-8 h-8 text-white" />
          </div>
        </div>
        <div className="absolute bottom-32 left-20 animate-bounce-slow">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full shadow-lg flex items-center justify-center">
            <Scissors className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg mb-6">
            <Calendar className="w-5 h-5 text-green-500" />
            <span className="font-semibold text-gray-800">Farm Task Manager</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Stay organized with your farming activities
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Never miss important tasks and keep your farm running smoothly
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-600">Total Tasks</span>
            </div>
            <div className="text-3xl font-bold text-gray-800">{stats.total}</div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <span className="text-sm font-medium text-gray-600">Pending</span>
            </div>
            <div className="text-3xl font-bold text-gray-800">{stats.pending}</div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-600">Completed</span>
            </div>
            <div className="text-3xl font-bold text-gray-800">{stats.completed}</div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <X className="w-5 h-5 text-red-600" />
              </div>
              <span className="text-sm font-medium text-gray-600">Overdue</span>
            </div>
            <div className="text-3xl font-bold text-gray-800">{stats.overdue}</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-gray-500" />
              <div className="flex space-x-2">
                {['all', 'pending', 'in-progress', 'completed'].map((filterOption) => (
                  <button
                    key={filterOption}
                    onClick={() => setFilter(filterOption as any)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                      filter === filterOption
                        ? 'bg-green-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-700'
                    }`}
                  >
                    {filterOption.charAt(0).toUpperCase() + filterOption.slice(1).replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span>Add Task</span>
            </button>
          </div>

          {/* Tasks List */}
          <div className="space-y-4">
            {filteredTasks.map((task) => {
              const categoryInfo = getCategoryInfo(task.category);
              const overdue = isOverdue(task.due_date, task.status);
              
              return (
                <div
                  key={task.id}
                  className={`bg-gradient-to-r from-white to-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border-l-4 ${
                    overdue ? 'border-red-500' : 'border-green-500'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <button
                        onClick={() => updateTaskStatus(task.id, task.status === 'completed' ? 'pending' : 'completed')}
                        className="mt-1"
                      >
                        <CheckCircle 
                          className={`w-6 h-6 transition-colors duration-200 ${
                            task.status === 'completed' 
                              ? 'text-green-500' 
                              : 'text-gray-300 hover:text-green-400'
                          }`} 
                        />
                      </button>

                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className={`text-lg font-semibold ${
                            task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-800'
                          }`}>
                            {task.title}
                          </h3>
                          {overdue && (
                            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                              Overdue
                            </span>
                          )}
                        </div>
                        
                        <p className="text-gray-600 mb-4">{task.description}</p>
                        
                        <div className="flex flex-wrap items-center gap-3">
                          <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${categoryInfo.bgColor} ${categoryInfo.color}`}>
                            {categoryInfo.icon}
                            <span>{categoryInfo.name}</span>
                          </span>
                          
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                          </span>
                          
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
                            {task.status.charAt(0).toUpperCase() + task.status.slice(1).replace('-', ' ')}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 ml-4">
                      <div className="text-right text-sm text-gray-500">
                        <div className="flex items-center space-x-1 mb-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(task.due_date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>
                            {new Date(task.due_date) > new Date() 
                              ? `${Math.ceil((new Date(task.due_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left`
                              : task.status === 'completed' ? 'Completed' : 'Overdue'
                            }
                          </span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredTasks.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Calendar className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No tasks found</h3>
              <p className="text-gray-500 mb-6">Create your first task to get started with farm management</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200"
              >
                <Plus className="w-5 h-5" />
                <span>Add Your First Task</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl transform transition-all duration-300 scale-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Add New Task</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  placeholder="e.g., Water tomato plants"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none"
                  rows={3}
                  placeholder="Task details..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                <input
                  type="date"
                  value={newTask.due_date}
                  onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={newTask.category}
                  onChange={(e) => setNewTask({ ...newTask, category: e.target.value as Task['category'] })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as Task['priority'] })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-4 mt-8">
              <button
                onClick={addTask}
                disabled={!newTask.title.trim()}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-300 disabled:to-gray-400 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 disabled:cursor-not-allowed"
              >
                Add Task
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-medium transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default TaskManager;