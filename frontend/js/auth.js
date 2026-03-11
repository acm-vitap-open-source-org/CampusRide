const API = "https://campusride-1un9.onrender.com";

async function login() {
  try {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;

    // Basic validation
    if (!email || !password || !role) {
      alert("Please fill all fields");
      return;
    }

    const res = await fetch(`${API}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password, role })
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Login failed");
    }

    const data = await res.json();

    // Store token securely
    localStorage.setItem("token", data.token);

    // Redirect based on role
    if (role === "renter") {
      window.location.href = "renter.html";
    } else if (role === "owner") {
      window.location.href = "owner.html";
    }

  } catch (err) {
    console.error(err);
    alert(err.message || "Something went wrong");
  }
}
