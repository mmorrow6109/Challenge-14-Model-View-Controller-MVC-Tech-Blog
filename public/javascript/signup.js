// Define an asynchronous function to handle the form submission for signing up a user
async function signupFormHandler(event) {
    // Prevent the default form submission behavior
    event.preventDefault();
  
    // Select the username input, get its value, and trim any whitespace
    const username = document.querySelector('#username-signup').value.trim();
    // Select the email input, get its value, and trim any whitespace
    const email = document.querySelector('#email-signup').value.trim();
    // Select the password input, get its value, and trim any whitespace
    const password = document.querySelector('#password-signup').value.trim();

    // Check if the username, email, and password inputs exist
    if (username && email && password) {
      // Make a POST request to the users API endpoint
      const response = await fetch('/api/users', {
        method: 'POST', // Specify the request method
        body: JSON.stringify({
          username, // Include the username in the request body
          email, // Include the email in the request body
        }),
        headers: {
          'Content-Type': 'application/json' // Specify the content type in the request headers
        }
      });
  
      // If the response is okay (status in the range 200-299)
      if (response.ok) {
        // Log 'success' to the console
        console.log('success');
        // Redirect the user to the dashboard page
        document.location.replace('/dashboard');
      } else {
        // Otherwise, alert the user with the status text of the response
        alert(response.statusText);
      }
    }
  }
  
  // Add an event listener to the form with the class 'signup-form'
  // When the form is submitted, the signupFormHandler function will be called
  document.querySelector('#signup').addEventListener('submit', signupFormHandler);