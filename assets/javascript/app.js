var firebaseConfig = {
    apiKey: "AIzaSyBY7O96YIxd_QG0uKlgeejNuCJE6UYb_JQ",
    authDomain: "trainscheduler-eb79e.firebaseapp.com",
    databaseURL: "https://trainscheduler-eb79e.firebaseio.com",
    projectId: "trainscheduler-eb79e",
    storageBucket: "trainSchedule",
    messagingSenderId: "96747496347",
    appId: "1:96747496347:web:80cc3aa0012f1d17"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// Variables
var trainName = "";
var destination = "";
var startTime = "";
var frequency = "";
var nextArrival = "";
var minutesAway = "";

// Submit Function
$("#submitBtn").on("click", function () {
    event.preventDefault();
    console.log("you clicked me");

    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    startTime = moment($("#startTime").val().trim(), "HH:mm").subtract(1, "years").format("X");
    frequency = $("#frequency").val().trim();
    console.log(trainName);
    console.log(destination);
    console.log(startTime);
    console.log(frequency);

    database.ref("/trainSchedules").push({
        name: trainName,
        destination: destination,
        time: startTime,
        frequency: frequency,
        nextArrival: nextArrival,
        minutesAway: minutesAway,
        date_added: firebase.database.ServerValue.TIMESTAMP
    });

    // Empty Form
    $("#trainName").val("");
    $("#destination").val("");
    $("#trainTime").val("");
    $("#frequency").val("");

});

database.ref("/trainSchedules").on("child_added", function (snapshot) {

    //  create local variables to store the data from firebase
    var trainDiff = 0;
    var trainRemainder = 0;
    var nextTrain = "";
    var minutesLeft = "";
    var frequency = snapshot.val().frequency;

    // Calc the difference from now and the first train
    trainDiff = moment().diff(moment.unix(snapshot.val().time), "minutes");

    // Module of time useing the frequency and time diff
    trainRemainder = trainDiff % frequency;
    minutesLeft = frequency - trainRemainder;

    // Add minutesLeft to now for next train
    nextTrain = moment().add(minutesLeft, "m").format("hh:mm A");

    // Append Row 
    $("#train-data").append();
});