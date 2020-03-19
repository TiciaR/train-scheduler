$(document).ready(function () {
        var firebaseConfig = {
            apiKey: "AIzaSyC3CGFTeo1g24eoPEvQ3jESYu3XTE5T0q4",
            authDomain: "be-bootcamp-trainscheduler.firebaseapp.com",
            databaseURL: "https://be-bootcamp-trainscheduler.firebaseio.com",
            projectId: "be-bootcamp-trainscheduler",
            storageBucket: "be-bootcamp-trainscheduler.appspot.com",
            messagingSenderId: "99825538751",
            appId: "1:99825538751:web:9d3559003e492a0024980a"
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
