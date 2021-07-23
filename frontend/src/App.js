import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';

function App() {
  const [RestaurantName, setRestaurantName] = useState('');
  const [Review, setReview] = useState('');
  const [RestaurantReviewList, setRestaurantReviewList] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [searchValue, setSearchValue] = useState('');
  const [ReviewList, setReviewList] = useState([]);

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

  const longestRevew = () => {
    Axios.get('http://localhost:3002/api/getLongest').then((response) => {
      setReviewList(response.data)
    });

    setReviewList([
      ...ReviewList,
      {
        RestaurantName: RestaurantName,
        RestaurantReview: Review
      }
    ])
  }
//   Axios.get('http://localhost:3002/api/get').then((response) => {
//     setRestaurantReviewList(response.data)
//   })
// },[])
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
              <p>Restaurant Review: {val.overallRating}</p>
              <p>Price Level: {val.priceLevel}</p>
              <p>Address: {val.streetAddress}, {val.city}, {val.states} {val.postalCode}</p>
              <p>Number: {val.telephone}</p>
              <input type="text" id="updateInput" onChange={(e) => {
                setNewReview(e.target.value)
              } }/>
              <button onClick={() => {
                updateReview(val.name)
              }}> Rate</button>
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


      <div className="form">
        <h1>Longest Review under each restaurant!</h1>
        <button onClick={longestRevew}> Submit</button>


      </div>
    </div>
  );
}

export default App;
