$(document).ready(function () {
    fetchPeopleList();
    fetchTypesList();

    $("#listButton").on("click", showList);
});

async function fetchPeopleList() {
    try {
        const response = await $.ajax({
            url: "http://ajax1.lmsoft.cz/procedure.php?cmd=getPeopleList",
            beforeSend: setAuthorizationHeader,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            processData: false
        });
        renderPeopleList(response);
    } catch (error) {
        alert("Cannot get people data");
    }
}

async function fetchTypesList() {
    try {
        const response = await $.ajax({
            url: "http://ajax1.lmsoft.cz/procedure.php?cmd=getTypesList",
            beforeSend: setAuthorizationHeader,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            processData: false
        });
        renderTypesList(response);
    } catch (error) {
        alert("Cannot get types data");
    }
}

function setAuthorizationHeader(xhr) {
    xhr.setRequestHeader("Authorization", "Basic " + btoa("coffee:kafe"));
}

function renderPeopleList(data) {
    const namesRadio = $("#namesRadio").empty();
    data.forEach((value, key) => {
        namesRadio.append(`
            <input type='radio' id='name${key}' name='user' value='${value["ID"]}' />
            <label for='name${key}'>${value["name"]}</label><br>
        `);
    });
}

function renderTypesList(data) {
    const typesSliders = $("#typesSliders").empty();
    data.forEach((value, key) => {
        typesSliders.append(`
            <div class='sliderDiv'>
                <label for='slider${key}'>${value["typ"]}</label>
                <div class='sliderDiv'>
                    <label id='slidertext${key}'>0</label>
                    <input type='range' min='0' max='10' value='0' class='slider' id='slider${key}' />
                </div>
            </div><br>
        `);

        const slider = document.getElementById(`slider${key}`);
        slider.addEventListener("input", () => {
            document.getElementById(`slidertext${key}`).innerText = slider.value;
        });
    });
}

async function showList(event) {
    event.preventDefault();
    try {
        const data = await $.ajax({
            url: "http://ajax1.lmsoft.cz/procedure.php?cmd=getSummaryOfDrinks",
            beforeSend: setAuthorizationHeader,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            processData: false
        });
        renderSummaryOfDrinks(data);
    } catch (error) {
        alert("Cannot get summary of drinks data");
    }
}

function renderSummaryOfDrinks(data) {
    $("#table").remove();
    const table = $("<table id='table'><tr><th>Název</th><th>Jméno</th><th>Počet</th></tr></table>");
    data.forEach(value => {
        table.append(`
            <tr>
                <td>${value[0]}</td>
                <td>${value[2]}</td>
                <td>${value[1]}</td>
            </tr>
        `);
    });
    $("body").append(table);
}
