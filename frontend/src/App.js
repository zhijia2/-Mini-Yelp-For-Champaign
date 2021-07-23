import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';

function App() {
  const [RestaurantName, setRestaurantName] = useState('');
  const [Review, setReview] = useState('');
  const [RestaurantReviewList, setRestaurantReviewList] = useState([]);
  const [newReview, setNewReview] = useState("");
  //const 
  useEffect(() => {
    Axios.get('http://34.136.215.26:3002/api/get').then((response) => {
      setRestaurantReviewList(response.data)
    })
  },[])

  const submitReview = () => {
    Axios.post('http://34.136.215.26:3002/api/insert', {
      RestaurantName: RestaurantName,
      RestaurantReview: Review
    });


    setRestaurantReviewList([
      ...RestaurantReviewList,
      {
        RestaurantName: RestaurantName,
        RestaurantReview: Review
      },
    ]);
  };

  const search(){}

  const deleteReview = (RestaurantName) => {
    Axios.delete(`http://34.136.215.26:3002/api/delete/${RestaurantName}`);
  };

  const updateReview = (RestaurantName) => {
    Axios.put(`http://34.136.215.26:3002/api/update`, {
      RestaurantName: RestaurantName,
      RestaurantReview: newReview
    });
    setNewReview("")
  };

  return (
    <div className="App">
      <h1>Find a Restaurant!</h1>

      <div className="form">
        <label>Restaurant Name:</label>
        <input type="text" name="RestaurantName" onChange={(e) => {
          setRestaurantName(e.target.value)
        } }/>
        <label> Review:</label>
        <input type="text" name="Review" onChange={(e) => {
          setReview(e.target.value)
        }}/>

        <button onClick={submitReview}> Submit</button>

        {RestaurantReviewList.map((val) => {
          return (
            <div className = "card">
              <h1> RestaurantName: {val.RestaurantName} </h1>
              <p>Restaurant Review: {val.RestaurantReview}</p>
              <button onClick={() => { deleteReview(val.RestaurantName) }}> Delete</button>
              <input type="text" id="updateInput" onChange={(e) => {
                setNewReview(e.target.value)
              } }/>
              <button onClick={() => {
                updateReview(val.RestaurantName)
              }}> Update</button>
              </div>
          );

          ;
        })}


      </div>

    </div>
  );
}

export default App;
