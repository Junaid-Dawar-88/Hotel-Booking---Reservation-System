export async function apiHelper(url, method = "GET", body) {
  const options = {
    method,
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("API request failed");
  }

  return response.json();
}

export async function userId() {
  let selectUserId = document.querySelector("#selectUserId");
  let getRoomNumber = await fetch("/api/user");
  let getNumber = await getRoomNumber.json();

  getNumber.forEach((num) => {
    let option = document.createElement("option");
    option.value = num.id;
    option.text = `${num.id}: ${num.name} `;
    selectUserId.appendChild(option);
  });
}

export async function roomId() {
  let selectRoomId = document.querySelector("#selectRoomId");
  let getRoomNumber = await fetch("/api/room");
  let getNumber = await getRoomNumber.json();

  getNumber.forEach((num) => {
    let option = document.createElement("option");
    option.value = num.id;
    option.text = `room id: ${num.id}`;
    selectRoomId.appendChild(option);
  });
}
userId();
  roomId();
// booking room 

export async function boookingRoom() {
 const selectUserId = document.querySelector('#selectUserId').value
const selectRoomId = document.querySelector('#selectRoomId').value
const bookingInDate = document.querySelector('#bookingInDate').value
const bookingOutDate = document.querySelector('#bookingOutDate').value
if (!selectUserId || !selectRoomId || !bookingInDate || !bookingOutDate) {
  alert("Please fill all fields")
  return
}

if (isNaN(selectUserId) || isNaN(selectRoomId)) {
  alert("Invalid User or Room ID")
  return
}

if (new Date(bookingInDate) >= new Date(bookingOutDate)) {
  alert("Booking OUT date must be after booking IN date")
  return
}

let bookingObj = {
  bookingDate: bookingInDate,
  bookingOutDate: bookingOutDate,
  userId: Number(selectUserId),
  roomId: Number(selectRoomId)
}

let newBooking = await apiHelper('/api/booking', 'POST', bookingObj)


  addBookingCard(newBooking)

  document.querySelector('#selectUserId').value = ''
  document.querySelector('#selectRoomId').value = ''
  document.querySelector('#bookingInDate').value = ''
  document.querySelector('#bookingOutDate').value = ''
}

function addBookingCard(b) {
  let parentBox = document.querySelector('.peretnBox')
  let cardBox = document.createElement('div')
  cardBox.className = 'cardBox w-[300px]'

  cardBox.innerHTML = `
    <div class="bg-white rounded-lg shadow hover:-translate-y-1 transition relative">
      <div class="h-48 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=600&q=80"
          alt="Room" class="w-full h-full object-cover hover:scale-105 transition">
      </div>

      <div class="p-5">
        <h3 class="text-orange-500 font-semibold mb-2">Room</h3>
        <p class="text-sm text-gray-600 mb-3">Booking Info</p>
        <div class="bookingInfo flex flex-wrap gap-3 text-gray-500 text-sm mb-4">
          <span>UserId: ${b.userId}</span>
          <span>RoomId: ${b.roomId}</span>
          <span>In: ${b.bookingDate}</span>
          <span>Out: ${b.bookingOutDate}</span>
        </div>
        <div class="flex gap-4">
          <button class="editButton text-blue-500 hover:text-blue-700">Edit</button>
          <button class="deleteButton text-red-500 hover:text-red-700">Delete</button>
        </div>
      </div>
    </div>
  `
  parentBox.appendChild(cardBox)

  // Delete
  cardBox.querySelector('.deleteButton').addEventListener('click', async () => {
    await apiHelper(`/api/booking`, 'DELETE', { id: b.id })
    cardBox.remove()
  })

  // Edit
  cardBox.querySelector('.editButton').addEventListener('click', () => {
    openEditModal(b, cardBox)
  })
}






function addBookingCard(b) {
  let parentBox = document.querySelector('.peretnBox')
  let cardBox = document.createElement('div')
  cardBox.className = 'cardBox w-[300px]'

  cardBox.innerHTML = `
    <div class="bg-white rounded-lg shadow hover:-translate-y-1 transition relative">
      <div class="h-48 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=600&q=80"
          alt="Room" class="w-full h-full object-cover hover:scale-105 transition">
      </div>

      <div class="p-5">
        <h3 class="text-orange-500 font-semibold mb-2">Room</h3>
        <p class="text-sm text-gray-600 mb-3">Booking Info</p>
        <div class="bookingInfo flex flex-wrap gap-3 text-gray-500 text-sm mb-4">
          <span>UserId: ${b.userId}</span>
          <span>RoomId: ${b.roomId}</span>
          <span>In: ${b.bookingDate}</span>
          <span>Out: ${b.bookingOutDate}</span>
        </div>
        <div class="flex gap-4">
          <button class="editButton text-blue-500 hover:text-blue-700">Edit</button>
          <button class="deleteButton text-red-500 hover:text-red-700">Delete</button>
        </div>
      </div>
    </div>
  `
  parentBox.appendChild(cardBox)

 
  cardBox.querySelector('.deleteButton').addEventListener('click', async () => {
    await apiHelper(`/api/booking`, 'DELETE', { id: b.id })
    cardBox.remove()
  })
  cardBox.querySelector('.editButton').addEventListener('click', () => {
    openEditModal(b, cardBox)
  })
}

// ---- Modal Function ----
function openEditModal(b, cardBox) {
  let modal = document.createElement('div')
  modal.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  modal.innerHTML = `
    <div class="bg-white p-6 rounded-lg w-[400px] relative">
      <h2 class="text-lg font-semibold mb-4">Edit Booking Dates</h2>
      <form class="space-y-3">
        <input type="date" name="bookingDate" value="${b.bookingDate}" class="w-full border p-2 rounded" />
        <input type="date" name="bookingOutDate" value="${b.bookingOutDate}" class="w-full border p-2 rounded" />
        <div class="flex justify-end gap-3 mt-4">
          <button type="button" class="closeBtn px-3 py-1 bg-gray-300 rounded">Cancel</button>
          <button type="submit" class="submitBtn px-3 py-1 bg-blue-500 text-white rounded">Submit Changes</button>
        </div>
      </form>
    </div>
  `
  document.body.appendChild(modal)

  modal.querySelector('.closeBtn').addEventListener('click', () => {
    modal.remove()
  })

  modal.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault()

    let formData = new FormData(e.target)
    let updatedBooking = {
      id: b.id,
      bookingDate: formData.get("bookingDate"),
      bookingOutDate: formData.get("bookingOutDate"),
    }

    await apiHelper(`/api/booking`, 'PUT', updatedBooking)

    let bookingInfo = cardBox.querySelector('.bookingInfo')
    bookingInfo.innerHTML = `
      <span>UserId: ${b.userId}</span>
      <span>RoomId: ${b.roomId}</span>
      <span>In: ${updatedBooking.bookingDate}</span>
      <span>Out: ${updatedBooking.bookingOutDate}</span>
    `

    modal.remove()
  })
}







async function loadBookings() {
  let bookings = await apiHelper('/api/booking', 'GET')
  let parentBox = document.querySelector('.peretnBox')
  parentBox.innerHTML = ''

  bookings.forEach(b => {
    addBookingCard(b)
  })
}
 window.addEventListener('DOMContentLoaded', loadBookings)

  let bookCrossButton = document.querySelector('.bookCrossButton ')
  let bookingButton = document.querySelector('#bookingButton')

   bookingButton.addEventListener('click', () => {
    document.querySelector('.addBookingForm').classList.remove('hidden')
   })
   function hiddBookingForm() {
    document.querySelector('.addBookingForm').classList.add('hidden')
   }
   bookCrossButton.addEventListener('click', () => {
    hiddBookingForm()
   })

let BookingSubmit = document.querySelector('#BookingSubmit')
BookingSubmit.addEventListener('click' , () => {
  boookingRoom()
  hiddBookingForm()
})
// user datail 
export async function createUserData() {
  let userName = document.querySelector("#name");
  let userEmail = document.querySelector("#email");
  let userPhone = document.querySelector("#phone");

  let userData = {
    name: userName.value,
    email: userEmail.value,
    phone: userPhone.value,
  };
  userId();
  roomId();
  return apiHelper('/api/user', 'POST', userData);
}

const addUserForm = document.querySelector(".addUserForm");
let addUser = document.querySelector("#addUser");
let crossButton = document.querySelector(".crossButton");
//    SUBMIT BUTTON
const userSubmit = document.querySelector("#userSubmit");
userSubmit.addEventListener("click", () => {
  createUserData();
  addUserForm.classList.add("hidden");
});

//  FORM TOGGLE BUTTON
addUser.addEventListener("click", () => {
  addUserForm.classList.remove("hidden");
});
function hideRoomForm() {
    addUserForm.classList.add("hidden");
}
crossButton.addEventListener("click", () => {
 hideRoomForm() 
});
//  ROOM CODING

let addRoomForm = document.querySelector(".addRoomForm");
let roomCrossButton = document.querySelector(".roomCrossButton");
let roomButton = document.querySelector(".roomButton");

roomCrossButton.addEventListener("click", () => {
  addRoomForm.classList.add("hidden");
});
roomButton.addEventListener("click", () => {
  addRoomForm.classList.remove("hidden");
});

export async function addRoom() {

  let roomNumber = document.querySelector("#roomNumber").value;
  let roomType = document.querySelector("#room-type");

  let roomObj = {
    number: roomNumber,
    type: roomType.options[roomType.selectedIndex].text,
  };

  console.log(roomObj);
  return apiHelper("/api/room", "POST", roomObj);
}

const roomSubmit = document.querySelector("#roomSubmit");
roomSubmit.addEventListener("click", (e) => {
    e.preventDefault()
    addRoom() 
   addRoomForm.classList.add('hidden')
});

