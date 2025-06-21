// components/Dashboard.jsx
import { useAuth } from '../hooks/useAuth';

const Dashboard = () => {
  const { user, logout } = useAuth();
  
  return (
    <div className="p-8">
      <h1>Welcome, {user?.username}!</h1>
      <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">
        Logout
      </button>
    </div>
  );
};
export default Dashboard;