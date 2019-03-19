$(document).ready(function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyClIW7mpJjdQmz8TKxYCPLaM4xdtYpLiiI",
    authDomain: "class-test-f33f4.firebaseapp.com",
    databaseURL: "https://class-test-f33f4.firebaseio.com",
    projectId: "class-test-f33f4",
    storageBucket: "class-test-f33f4.appspot.com",
    messagingSenderId: "399099371127"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

  var trainName = "";
  var destination = "";
  var trainTime = "";
  var minutes = 0;

  $("#submit").on("click", function(event) {
    event.preventDefault();

    trainName = $("#train-name").val();
    destination = $("#destination").val();
    trainTime = $("#train-time").val();
    minutes = $("#frequency").val();
    //   console.log("input", trainName, destination, trainTime, minutes);

    //   database.ref("trainschedule").on("value", function(snapshot) {
    //     console.log("database spit", snapshot.val());
    //   });

    database.ref("trainschedule").push({
      train: trainName,
      where: destination,
      time: trainTime,
      frequency: minutes
    });
  });
  database.ref("trainschedule").on("child_added", function(child) {
    console.log(child.val());
    let name = child.val().train;
    let dest = child.val().where;
    let tim = child.val().time;
    let freq = child.val().frequency;
    freq = parseInt(freq);
    // consol
    var firstTrainConverted = moment(tim, "HH:mm").subtract(1, "years");
    console.log("conversion", firstTrainConverted);
    var currentTime = moment();
    // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    var difference = moment().diff(moment(firstTrainConverted), "minutes");
    console.log("difference", difference);
    var remainder = difference % freq;
    console.log("remainder", remainder);
    var minutesTillTrain = freq - remainder;
    console.log("minutes away" + minutesTillTrain);
    var nextArrival = moment().add(minutesTillTrain, "minutes");
    console.log("next arrival" + nextArrival);

    $("#train-info").append(
      `<tr><td>${name}</td><td>${dest}</td><td>${freq}</td><td>${moment(
        nextArrival
      ).format("hh:mm")}</td><td>${minutesTillTrain}</td></tr>`
    );
  });
});
