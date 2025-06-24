import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (err) {
      toast.error("Logout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-white px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Dashboard
          </h1>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <p className="text-xl text-gray-800 mb-2">
              Welcome back!
            </p>
            <p className="text-lg text-blue-600 font-medium">
              {user?.first_name || user?.username || user?.email || 'User'}
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleLogout}
              disabled={loading}
              className={`px-8 py-4 rounded-lg text-white font-bold text-lg transition-all duration-200 shadow-lg transform hover:scale-105 ${
                loading 
                  ? 'bg-gray-500 cursor-not-allowed' 
                  : 'bg-red-600 hover:bg-red-700 hover:shadow-xl'
              }`}
              style={{ minWidth: '160px', minHeight: '56px' }}
            >
              {loading ? 'Logging out...' : 'Logout'}
            </button>
            
            {/* Additional dashboard actions */}
            <div className="pt-8">
              <p className="text-gray-600 mb-4">Quick Actions:</p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Profile Settings
                </button>
                <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  View Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;