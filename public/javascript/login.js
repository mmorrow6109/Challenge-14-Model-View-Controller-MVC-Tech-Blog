// Define an asynchronous function to handle the form submission
async function loginFormHandler(event) {
    // Prevent the default form submission behavior
    event.preventDefault();
  
    // Select the email input, get its value, and trim any whitespace
    const username = document.querySelector('#username-login').value.trim();
    // Select the password input, get its value, and trim any whitespace
    const password = document.querySelector('#password-login').value.trim();
  
    // Check if both email and password values exist
    if (username && password) {
      // Make a POST request to the login API endpoint
      const response = await fetch('/api/users/login', {
        method: 'post', // Specify the request method
        body: JSON.stringify({
          username, // Include the email in the request body
          password // Include the password in the request body
        }),
        headers: { 'Content-Type': 'application/json' } // Specify the content type in the request headers
      });
  
      // If the response is okay (status in the range 200-299)
      if (response.ok) {
        // Redirect the user to the dashboard page
        document.location.replace('/dashboard');
      } else {
        // Otherwise, alert the user with the status text of the response
        alert(response.statusText);
      }
    }
  }
  
  // Add an event listener to the form with the class 'login-form'
  // When the form is submitted, the loginFormHandler function will be called
  document.querySelector('#login-form').addEventListener('submit', loginFormHandler);