var config = {
    apiKey: "AIzaSyAYXQ2PccNf1Cf4mQDYOpEgx6TZ7UvYXyg",
    authDomain: "firstproject-40c29.firebaseapp.com",
    databaseURL: "https://firstproject-40c29.firebaseio.com",
    projectId: "firstproject-40c29",
    storageBucket: "firstproject-40c29.appspot.com",
    messagingSenderId: "812777626258"
  };
  firebase.initializeApp(config);


var database = firebase.database();

function clear() {
    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrainTime").val("");
    $("#frequency").val("");
}

$("#submitBtn").on("click", function(event) {
   
 // Grabbed values from text boxes
 name = $("#trainName").val().trim();
 destination = $("#destination").val().trim();
 firstTrainTime = $("#firstTrainTime").val().trim();
 frequency = $("#frequency").val().trim();

 

 // Code for handling the push
 
var newTrain = {
   name: name,
   destination: destination,
   firstTrainTime: firstTrainTime,
   frequency: frequency,

   }
//    dateAdded: firebase.database.ServerValue.TIMESTAMP
database.ref().push(newTrain)
clear();

 });

//  var formatter = new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD',
//     minimumFractionDigits: 2,
//     // the default value for minimumFractionDigits depends on the currency
//     // and is usually already 2
//   });
    

database.ref().on("child_added", function(childSnapshot) {
    var name = childSnapshot.val().name
    var destination = childSnapshot.val().destination
    var frequency = childSnapshot.val().frequency
    var firstTrainTime = childSnapshot.val().firstTrainTime
    var timeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years")
    var diffTime = moment().diff(moment(timeConverted), "minutes")
    var tRemainder = diffTime % frequency
    var minutesAway = frequency - tRemainder
    var nextArrival = moment().add(minutesAway, "minutes")
    $(`
    <tr>
        <td scope="row">${name}</td>
        <td>${destination}</td>
        <td>${frequency}</td>
        <td>${moment(nextArrival).format("hh:mm a")}</td>
        <td>${minutesAway}</td>
    </tr>
    `).appendTo('#newTrain')
      
})
