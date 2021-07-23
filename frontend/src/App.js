import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';

function App() {
  const [RestaurantName, setRestaurantName] = useState('');
  const [Review, setReview] = useState('');
  const [RestaurantReviewList, setRestaurantReviewList] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    Axios.get('http://localhost:3002/api/get').then((response) => {
      setRestaurantReviewList(response.data)
    })
  },[])

  const submitReview = () => {
    Axios.post('http://localhost:3002/api/insert', {
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

  const searchRes = (searchValue) => {
    Axios.patch('http://localhost:3002/api/search/', {searchValue: searchValue}).then((response) => {
      setRestaurantReviewList(response.data)
    })
  };

  const deleteReview = (RestaurantName) => {
    Axios.delete(`http://localhost:3002/api/delete/${RestaurantName}`);
  };

  const updateReview = (RestaurantName) => {
    Axios.put(`http://localhost:3002/api/update`, {
      RestaurantName: RestaurantName,
      RestaurantReview: newReview
    });
    setNewReview("")
  };

  return (
    <div className="App">
      <h1>Find a Restaurant!</h1>
      <div className="form">
        <label>Restaurant name: </label>
        <input type="text" name="RestaurantSearch" placeholder = "Name" onChange={(e) => {
          setSearchValue(e.target.value)
        } }/>
        <button onClick={() => searchRes(searchValue)}> Search</button>
      </div>


      

      <div className="form">
        
              
        {RestaurantReviewList.map((val) => {
          return (
            <div className = "card">
              <h1> {val.name} </h1>
              <p>Restaurant Review: {val.info}</p>
              <input type="text" id="updateInput" onChange={(e) => {
                setNewReview(e.target.value)
              } }/>
              <button onClick={() => {
                updateReview(val.name)
              }}> Update</button>
              </div>
          );
          
        })}
        <h1>Add a Restaurant!</h1>
        <label>Restaurant Name to modify:</label>
        <input type="text" name="RestaurantName" placeholder = "Name" onChange={(e) => {
          setRestaurantName(e.target.value)
        } }/>
        <label> Review:</label>
        <input type="text" name="Review" placeholder = "Skip if to delete" onChange={(e) => {
          setReview(e.target.value)
        }}/>

        <button onClick={submitReview}> Submit</button>
        <button onClick={() => { deleteReview(RestaurantName) }}> Delete</button>


      </div>

    </div>
  );
}

export default App;
