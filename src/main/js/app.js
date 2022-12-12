/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
const cardContainer = document.querySelector('.container')
const loadMoreButton = document.getElementById('load-more')
const tripCountElem = document.getElementById('trip-count')
const tripTotalElem = document.getElementById('trip-total')
const planNewTripButton = document.getElementById('plan-new-trip')
const historicalTripButton = document.getElementById('pastTrips')

const trips = []
const tripsMetadata = {}
let swRegistration = null

/**
 * Sort the trips by their start date
 * @returns a comparator function to sort trips by there start date
 */
function sortTrips () {
  return function (a, b) {
    const partsA = a.startDate.split('-')
    const partsB = b.startDate.split('-')
    const dateA = new Date(partsA[0], partsA[1] - 1, partsA[2])
    const dateB = new Date(partsB[0], partsB[1] - 1, partsB[2])
    if (dateA > dateB) {
      return 1
    } else if (dateA < dateB) {
      return -1
    }
    return 0
  }
}

/**
 * Get a subset of future or past/ongoing trips
 * @param {boolean} future  whether to return future trips
 * @param {*} allTrips All the trips
 * @returns a subset of future trips if future is true, else a subset of past and ongoing trips
 */
function futureTrips (future, allTrips) {
  const today = new Date()
  const subsetTrips = []
  Object.entries(allTrips).forEach((entry) => {
    const [_, tripId] = entry
    const value = tripsMetadata[tripId]
    const parts = value.endDate.split('-')
    const start = new Date(parts[0], parts[1] - 1, parts[2])
    if (future) {
      if (start > today) {
        subsetTrips.push(value)
      }
    } else {
      if (start < today) {
        subsetTrips.push(value)
      }
    }
  })

  return subsetTrips
}
/**
 * Sort the selected trips and render them
 * @param {*} page page index to render
 * @param {boolean} future true to render future trips, otherwise, render past and ongoing trips
 */
function renderTrips (page, future) {
  const newTrips = futureTrips(future, trips)
  newTrips.sort(sortTrips())
  tripsCount = newTrips.length
  tripTotalElem.innerHTML = tripsCount
  pageCount = Math.ceil(tripsCount / tripIncrease)
  pageCount = pageCount == 0 ? 1 : pageCount

  addTrips(page, newTrips)
}

let tripsCount = trips.length
tripTotalElem.innerHTML = tripsCount

const tripIncrease = 3
let pageCount = Math.ceil(tripsCount / tripIncrease)

let currentPage = 1

function formTrip (index, trips) {
  let output = ''
  output += `
              <span class="close" data-bs-toggle="modal" data-bs-target="#deleteModal" onclick="storeTripID(this)"><i class="bi bi-x"></i></span>
              <div class='card-body row' onclick="goToTripDetail(this)">
                <h5 class='card-title'>${trips[index].location}</h5>
                <p class='card-text'>Start Date: ${trips[index].startDate.substring(5)}-${trips[index].startDate.substring(0, 4)}</p>
                <p class='card-text'>End Date: ${trips[index].endDate.substring(5)}-${trips[index].endDate.substring(0, 4)}</p>
                <i class="bi bi-arrow-right"></i>
              </div>
            `
  return output
}
/**
 * Transition to trip detail page
 * @param {*} closeButton
 */
function goToTripDetail (body) {
  const tripId = body.parentNode.id
  sessionStorage.setItem('past', false)
  window.open('pages/tripDetail.html?trip=' + encodeURIComponent(tripId), '_self')
}

/**
 * Show a trip on a page
 * @param {*} index the index of the trip to be shown
 * @param {*} trips the trips array
 */
const showTrips = (index, trips) => {
  const card = document.createElement('div')
  card.className = 'card'
  card.id = trips[index].id
  card.innerHTML = formTrip(index, trips)
  cardContainer.appendChild(card)
}

/**
 * Add trips to a page
 * @param {*} pageIndex the current page index
 * @param {*} trips the trips to be added
 */
const addTrips = (pageIndex, trips) => {
  currentPage = pageIndex

  handleButtonStatus()

  let endRange = currentPage === pageCount ? tripsCount : pageIndex * tripIncrease
  endRange = endRange > tripsCount.length ? tripsCount.length : endRange
  tripCountElem.innerHTML = endRange
  const tripsContainerNode = document.getElementById('trips_container')
  tripsContainerNode.innerHTML = ''
  for (let i = 0; i < endRange && i < trips.length; i++) {
    showTrips(i, trips)
  }
}

/**
 * Handle the status of the load more button
 */
const handleButtonStatus = () => {
  if (pageCount === currentPage) {
    loadMoreButton.classList.add('disabled')
    loadMoreButton.setAttribute('disabled', true)
  } else {
    loadMoreButton.classList.remove('disabled')
    loadMoreButton.removeAttribute('disabled')
  }
}

/**
 * Function to start rendering trips and handle landing page
 */
window.onload = function () {
  historicalTripButton.addEventListener('click', () => {
    window.location.href = 'pages/historical.html'
  })
  loadAllTrips()
  loadMoreButton.addEventListener('click', () => {
    renderTrips(currentPage + 1, true)
  })
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register('/serviceWorker.js', {
        type: 'module'
      })
      .then(res => {
        swRegistration = res
      })
      .catch(err => console.log('service worker not registered', err))
    requestNotificationPermission()
    setInterval(notificationChecker, 30000)
  })
};

/**
 * Requesting permission to show notifications
 */
const requestNotificationPermission = async () => {
  const permission = await window.Notification.requestPermission()
  if (permission !== 'granted') {
    throw new Error('Permission not granted for Notification')
  }
}
/**
 * Signal the service worker to check for notifications
 */
function notificationChecker () {
  window.postMessage({
    type: 'check for notification'
  })
}

/**
 * Check and show notifications for entire trip
 */
function checkNotification (event) {
  const date = new Date()
  const allTripsMetaData = []
  Object.entries(trips).forEach((entry) => {
    const [_, tripId] = entry
    const value = tripsMetadata[tripId]
    allTripsMetaData.push(value)
  })
  for (let i = 0; i < allTripsMetaData.length; i++) {
    const obj = allTripsMetaData[i]
    const parts = obj.startDate.split('-')
    const start = new Date(parts[0], parts[1] - 1, parts[2])
    const prev = new Date()
    prev.setDate(start.getDate() - 1)
    if (prev.getFullYear() == date.getFullYear() &&
        prev.getMonth() == date.getMonth() &&
        prev.getDate() == date.getDate() &&
        date.getHours == 16 &&
        date.getMinutes == 0) {
      const bodyText = 'Done with packing? Fun and adventure awaits you in ' + obj.location + '!'
      const titleText = 'Your Trip to ' + obj.location + ' begins tomorrow!'
      swRegistration.showNotification(titleText, { body: bodyText })
    }
    window.postMessage({
      type: 'get all days data for notification',
      id: obj.id
    })
  }
}

/**
 * Check and show notifications for trip events
 */
function checkNotificationForEvents (event) {
  const date = new Date()
  const tripEventDetails = event.data.tripData
  if (tripEventDetails !== undefined) {
    const parts = tripEventDetails.startDate.split('-')
    const start = new Date(parts[0], parts[1] - 1, parts[2])
    const events = tripEventDetails.events
    Object.entries(events).forEach((entry) => {
      if (entry[1].length != 0) {
        const dateOfEvent = new Date()
        const dayInTrip = entry[0]
        dateOfEvent.setDate(start.getDate() + (dayInTrip - 1))
        if (dateOfEvent.getFullYear() == date.getFullYear() && dateOfEvent.getMonth() == date.getMonth() && dateOfEvent.getDate() == date.getDate()) {
          const eventsOfTheDay = entry[1]
          for (let i = 0; i < eventsOfTheDay.length; i++) {
            const hours = eventsOfTheDay[i].startTime.split(':')
            dateOfEvent.setHours(hours[0], hours[1], 0, 0)
            date.setSeconds(0)
            if ((dateOfEvent - date) >= 540000 && (dateOfEvent - date) <= 660000) {
              const bodyText = 'Your Event ' + eventsOfTheDay[i].details + ' begins in ' + Math.trunc((dateOfEvent - date) / 60000) + ' minutes!'
              const titleText = eventsOfTheDay[i].details + ' ' + eventsOfTheDay[i].location
              swRegistration.showNotification(titleText, { body: bodyText })
            }
          }
        }
      }
    })
  }
}

/**
 * Signal the service worker to load all the trips
 */
function loadAllTrips () {
  window.postMessage({
    type: 'get all trips metadata'
  })
};

/**
 * Get the tripID of the trip to be deleted
 * @param {*} closeButton the node for 'x' button on the delete trip popup
 */
const storeTripID = (closeButton) => {
  document.getElementById('deleteModal').value = closeButton.parentNode.id
}

/**
 * Delete the selected trip
 */
function deleteTrip () {
  window.postMessage({
    type: 'delete trip metadata',
    id: document.getElementById('deleteModal').value
  })
}

/**
 * Adds the location and dates for a new trip to IndexedDB
 * @fires postMessage with trip data
 */
function addNewTrip () {
  const location = document.getElementById('location').value
  const startDate = document.getElementById('startDate').value
  const endDate = document.getElementById('endDate').value

  if (location == '' || startDate == '' || endDate == '') {
    alert('Please fill all fields.')
  } else if (trips.length > 140) {
    alert('You have exceeded the maximum number of trips. Please delete trips from the historical or future pages before creating a new one.')
  } else {
    window.postMessage({
      type: 'add trip metadata',
      location,
      startDate,
      endDate
    })
    emptyNewTripFields()
  }
}
/**
 * Clears the fields for new trip
 */
function emptyNewTripFields () {
  document.getElementById('location').value = ''
  document.getElementById('startDate').value = ''
  document.getElementById('endDate').value = ''
}

/**
 * Function to signal the service worker to update a trip
 * @param {} valueDict the values to update a trip
 */
function updateTrip (valueDict) {
  window.postMessage({
    type: 'update trip metadata',
    values: valueDict
  })
}

/**
 * Function to signal the service worker to get trip details
 */
function getTripDetails (tripId) {
  window.postMessage({
    type: 'get trip metadata',
    id: tripId
  })
}

/**
 * Function handle a newly added trip and show it
 * @param {*} event
 */
function handleAddNewTripResponse (event) {
  const insTripId = event.data.id
  const insLocation = event.data.location
  const insStartDate = event.data.startDate
  const insEndDate = event.data.endDate
  const trip = { id: insTripId, location: insLocation, startDate: insStartDate, endDate: insEndDate }
  trips.push(insTripId)
  tripsMetadata[insTripId] = trip
  renderTrips(currentPage, true)
}

/**
 * Event handler for get all trips
 * @param {*} event the event to trigger the function
 */
function handleGetAllTripsResponse (event) {
  const allTrips = event.data.trips
  for (const trip of allTrips) {
    trips.push(trip.id)
    tripsMetadata[trip.id] = trip
  }
  renderTrips(currentPage, true)
}

/**
 * Event handler to render the newly updated trip
 * @param {*} event
 */
function handleUpdateTripResponse (event) {
  tripsMetadata[event.data.id] = event.data.values
  renderTrips(currentPage, true)
}

function handleDeleteTripResponse (event) {
  delete tripsMetadata[event.data.id]
  const index = trips.indexOf(event.data.id)
  if (index > -1) {
    trips.splice(index, 1)
  }
  if (tripIncrease * (currentPage - 1) >= trips.length) {
    currentPage = Math.max(1, currentPage - 1)
  }
  renderTrips(currentPage, true)
  window.postMessage({
    type: 'delete trip data',
    id: event.data.id
  })
}

self.addEventListener('message', function (event) {
  switch (event.data.type) {
    case 'add trip metadata response':
      handleAddNewTripResponse(event)
      break
    case 'get all trips metadata response':
      handleGetAllTripsResponse(event)
      break
    case 'update trip metadata response':
      handleUpdateTripResponse(event)
      break
    case 'delete trip metadata response':
      handleDeleteTripResponse(event)
      break
    case 'check for notification':
      checkNotification(event)
      break
    case 'get all event details for notif':
      checkNotificationForEvents(event)
      break
  }
})
