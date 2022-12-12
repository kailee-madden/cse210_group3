/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
const cardContainer = document.querySelector('.container')
const loadMoreButton = document.getElementById('load-more')
const tripCountElem = document.getElementById('trip-count')
const tripTotalElem = document.getElementById('trip-total')
const futureTripButton = document.getElementById('futureTrips')

const trips = []
const tripsMetadata = {}
/**
 * Sort trips by their start date
 * @returns a comparator function for two dates
 */
function sortTrips () {
  return function (a, b) {
    const partsA = a.startDate.split('-')
    const partsB = b.startDate.split('-')
    const dateA = new Date(partsA[0], partsA[1] - 1, partsA[2])
    const dateB = new Date(partsB[0], partsB[1] - 1, partsB[2])
    if (dateA > dateB) {
      return -1
    } else if (dateA < dateB) {
      return 1
    }
    return 0
  }
}

/**
 * Return a subset of all trips
 * @param {Boolean} future if true return all future trips, otherwise return all present and past trips
 * @param {Array} allTrips all trips
 * @returns A subset of trips
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
 * Render trips onto the html
 * @param {*} page The page where the trips will be rendered on
 * @param {Boolean} future if true render future trips, otherwise render present and past trips
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

/**
 * A trip element
 * @param {Number} index index of the trip element in trips array
 * @param {Array} trips array containing all trips
 * @returns an html element that renders a trip
 */
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
 * Go to trip detail page
 * @param {*} body DOM body element
 */
function goToTripDetail (body) {
  const tripId = body.parentNode.id
  sessionStorage.setItem('past', true)
  window.open('./tripDetail.html?trip=' + encodeURIComponent(tripId), '_self')
}

/**
 *
 * @param {Number} index
 * @param {Array} trips
 */
const showTrips = (index, trips) => {
  const card = document.createElement('div')
  card.className = 'card'
  card.id = trips[index].id
  card.innerHTML = formTrip(index, trips)
  cardContainer.appendChild(card)
}

/**
 * Add trips to the page
 * @param {Number} pageIndex the page where the trips are to be added
 * @param {Array} trips array of trips
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
 * Function to handle the load more button
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
 * Render function for our landing page
 */
window.onload = function () {
  futureTripButton.addEventListener('click', () => {
    window.location.href = '../index.html'
  })
  loadAllTrips()
  loadMoreButton.addEventListener('click', () => {
    renderTrips(currentPage + 1, false)
  })
}

/**
 * Trigger the get all trips event
 */
function loadAllTrips () {
  window.postMessage({
    type: 'get all trips metadata'
  })
};

/**
 * Store the tripId for the trip to be deleted
 */
const storeTripID = (closeButton) => {
  document.getElementById('deleteModal').value = closeButton.parentNode.id
}

/**
 * Delete a trip
 */
function deleteTrip () {
  window.postMessage({
    type: 'delete trip metadata',
    id: document.getElementById('deleteModal').value
  })
}

/**
 * Function to trigger get trip detail event
 * @param {*} tripId
 */
function getTripDetails (tripId) {
  window.postMessage({
    type: 'get trip metadata',
    id: tripId
  })
}

/**
 * Event handler for an get all trip event
 * @param {*} event
 */
function handleGetAllTripsResponse (event) {
  const allTrips = event.data.trips
  for (const trip of allTrips) {
    trips.push(trip.id)
    tripsMetadata[trip.id] = trip
  }
  renderTrips(currentPage, false)
}

/**
 * Event handler for an update trip event
 * @param {*} event
 */
function handleUpdateTripResponse (event) {
  tripsMetadata[event.data.id] = event.data.values
  renderTrips(currentPage, false)
}

/**
 * Event handler for an delete trip event
 * @param {*} event
 */
function handleDeleteTripResponse (event) {
  delete tripsMetadata[event.data.id]
  const index = trips.indexOf(event.data.id)
  if (index > -1) {
    trips.splice(index, 1)
  }
  if (tripIncrease * (currentPage - 1) >= trips.length) {
    currentPage = Math.max(1, currentPage - 1)
  }
  renderTrips(currentPage, false)
  window.postMessage({
    type: 'delete trip data',
    id: event.data.id
  })
}

/**
 * Event listener for message passing
 */
self.addEventListener('message', function (event) {
  switch (event.data.type) {
    case 'get all trips metadata response':
      handleGetAllTripsResponse(event)
      break
    case 'update trip metadata response':
      handleUpdateTripResponse(event)
      break
    case 'delete trip metadata response':
      handleDeleteTripResponse(event)
      break
  }
})
