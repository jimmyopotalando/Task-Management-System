import React, { useState, useEffect } from 'react';

function DataTable({ tasks = [] }) {
  const [sortField, setSortField] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 5;

  // Reset page when tasks change
  useEffect(() => {
    setCurrentPage(1);
  }, [tasks]);

  // Safe tasks array
  const safeTasks = Array.isArray(tasks) ? tasks : [];

  // Sorting
  const sortedTasks = [...safeTasks].sort((a, b) => {
    const fieldA = a?.[sortField] || '';
    const fieldB = b?.[sortField] || '';

    if (fieldA < fieldB) return sortOrder === 'asc' ? -1 : 1;
    if (fieldA > fieldB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sortedTasks.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.max(1, Math.ceil(safeTasks.length / rowsPerPage));

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="data-table">

      {safeTasks.length === 0 ? (
        <p style={{ marginTop: '10px' }}>
          No tasks available.
        </p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th onClick={() => handleSort('title')}>Title</th>
                <th onClick={() => handleSort('priority')}>Priority</th>
                <th onClick={() => handleSort('status')}>Status</th>
                <th onClick={() => handleSort('dueDate')}>Due Date</th>
              </tr>
            </thead>

            <tbody>
              {currentRows.map((task) => (
                <tr key={task._id || task.id || task.title}>
                  <td>{task.title}</td>
                  <td>{task.priority}</td>
                  <td>{task.status}</td>
                  <td>
                    {task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString()
                      : 'No date'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Prev
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default DataTable;