import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import api from '../utils/api';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/dashboard/stats');
        setStats(data);
      } catch (err) {
        console.error('Failed to fetch stats', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="p-10 text-center">Loading Analytics...</div>;
  if (!stats) return <div className="p-10 text-center">Error loading stats</div>;

  const statusData = {
    labels: stats.statusCounts.map(s => s._id),
    datasets: [{
      data: stats.statusCounts.map(s => s.count),
      backgroundColor: ['#6366f1', '#10b981'],
    }]
  };

  const priorityData = {
    labels: ['High', 'Medium', 'Low'],
    datasets: [{
      label: 'Tasks',
      data: ['High', 'Medium', 'Low'].map(p => 
        stats.priorityCounts.find(pc => pc._id === p)?.count || 0
      ),
      backgroundColor: ['#ef4444', '#f59e0b', '#10b981'],
    }]
  };

  const trendData = {
    labels: stats.tasksByDay.map(d => d._id),
    datasets: [{
      label: 'Tasks Created',
      data: stats.tasksByDay.map(d => d.count),
      backgroundColor: '#6366f1',
      borderColor: '#4f46e5',
      fill: false,
    }]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Task Analytics Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">Status Distribution</h3>
          <div className="h-64 flex items-center justify-center">
            {stats.statusCounts.length > 0 ? <Pie data={statusData} /> : <p className="text-gray-400">No data</p>}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">Priority Distribution</h3>
          <div className="h-64 flex items-center justify-center">
             {stats.priorityCounts.length > 0 ? <Bar data={priorityData} options={{ maintainAspectRatio: false }} /> : <p className="text-gray-400">No data</p>}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">Activity (Last 7 Days)</h3>
          <div className="h-64 flex items-center justify-center">
             {stats.tasksByDay.length > 0 ? <Bar data={trendData} options={{ maintainAspectRatio: false }} /> : <p className="text-gray-400">No data</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
