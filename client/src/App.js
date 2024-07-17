import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Header from "./components/Header.jsx";
import Result from "./components/Result.jsx";
import Search from "./components/Search.jsx";

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/getCountries").then((response) => {
      setCountries(response.data);
    });
  }, []);

  return (
    <div className="App">
      <Header />
      <Search setCountries={setCountries} />
      <Result countries={countries} />
    </div>
  );
}

export default App;
