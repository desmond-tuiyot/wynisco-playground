import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

import Card from "./shared/Card";
import Suggestions from "./shared/Suggestions";

function App() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [entries, setEntries] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [selectedEntry, setSelectedEntry] = React.useState(null);

  const [filter, setFilter] = React.useState("");
  const [filteredEntries, setFilteredEntries] = React.useState(entries);

  const debounce = (func, delay) => {
    let timeout;
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(func, delay);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    setSelectedEntry(null);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
    setFilteredEntries(
      entries.filter((entry) =>
        entry.Description.toLowerCase().includes(event.target.value)
      )
    );
  };

  const handleApiSelect = (entry) => {
    setSelectedEntry(entry);
  };

  React.useEffect(() => {
    debounce(async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://api.publicapis.org/entries?title=${searchTerm}`
        );
        setEntries(res.data.entries || []);
        setFilteredEntries(res.data.entries || []);
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }, 500);
  }, [searchTerm]);

  if (error) return <div>Oops: Some error happened {error}</div>;

  return (
    <div className="App">
      <input type="text" value={searchTerm} onChange={handleChange} />
      <input type="text" value={filter} onChange={handleFilter} />

      {selectedEntry ? (
        <Card entry={selectedEntry} />
      ) : (
        <Suggestions entries={filteredEntries} handleClick={handleApiSelect} />
      )}
    </div>
  );
}

export default App;
