import React, { useState, useEffect } from 'react';
import './Home.scss';
import womanPipe from '../../assets/svg/woman-pipe.svg';
import Header from '../../components/Header/Header';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        let response = await fetch('https://api.example.com/data');
        let result = await response.json();

        setData(result);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="home-container">
      <Header />
      <img src={womanPipe} alt={''} />
    </div>
  );
}
