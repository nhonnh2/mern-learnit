import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  let navigate = useNavigate();
  return (
    <div>
      <h1>Dashboard</h1>
      <button>lading</button>
    </div>
  );
}

export default Dashboard;
