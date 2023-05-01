/* This first part is what allows us to grab the part of the window and show or hide the modal made for the
geolocation part. Consider this a code snippet that can be moved somewhere else.
 We still have to go back and see how it ties with the map api but wanted to show how it could work based on what I read online*/

document.addEventListener("DOMContentLoaded", function() {
    const locationModal = document.getElementById("locationModal");
    const locationAllow = document.getElementById("locationAllow");
    const locationDeny = document.getElementById("locationDeny");
    
    // This allows us to actually show what the location is or hide it by changing display properties 
  
    function showLocationModal()   {
      locationModal.style.display = "block"  ;
      }
  
    function hideLocationModal() {
      locationModal.style.display = "none";
    }
  
    // This first function stores users long and lat as variables if the geolocation call a success

    function handleLocationSuccess(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      
    }
  //This one runs if they can't ge the location info

    function handleLocationError() {
      // Handle location access errors
      console.log("Error getting the user's location.");
    }

  // The main function to use the geolocation method of the broswer navigator and return the user's coordinates
    function getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(handleLocationSuccess, handleLocationError);
      } else {
        // Geolocation is not supported by the browser
        console.log("Geolocation is not supported by this browser.");
      }
    }
  
    locationAllow.addEventListener("click", () => {
      hideLocationModal();
      getUserLocation();
    });
  
    locationDeny.addEventListener("click", () => {
      hideLocationModal();
    });
  
    showLocationModal();
  });


//   <!--Export This HTML For the Sectiona and buttons To Handle The User Geolocation Request---->


<div id="locationModal" class="modal">
  <div class="modal-content">
    
    <h4>Share Your Location</h4>

    <p>Please allow us to get your location to find food trucks near you.</p>
  </div>
  <div class="modal-footer">
    
    <button id="locationAllow" class="btn">Allow</button>
    <button id="locationDeny" class="btn">Deny</button>
  </div>
</div>
  