// public/js/register.js

document.getElementById('registerForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', { // ✅ Port 5001 now!
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
        credentials: 'include'
      });
  
      const data = await response.json();
  
      if (data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Registered Successfully!',
          text: `Welcome, ${data.user.name}!`,
          timer: 2000,
          showConfirmButton: false
        });
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: data.message
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Server Error',
        text: 'Something went wrong. Please try again later.'
      });
    }
  });
  