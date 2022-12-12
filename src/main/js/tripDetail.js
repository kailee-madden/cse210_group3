/* eslint-disable new-cap */
/* eslint-disable no-undef */
/* eslint-disable no-prototype-builtins */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */

const tripName = document.getElementById('trip-name')
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const tripId = parseInt(urlParams.get('trip'))
const oneDayDetails = document.getElementById('oneday-details')
const futureTripButton = document.getElementById('futureTrips')
const exportTripButton = document.getElementById('exportTrip')
window.jsPDF = window.jspdf.jsPDF

let tripDetails = {}

/**
 * Render function when page is first loaded
 */
function populateTripDetailsOnLoad () {
  window.postMessage({
    type: 'get trip metadata',
    id: tripId
  })
}

/**
 * Function to export trip in PDF format
 */
function exportTripData () {
  const doc = new jsPDF()
  doc.setFont(undefined, 'bold')
  doc.text(20, 10, 'Trip to ' + tripDetails.location).setFont(undefined, 'normal')
  doc.text(20, 20, tripDetails.startDate + ' to ' + tripDetails.endDate)
  let i = 0
  for (const e in tripDetails.events) {
    if (tripDetails.events[e].length != 0) {
      doc.setFont(undefined, 'bold')
      doc.text(20, 35 + i, 'Day ' + e).setFont(undefined, 'normal')
      i += 10
      for (const t in tripDetails.events[e]) {
        doc.text(20, 35 + i, 'Time: ' + tripDetails.events[e][t].startTime)
        i += 5
        if (tripDetails.events[e][t].hasOwnProperty('location')) {
          doc.text(20, 35 + i, 'Location: ' + tripDetails.events[e][t].location)
          i += 5
        }
        doc.text(20, 35 + i, 'Details: ' + tripDetails.events[e][t].details)
        i += 10
      }
    }
    i += 10
  }
  doc.save('Trip' + tripDetails.id + '.pdf')
}

/**
 * Populates the day wise carousel
 */
function populateBasicDayWiseCarouselTemplate () {
  oneDayDetails.innerHTML = ''
  const ymdStart = tripDetails.startDate.split('-')
  const ymdEnd = tripDetails.endDate.split('-')
  const numDays = datediff(new Date(ymdStart[0], ymdStart[1] - 1, ymdStart[2]), new Date(ymdEnd[0], ymdEnd[1] - 1, ymdEnd[2])) + 1
  tripDetails.events = {}
  for (let i = 1; i <= numDays; i++) {
    addDayCarousel(i)
    tripDetails.events[i] = []
  }
}

/**
 * Add a day to the day wise carousel
 * @param {*} index the index of the day to be added
 */
const addDayCarousel = (index) => {
  const item = document.createElement('div')
  item.className = 'carousel-item'
  item.id = tripId.toString() + '-' + index.toString()
  if (index === 1) {
    item.classList.add('active')
  }
  oneDayDetails.appendChild(item)
}

/**
 * Triggers event to get all days data
 */
function populateAllDaysDetails () {
  window.postMessage({
    type: 'get all days data',
    id: tripId
  })
}

/**
 * navigation to go forward and backword, as well as the export button
 */
window.onload = function () {
  futureTripButton.addEventListener('click', () => {
    window.location.href = '../index.html'
  })
  exportTripButton.addEventListener('click', () => {
    exportTripData()
  })
  populateTripDetailsOnLoad()
}

/**
 * Add trip name to card
 */
const addName = () => {
  tripName.className = 'card'
  tripName.classList.add('card-trip')
  if (sessionStorage.getItem('past') === 'true') {
    tripName.style.backgroundColor = '#6592A6'
  } else {
    tripName.style.backgroundColor = '#99AF96'
  }
  tripName.innerHTML = ''
  tripName.innerHTML = `
    <div class='card-body row' id='${tripDetails.id}'>
      <h5 class='card-title'>
        ${tripDetails.location}
        <i type="button" class="bi bi-pencil" data-bs-toggle="modal" data-bs-target="#editLocation"></i>
      </h5>
      <p class='card-text'>
        Date: ${tripDetails.startDate.substring(5)} to ${tripDetails.endDate.substring(5)}
        <i type="button" class="bi bi-pencil" data-bs-toggle="modal" data-bs-target="#editDates"></i>
      </p>
    </div>
  `
}

/**
 * Edit location of current trip
 */
function editTripLocation () {
  const location = document.getElementById('newLocation').value
  if (location == '') {
    alert('Please fill out location field if you wish to update.')
  } else {
    const tripMetadata = { id: tripId, location, startDate: tripDetails.startDate, endDate: tripDetails.endDate }
    updateTripMetadata(tripMetadata)
    document.getElementById('newLocation').value = ''
  }
}

/**
 * Triggers the update trip event for database abstraction
 * @param {db} valueDict
 */
function updateTripMetadata (valueDict) {
  window.postMessage({
    type: 'update trip metadata',
    values: valueDict
  })
}

/**
 * Event handler for updating trip
 * @param {*} event
 */
function handleUpdateTripMetadataResponse (event) {
  tripDetails.location = event.data.values.location
  tripDetails.startDate = event.data.values.startDate
  tripDetails.endDate = event.data.values.endDate
  const ymdStart = tripDetails.startDate.split('-')
  const ymdEnd = tripDetails.endDate.split('-')
  const numDays = datediff(new Date(ymdStart[0], ymdStart[1] - 1, ymdStart[2]), new Date(ymdEnd[0], ymdEnd[1] - 1, ymdEnd[2])) + 1
  const newEvents = {}
  for (let i = 1; i <= numDays; ++i) {
    if (i in tripDetails.events) {
      newEvents[i] = tripDetails.events[i]
    } else {
      newEvents[i] = []
    }
  }
  tripDetails.events = newEvents
  addName()
  window.postMessage({
    type: 'update trip data',
    tripData: tripDetails
  })
}

/**
 * Event handler for get trip metadata event
 * @param {*} event
 */
function handleGetTripMetadataResponse (event) {
  const trip = event.data.trip
  tripDetails.id = tripId
  tripDetails.location = trip.location
  tripDetails.startDate = trip.startDate
  tripDetails.endDate = trip.endDate
  addName()
  populateBasicDayWiseCarouselTemplate()
  populateAllDaysDetails()
}

/**
 * Event handler for add event data event
 * @param {*} event
 */
function handleAddEventDataResponse (event) {
  tripDetails = event.data.tripData
  loadAllDayDetails()
}

/**
 * Event handler for get all days data event
 * @param {*} event
 */
function handleGetAllDaysDataResponse (event) {
  if (event.data.tripData != undefined) {
    tripDetails = event.data.tripData
  }
  loadAllDayDetails()
}

/**
 * Event handler for update trip data event
 * @param {*} event
 */
function handleUpdateTripDataResponse (event) {
  tripDetails = event.data.tripData
  populateBasicDayWiseCarouselTemplate()
  populateAllDaysDetails()
}

/**
 * Event handler for delete event data event
 * @param {*} event
 */
function handleDeleteEventDataResponse (event) {
  tripDetails = event.data.tripData
  loadAllDayDetails()
}

/**
 * Event listener for all events
 */
self.addEventListener('message', function (event) {
  switch (event.data.type) {
    case 'update trip metadata response':
      handleUpdateTripMetadataResponse(event)
      break
    case 'get trip metadata response':
      handleGetTripMetadataResponse(event)
      break
    case 'add trip data response':
      handleAddEventDataResponse(event)
      break
    case 'get all days data response':
      handleGetAllDaysDataResponse(event)
      break
    case 'update trip data response':
      handleUpdateTripDataResponse(event)
      break
    case 'delete event response':
      handleDeleteEventDataResponse(event)
      break
  }
})

/**
 * Prompt the user to enter new dates when edit trip dates
 */
function editTripDates () {
  const startDate = document.getElementById('newStartDate').value
  const endDate = document.getElementById('newEndDate').value
  if (startDate == '' || endDate == '') {
    alert('Please fill out both start and end dates if you wish to update.')
  } else {
    const tripMetadata = { id: tripId, location: tripDetails.location, startDate, endDate }
    updateTripMetadata(tripMetadata)
    document.getElementById('newStartDate').value = ''
    document.getElementById('newEndDate').value = ''
  }
}

/**
 * Prompt the user to enter new event details when editing
 */
function editEventDetails () {
  const newStartTime = document.getElementById('newStartTime').value
  const newLocationDetails = document.getElementById('newLocationDetails').value
  const newEventDetails = document.getElementById('newEventDetails').value

  if (newEventDetails == '' && newStartTime == '') {
    alert('Please update either the event details or the event time.')
  } else if (newEventDetails.length > 500) {
    alert('You have exceeded the event details character limit of 500 characters. Please shorten your event details.')
  } else {
    const editEventModal = document.getElementById('editEvent')
    const eventId = editEventModal.getAttribute('event-id').split('-')[1].split('_')[1].toString()
    const dayId = getActiveDayId()
    const updatedTripData = tripDetails
    const updatedTripDataEvents = updatedTripData.events[dayId]
    const eventInx = updatedTripDataEvents.findIndex(x => x.id == eventId)
    updatedTripDataEvents[eventInx].startTime = newStartTime
    updatedTripDataEvents[eventInx].details = newEventDetails
    updatedTripDataEvents[eventInx].location = newLocationDetails
    window.postMessage({
      type: 'update trip data',
      tripData: updatedTripData
    })
    document.getElementById('newStartTime').value = ''
    document.getElementById('newLocationDetails').value = ''
    document.getElementById('newEventDetails').value = ''
  }
}

/**
 * Delete an event in a trip
 */
function deleteEvent () {
  const editEventModal = document.getElementById('editEvent')
  const eventId = editEventModal.getAttribute('event-id').split('-')[1].split('_')[1].toString()
  const dayId = getActiveDayId()
  const updatedTripData = tripDetails
  const updatedTripDataEvents = updatedTripData.events[dayId]
  const eventInx = updatedTripDataEvents.findIndex(x => x.id == eventId)
  updatedTripDataEvents.splice(eventInx, 1)
  window.postMessage({
    type: 'delete trip event data',
    tripData: updatedTripData
  })
  document.getElementById('newStartTime').value = ''
  document.getElementById('newLocationDetails').value = ''
  document.getElementById('newEventDetails').value = ''
}

/**
 * Set an id to the event
 * @param {*} ele the event element
 */
function setEventId (ele) {
  const eventId = ele.parentNode.parentNode.id
  const editModal = document.getElementById('editEvent')
  editModal.setAttribute('event-id', eventId)
  const dayId = getActiveDayId()
  const eventInxInd = eventId.split('-')[1].split('_')[1].toString()
  const eventInx = tripDetails.events[dayId].findIndex(x => x.id == eventInxInd)
  const event = tripDetails.events[dayId][eventInx]
  document.getElementById('newStartTime').value = event.startTime
  if (event.location && event.location !== '') {
    document.getElementById('newLocationDetails').value = event.location
  }
  document.getElementById('newEventDetails').value = event.details
}

/**
 * Get the current day of id
 * @returns the current day id
 */
function getActiveDayId () {
  const odd = document.querySelector('#oneday-details')
  const activeDayNode = odd.querySelector('.active')
  return activeDayNode.id.split('-')[1].toString()
}

/**
 * Prompt the user to add a new event and enter the event details
 */
function addNewEvent () {
  const startTime = document.getElementById('startTime').value
  const locationDetails = document.getElementById('locationDetails').value
  const eventDetails = document.getElementById('eventDetails').value
  if (eventDetails == '' || startTime == '') {
    alert('Please fill out all required fields to add an event.')
  } else if (eventDetails.length > 500) {
    alert('You have exceeded the event details character limit of 500 characters. Please shorten your event details.')
  } else {
    const dayId = getActiveDayId()
    let newId = '1'
    if (tripDetails.events == undefined || tripDetails.events[dayId] == undefined || tripDetails.events[dayId].length == 0) {
      newId = '1'
    } else {
      newId = (Math.max(...tripDetails.events[dayId].map(e => parseInt(e.id))) + 1).toString()
    }
    const event = { id: newId, startTime, details: eventDetails }
    if (locationDetails != '') {
      event.location = locationDetails
    }
    const updatedTripData = tripDetails
    updatedTripData.events[dayId].push(event)
    updatedTripData.events[dayId].sort((a, b) => (a.startTime > b.startTime) ? 1 : -1)
    window.postMessage({
      type: 'add trip data',
      tripData: updatedTripData
    })
    document.getElementById('startTime').value = ''
    document.getElementById('locationDetails').value = ''
    document.getElementById('eventDetails').value = ''
  }
}

/**
 * Calculate the difference in seconds between two days
 * @param {*} first the first day
 * @param {*} second the second day
 * @returns the difference in seconds
 */
function datediff (first, second) {
  return Math.round((second - first) / (1000 * 60 * 60 * 24))
}

/**
 * Render all details of all days
 */
const loadAllDayDetails = () => {
  for (const key in tripDetails.events) {
    showOneDay(key)
  }
}

/**
 * Render the details of one day
 * @param {Number} index the index of the day to be rendered
 */
const showOneDay = (index) => {
  const itemId = tripId.toString() + '-' + index.toString()
  const item = document.getElementById(itemId)
  item.innerHTML = ''
  const container = document.createElement('div')
  container.className = 'event-container'
  container.classList.add('overflow-scroll')
  container.innerHTML = formSchedule(index)
  item.appendChild(container)
}

/**
 * Form schedule element for the day of the given index
 * @param {Number} index the day to form schedule
 * @returns a html element for the schedule
 */
function formSchedule (index) {
  let output = `<h5 class='event-day'> Day ${index} </h5>`
  const currentDetails = tripDetails.events[index]
  if (currentDetails != undefined && currentDetails.length !== 0) {
    for (let j = 0; j < currentDetails.length; j++) {
      const details = currentDetails[j].details
      // display at most 40 characters on event row
      const detSubstr = details.substring(0, Math.min(details.length, 40)) + '...'
      const eventId = 'eventId-' + tripId.toString() + '_' + currentDetails[j].id
      let eventInfo = '<p id="eventInfo">'
      if (currentDetails != undefined && 'location' in currentDetails[j] && currentDetails[j].location !== '') {
        eventInfo += `Location: ${currentDetails[j].location}
                      <br>
                      <br>
                     `
      }
      eventInfo += `  ${currentDetails[j].details}
                    </p>
                   `
      const collapseEventId = 'collapse-' + eventId.toString()
      output += `
                  <div class='row event-row' id=${eventId}>
                    <div class='col col-2 event-time' style='border-left-color: ${getRandomColor()};'>${currentDetails[j].startTime}</div>
                    <div class='col col-8 text-start my-auto'>
                      <a class= 'event-detail' data-bs-toggle="collapse" href="#${collapseEventId}" role="button" aria-expanded="false" aria-controls="collapseEvent">
                        ${detSubstr}
                      </a>
                    </div>
                    <div class='col col-2 my-auto event-edit'>
                      <i type="button" class='bi bi-pencil' data-bs-toggle="modal" data-bs-target="#editEvent" onclick="setEventId(this)"></i>
                    </div>
                  </div>
                  <div class="collapse" id="${collapseEventId}">
                    <div class="card card-detail card-body">
                      ${eventInfo}
                    </div>
                  </div>
                `
    }
  }
  output += `
              <div class='row'>
                <div class='col'>
                  <button id="add-event" data-bs-toggle="modal" data-bs-target="#addEvent">
                    <i class="bi bi-plus-lg"></i> Add Event
                  </button>
                </div>
              </div>
            `
  return output
}

/**
 * random color for each event row
 */
function getRandomColor () {
  return 'hsl(' + Math.random() * 360 + ', 55%, 75%)'
}
