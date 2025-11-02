import { useEffect, useState } from "react";
import { COFFEE_REQURED } from "../views/UserDetailView";


function CoffeeStamps({ count, setCount, user_id }) {

  const [markedStamps, setMarkedStamps] = useState([])

  useEffect(() => {
    // Initialize marked stamps based on the count
    const initialStamps = Array.from({ length: COFFEE_REQURED })
      .map((_, index) => index)
      .filter((item) => item < count % COFFEE_REQURED);
    setMarkedStamps(initialStamps);
  }, [count])

  const handleClick = (index) => {
    // Toggle the presence of a value 'index' in an array 'markedStamps'
    const newStamps = markedStamps.includes(index) ? markedStamps.filter((i) => i !== index) : [...markedStamps, index];
    setMarkedStamps(newStamps);

    // Update the count
    const changeCounter = markedStamps.includes(index) ? -1 : 1;
    setCount((prevCount) => prevCount + changeCounter);

    // Update the counter on the server
    handleCounterUpdate(changeCounter);
  }

  const handleCounterUpdate = (changeCounter) => {
    // Send a request to update the counter on the server
    fetch("http://localhost:5000/update_counter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({changeCounter, user_id}),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
  };

  return (
    <div className="stamps-wrapper">
      {Array.from({ length: COFFEE_REQURED })
        .map((_, index) => (
          <button key={index}
                  onClick={() => handleClick(index)}
                  className={`button-item ${markedStamps.includes(index) ? "clicked" : "unclicked"}`}
                  disabled={index > count % COFFEE_REQURED}
          >{index + 1}</button>
        ))
      }
    </div>
  )
}

export default CoffeeStamps;