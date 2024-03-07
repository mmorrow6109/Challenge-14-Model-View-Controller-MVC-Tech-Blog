// Define an asynchronous function 'logout' to handle the logout process
const logout = async () => {
    // Send a POST request to the '/api/users/logout' endpoint
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    // If the response was OK (status code in the range 200-299), redirect the user to the home page
    // Otherwise, show an alert indicating that the logout failed
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log out.');
    }
};
  
// Add an event listener to the logout button (with id 'logout') to call 'logout' when the button is clicked
document.querySelector('#logout').addEventListener('click', logout);