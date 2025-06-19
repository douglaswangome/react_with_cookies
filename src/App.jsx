import "./App.css";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const App = () => {
  const allCookies = Cookies.get(); // Gets all the cookies stored in your browser
  const cookiesArray = Object.entries(allCookies);

  const [count, setCount] = useState(0); // The dependecy variable
  const [token, setToken] = useState({ name: "", value: "" });

  // This function handles the user input - it is executed when the user types into the inputs
  const handleChange = (event) => {
    const { name, value } = event.target;

    setToken((prevToken) => {
      return {
        ...prevToken,
        [name]: value,
      };
    });
  };

  // This functions sets/saves a cookie to the browser
  const handleSubmit = () => {
    setCount((prevCount) => prevCount + 1); // Changes the value of the dependecy variable
    Cookies.set(token.name, token.value); // Sets/Saves the cookie to the browser
    // Clears the input fields
    setToken((prevToken) => {
      return {
        ...prevToken,
        name: "",
        value: "",
      };
    });
  };

  // This functions deletes a cookie from where it is stored
  const handleDelete = (name) => {
    setCount((prevCount) => prevCount + 1); // Changes the value of the dependency variable
    Cookies.remove(name); // Deletes the cookie from the browser
  };

  // A react hook that executes a function when the page loads
  // It also re-renders a page when a variable in the dependency array changes
  useEffect(() => {}, [count]); // The dependency array

  return (
    <div className="main">
      <div className="title">
        <img src="/cookies.png" alt="cookies" />
        <span>Cookie monster- i love cookies</span>
      </div>
      <div className="content">
        <div className="cookies">
          <span>Your Cookies</span>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {cookiesArray.length > 0 &&
                cookiesArray.map((cookie, index) => (
                  <tr key={index}>
                    <td>{cookie[0]}</td>
                    <td>{cookie[1]}</td>
                    <td>
                      <button onClick={() => handleDelete(cookie[0])}>
                        <span>Delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="actions">
          <div>
            <span>Name:</span>
            <input
              name="name"
              value={token.name}
              onChange={handleChange}
              type="text"
              placeholder="Required.."
            />
          </div>
          <div>
            <span>Value:</span>
            <input
              name="value"
              value={token.value}
              onChange={handleChange}
              type="text"
              placeholder="Required.."
            />
          </div>
          <button disabled={!token.name || !token.value} onClick={handleSubmit}>
            <span>Submit</span>
          </button>
        </div>
      </div>
      <div className="footer">
        <a href="https://storyset.com/food">Food illustrations by Storyset</a>
      </div>
    </div>
  );
};

export default App;
