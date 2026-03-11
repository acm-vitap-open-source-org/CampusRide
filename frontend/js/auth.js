async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;
  
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email, password, role})
  });
  
  const data = await res.json();
  localStorage.setItem('token', data.token);
  window.location.href = role === 'renter' ? 'renter.html' : 'owner.html';
}
