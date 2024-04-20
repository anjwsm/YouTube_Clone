import React, { useEffect, useState } from "react";
import "./Feed.css";
import moment from "moment";
import { Link } from "react-router-dom";
import { API_KEY, value_converter } from "../../data";

export const Feed = ({ category }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&videoCategoryId=${category}&key=${API_KEY}`;
    try {
      const response = await fetch(videoList_url);
      const data = await response.json() ;
      setData(data.items)
    } catch (error){
      console.error('Error fetching data' , error) ;
    }
    
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="feed">
      {data && data.map((item, index) => {
        return (
          <Link to={`video/${item.snippet.categoryId}/${item.id}`} className="card">
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <h2>{item.snippet.title}</h2>
            <h3>{item.snippet.channelTitle}</h3>
            <p>{value_converter(item.statistics.viewCount)} views ;{moment(item.snippet.publishedAt).fromNow()} </p>
          </Link>
        );
      })}
    </div>
  );
};
