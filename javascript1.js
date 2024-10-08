
$(document).ready(function () {
    $.ajax({
        url: "http://ajax1.lmsoft.cz/procedure.php?cmd=getPeopleList",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa("coffee:kafe"));
        },
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        processData: false,
        success: tlacitko,
        error: function () {
            alert("Cannot get data");
        }
    });
    
    $.ajax({
        url: "http://ajax1.lmsoft.cz/procedure.php?cmd=getTypesList",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa("coffee:kafe"));
        },
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        processData: false,
        success: posuvnik,
        error: function () {
            alert("Cannot get data");
        }
    });

    $("#listButton").on("click", showList);
});

function tlacitko(data) {
    $.each(data, function (key, value) {
        $("#namesRadio").append("<input type='radio' id='" + "name" + key + "' name='user' value='" + value["ID"] + "'/>
                                <label for='" + "name" + key + "'>" + value["name"] + "</label><br>");
    });
}

function posuvnik(data) {
    $.each(data, function (key, value) {
        $("#typesSliders").append("<div class='sliderDiv'><label for='" + 
                                  "slider" + key + "'>" + value["typ"] + "</label><div class='sliderDiv'><label id='" + "slidertext" + key + "'>
                                  0</label><input type='range' min='0' max='10' value='0' class='slider' id='" + "slider" + key + "'></div></div><br>");

        let slider = document.getElementById("slider" + key);
        slider.addEventListener("input", function() {
            document.getElementById("slidertext" + key).innerText = slider.value;
        }); 
        
    });
}

function showList(event){
    event.preventDefault();
    $.ajax({
        url: "http://ajax1.lmsoft.cz/procedure.php?cmd=getSummaryOfDrinks",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa("coffee:kafe"));
        },
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        processData: false,
        success: function(data){
            $("#table").remove()
            $("body").append("<table id='table'><tr>
                             <th>Název</th><th>Jméno</th>
                             <th>Počet</th></tr></table>")

            $.each(data, function (key, value) {
                $("#table").append("<tr><td>" + value[0] + "</td>
                                   <td>" + value[2] + "</td><td>" + value[1] + "</td></tr>");
            });
        },
        error: function () {
            alert("Cannot get data");
        }
    });
}
