document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/users')
      .then(response => response.json())
      .then(data => {
        const tableBody = document.getElementById('usersTable').querySelector('tbody');
        data.forEach(user => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${user.student_id}</td>
            <td>${user.balance}</td>
            <td>${user.created_at}</td>
            <td>${user.updated_at}</td>
          `;
          tableBody.appendChild(row);
        });
      })
      .catch(error => console.error('Error fetching users:', error));
  });
  