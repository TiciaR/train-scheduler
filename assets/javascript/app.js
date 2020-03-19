$(document).ready(function () {
    var firebaseConfig = {
        apiKey: "AIzaSyC0-XoMa-lsdriGZ6_BEsrPl9wcbejNuX0",
        authDomain: "train-scheduler-b61bd.firebaseapp.com",
        databaseURL: "https://train-scheduler-b61bd.firebaseio.com",
        projectId: "train-scheduler-b61bd",
        storageBucket: "train-scheduler-b61bd.appspot.com",
        messagingSenderId: "390313426052",
        appId: "1:390313426052:web:ff57994b58c2ab96ddd6d1"
      };
   
    firebase.initializeApp(firebaseConfig);

    var database = firebase.database();

    $("#addTrain").on("click", function () {
        event.preventDefault()

        var newTrain = {
            name: $("#ee-name").val(),
            destination: $("#ee-destination").val(),
            first: $("#ee-first").val(),
            frequency: $("#ee-frequency").val()
        }
        console.log("newTrain", newTrain)


        database.ref().push(newTrain)
    })


   
    database.ref().on("child_added", function (result) {
        console.log(result.val())


        var currentTime = moment().format("MM/DD/YYYY - HH:mm")
        $("#current").text(currentTime)

        var first = moment(result.val().first, "HH:mm:ss")   

        var diff = moment().diff(first, "minutes")
      

        var frequency = parseInt(result.val().frequency)
        console.log("-->",frequency)
        var minutesAway = frequency - (diff % frequency)
        var nextTrain = moment().add(minutesAway, "minutes").format("hh:mm A")


        $("#tablebody").append(
            `<tr>
             <th scope="row">${result.val().name}</th>
             <td>${result.val().destination}</td>
              <td>${result.val().frequency}</td>
              <td>${nextTrain}</td>
              <td>${minutesAway}</td>
            </tr>`
        )

    })








})