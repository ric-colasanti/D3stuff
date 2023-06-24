/* This is a file that contains my AJAX functions for loading both HTML snippits and data files



/**
 * This function loads an HTML file using AJAX.
 * @param {string} id - The ID of the element to load the HTML into.
 * @param {string} page - The URL of the HTML file to load.
 */
console.log("load.js");
var load = function () {
  return {
    html: function (id, page) {
      // Create a new XMLHttpRequest object.
      var xhttp = new XMLHttpRequest();

      // Set up an event listener for the readystatechange event.
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          // Check if the request was successful.
          if (this.status == 200) {
            // Set the inner HTML of the element with the specified ID to the response text.
            document.getElementById(id).innerHTML = this.responseText;
          } else {
            // The request failed. Set the inner HTML of the element to "File not found".
            document.getElementById(id).innerHTML = "File not found";
          }
        }
      };

      // Open the request.
      xhttp.open("GET", page, true);

      // Send the request.
      xhttp.send();
    },

    /**
     * This function loads a file using AJAX.
     * @param {string} file - The file to load.
     * @param {function} rfunction - The function to call when the file is loaded.
     */
    file: function (file, rfunction) {
      // Create a new XMLHttpRequest object.
      var xhttp = new XMLHttpRequest();

      // Set up an event listener for the readystatechange event.
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          // Check if the request was successful.
          if (this.status == 200) {
            // Call the rfunction function with the XMLHttpRequest object as the parameter.
            rfunction(this);
          } else {
            // The request failed. Log an error message to the console.
            console.log("File not found");
          }
        }
      };

      // Set the request method and the request URL.
      xhttp.open("GET", file, true);

      // Send the request.
      xhttp.send();
    },
  };
}();


