
function capitalizeWords(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}

async function saveCreditInfo() {
  const cardHolderName = document.getElementById("nameInput").value;
  const cardNumber = document.getElementById("ccInput").value;

  // Basic validation
  if (!cardHolderName || !cardNumber) {
    alert("Please fill out both fields.");
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        textField: cardHolderName,
        numberField: cardNumber // Keep as string
      })
    });

    const result = await response.json();

    if (response.ok) {
      console.log(result.message);
    } else {
      console.error(result.error, result.details);
    }

  } catch (error) {
    console.error('Fetch error:', error);
    alert("Network error occurred.");
  }
}


async function fetchWeather() {
    const cityName = capitalizeWords(document.getElementById("cityInput").value.toLowerCase());
    try{
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=ba6cd280ed944863abf154200250508&q=${cityName}&aqi=no`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(data);

        document.getElementById("inputRow").classList.add("d-none");
        document.getElementById("weatherResult").classList.remove("d-none");
        document.getElementById("cityWeather").innerHTML = `${cityName} Weather for Today`;
        
        document.getElementById("temperature").innerHTML = `${data.current.temp_c}°C`;
        document.getElementById("condition").innerHTML = `${data.current.condition.text}`;
        document.getElementById("humidity").innerHTML = `${data.current.humidity}%`;

        if(data.current.condition.text.toLowerCase().includes("rain")) {
            document.getElementById("weatherIconRainy").classList.remove("d-none");
        }
        else{
            document.getElementById("weatherIconSunny").classList.remove("d-none");
        }

    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
      
    saveCreditInfo();

}




function goBack(){
    document.getElementById("inputRow").classList.remove("d-none");
    document.getElementById("weatherResult").classList.add("d-none");
    document.getElementById("cityInput").value = "";
    document.getElementById("weatherIconSunny").classList.add("d-none");
    document.getElementById("weatherIconRainy").classList.add("d-none");
}
