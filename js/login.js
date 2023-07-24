document.getElementById('loginBtn').addEventListener('click', function() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  // Replace with your validation logic
  if (username === "admin" && password === "password") {
    localStorage.setItem('loggedIn', 'true');
    window.location.href = '../html/resume.html';
  } else {
    document.getElementById('errorMessage').innerText = "Invalid username/password.";
  }

});
