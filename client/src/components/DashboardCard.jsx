import React from 'react';

function DashboardCard({
  title = 'Untitled',
  value = 0,
  icon = '📊',
  color = '#0078d7'
}) {
  return (
    <div
      className="dashboard-card"
      style={{ borderLeft: `5px solid ${color}` }}
    >
      <div className="card-icon">{icon}</div>

      <div className="card-content">
        <h3>{title}</h3>

        <p>
          {typeof value === 'number'
            ? value.toLocaleString()
            : value}
        </p>
      </div>
    </div>
  );
}

export default DashboardCard;