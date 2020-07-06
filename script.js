const currentTime = moment().format("dddd, MMMM Do");
var hourCounter = 9;
let timeOfDay = "AM";
var momentNow = moment();
var currentHour = moment().format("hA");

$("#currentDay").text(currentTime);

for (let i = 0; i <= 8; i++) {
  var getTimeOfDay = moment(`${hourCounter}${timeOfDay}`, "hA");
    const eventEntry = localStorage.getItem(`timeblock: ${hourCounter}`);
  $("#container").append(`
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span id=${hourCounter} class="input-group-text">${hourCounter}${timeOfDay}</span>
            </div>
            <textarea class="form-control" id=inputFor${hourCounter} aria-label="With textarea">
           ${eventEntry == null ? "" : eventEntry}
            </textarea>
            <div class="input-group-append">
                <button type="button" class="btn btn-primary" id=${hourCounter}btn>
                    <i class="far fa-save"></i>
                </button>
            </div>
        </div>
    `);

  if (moment(currentHour, "hA").isAfter(getTimeOfDay)) {
    $(`#${hourCounter}`).css("background-color", "grey");
  }

  if (moment(currentHour, "hA").isSame(getTimeOfDay)) {
    $(`#${hourCounter}`).css("background-color", "red");
  }

  if (moment(currentHour, "hA").isBefore(getTimeOfDay)) {
    $(`#${hourCounter}`).css("background-color", "Green");
  }

  if (hourCounter == 11) {
    timeOfDay = "PM";
  }
  if (hourCounter == 12) {
    hourCounter = 0;
  }

  hourCounter++;
}
$("button").click(saveEvent);

function saveEvent(event) {
  const btnID = parseInt(event.currentTarget.id, 10);
  const inputEventValue = $(`#inputFor${btnID}`).val();
  localStorage.setItem(`timeblock: ${btnID}`, inputEventValue);
}
