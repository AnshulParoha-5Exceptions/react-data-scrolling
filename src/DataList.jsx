import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataList = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    if (!loading) {
      setLoading(true);
      axios
        .get(`https://api.github.com/users`, {
          params: {
            page: page,
          },
        })
        .then((response) => {
          const newData = response.data;
          // Check if the fetched users already exist in the data state
          const filteredData = newData.filter(
            (item) => !data.some((existingItem) => existingItem.id === item.id)
          );
          setData((prevData) => [...prevData, ...filteredData]);
          setPage((prevPage) => prevPage + 1);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array to ensure it runs only once on component mount

  return (
    <div className="container">
      <h1>Github Users</h1>
      <div className="data-list">
        {data.map((item) => (
          <div key={item.id} className="item">
            <img src={item.avatar_url} alt="Avatar" />
            <h2>{item.login}</h2>
            <p>{item.html_url}</p>
          </div>
        ))}
      </div>
      {loading && <h4>Loading...</h4>}
    </div>
  );
};

export default DataList;
