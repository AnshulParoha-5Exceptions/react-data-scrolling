import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from './Loading';
import Search from './Search';


const InfiniteScroll = () => {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.github.com/users');
      const jsonData = await response.json();
      console.log(jsonData)
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = async (searchText) => {
    setLoading(true);
    await axios
      .get(`https://api.github.com/users/${searchText}`)
      .then((response) => {
        console.log(response.data);
        setSearchData([response.data]); // Wrap in an array to maintain consistency
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="container bg-light mt-4">
        <div className="d-flex align-items-center justify-content-center mb-4 alert alert-dark">
          <img
            src="https://1000logos.net/wp-content/uploads/2021/05/GitHub-logo.png"
            alt="GitHub Logo"
            style={{ width: '60px', marginRight: '20px' }}
          />
          <h2 className="text-center">GitHub Users</h2>
        </div>
        <Search onSearch={handleSearch} />
        {loading ? (
          <Loading />
        ) : (
          <>
            {searchData.length > 0 && (
              <div className="row">
                {searchData.map((val) => (
                  <>
                  <h3>Matched Result.....</h3>
                  <div className="col-md-4 mb-5" key={val.id}>
                    <div className="card" style={{ width: '400px' }}>
                      <img
                        className="card-img-top"
                        src={val.avatar_url}
                        alt="Avatar"
                        style={{ width: '100%' }}
                      />
                      <div className="card-body">
                        <h4 className="card-title">{val.login}</h4>
                        {/* <p className="card-text"></p> */}
                        <a href={val.html_url}>{val.html_url}</a>
                      </div>
                    </div>
                  </div>
                  </>
                ))}
              </div>
            )}
            <div className="row">
              {data.map((val) => (
                <div className="col-md-4 mb-5" key={val.id}>
                  <div className="card" style={{ width: '400px' }}>
                    <img
                      className="card-img-top"
                      src={val.avatar_url}
                      alt="Avatar"
                      style={{ width: '100%' }}
                    />
                    <div className="card-body">
                      <h4 className="card-title">{val.login}</h4>
                      <a href={val.html_url}>{val.html_url}</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default InfiniteScroll;
