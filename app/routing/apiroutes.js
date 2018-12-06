// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendData = require("../data/friends.js");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    console.log("test")
    res.json(friendData);
  });


  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function (req, res) {
    
    //push user input to friends API
      

    // match user with most compatible friend in API
    let userScores = req.body.scores;
    console.log(userScores);
    // Go through each friend object in API array and reduce to one object, the friendMatch 
    let friendMatch = friendData.reduce((ACC, CURR) => {
        // Within each friend object, go through each scores property and return one absolute value that reflects the sum of their score differences
        let scoresCompatibility = userScores.reduce((acc, curr, idx) => 
            // let integer = parseFloat(CURR.scores[idx]);
            // console.log(CURR.scores[idx]);
            acc + Math.abs(curr - CURR.scores[idx]), 0);
            
        if (scoresCompatibility < ACC.scoresCompatibility) {
            return {
                friendMatch: CURR,
                scoresCompatibility: scoresCompatibility
            }
        } else return ACC;
    }, {scoresCompatibility: Infinity});
    
    friendData.push(req.body);
    res.json(friendMatch);

});
}