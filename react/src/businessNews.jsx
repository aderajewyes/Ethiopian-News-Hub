import { useState, useEffect } from "react";
import SpecificNews from "./component/specificNews";

const BusinessNews = () => {
  const [filteredNewsData, setFilteredNewsData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('http://localhost:3000/businessnews');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setFilteredNewsData(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error);
      }
    };
    fetchRequests();
  }, []);
  console.log(filteredNewsData)

  return (
    <>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <SpecificNews name="Business News" filteredNewsData={filteredNewsData} />
      )}
    </>
  );
};

export default BusinessNews;
