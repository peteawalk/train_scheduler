var firebaseConfig = {
    apiKey: "AIzaSyBY7O96YIxd_QG0uKlgeejNuCJE6UYb_JQ",
    authDomain: "trainscheduler-eb79e.firebaseapp.com",
    databaseURL: "https://trainscheduler-eb79e.firebaseio.com",
    projectId: "trainscheduler-eb79e",
    storageBucket: "",
    messagingSenderId: "96747496347",
    appId: "1:96747496347:web:80cc3aa0012f1d17"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// Submit Function
$("#submitBtn").on("click", function () {
    event.preventDefault();

    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var startTime = moment($("#startTime").val().trim(), "HH:mm").subtract(10, "years").format("X");
    var frequency = $("#frequency").val().trim();
    
    database.ref("/KCtrainSchedules").push({
        name: trainName,
        destination: destination,
        time: startTime,
        frequency: frequency,
    });

    // Empty Form
    $("#trainName").val("");
    $("#destination").val("");
    $("#startTime").val("");
    $("#frequency").val("");

});

database.ref("/KCtrainSchedules").on("child_added", function (snapshot) {
    //  create local variables to read the data from firebase
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;;
    var trainTime = snapshot.val().time;

    // Moment JS calculations
    var remainder = moment().diff(moment.unix(trainTime), "minutes") % frequency;
    var minutesAway = frequency - remainder;
    var nextArrival = moment().add(minutesAway, "m").format("hh:mm A")

    // Append Row 
    $("#train-data").append("<tr><td>" + name + "</td><td>" + destination + "</td> <td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
});
