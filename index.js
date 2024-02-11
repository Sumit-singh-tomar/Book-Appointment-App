document.addEventListener("DOMContentLoaded", function () {
  var ul = document.querySelector('ul')
  axios.get("http://localhost:4000/user/get-all-user")
    .then((res) => {
      console.log('resss', res.data.data)
      ul.className = "showDetail"
      res.data.data.map((item) => {
        const li = document.createElement('li')
        li.textContent = `${item.username} - ${item.emailid} ${item.phone}`
        const button = document.createElement('button')
        const editButton = document.createElement('button')
        button.className = "deleteBtn"
        editButton.className = "editBtn"
        button.textContent = "delete"
        editButton.textContent = "Edit"
        button.id = item.id
        editButton.id = item.id
        editButton.name = item.emailid
        li.appendChild(button)
        li.appendChild(editButton)
        ul.appendChild(li)
      })
    }).catch((e) => console.log('error', e))
})



const form = document.querySelector("form")

form.addEventListener("submit", function (event) {
  event.preventDefault()
  var userDetail = {
    "username": event.target.username.value,
    "emailid": event.target.email.value,
    "phone": event.target.phone.value
  }

  axios.post("http://localhost:4000/user/add-user", userDetail)
    .then((res) =>{
      console.log('success', res)
      location.reload()
      
    }) 
    .catch((e) => console.log('error', e))

  let email = event.target.email.value
  localStorage.setItem(email, JSON.stringify(userDetail))

  // const ul = document.querySelector('ul')
  // ul.className = "showDetail"

  // const li = document.createElement('li')
  // li.textContent = `${event.target.username.value} - ${event.target.email.value} ${event.target.phone.value}`

  // const button = document.createElement('button')
  // const editButton = document.createElement('button')

  // button.className = "deleteBtn"
  // editButton.className = "editBtn"

  // button.textContent = "delete"
  // editButton.textContent = "Edit"

  // button.id = event.target.email.value
  // editButton.name = event.target.email.value

  // li.appendChild(button)
  // li.appendChild(editButton)
  // ul.appendChild(li)

  event.target.username.value = ''
  event.target.email.value = ''
  event.target.phone.value = ''

})

const showDetail = document.querySelector('ul');
showDetail.addEventListener('click', function (event) {

  if (event.target.classList.contains("deleteBtn")) {

    axios.delete(`http://localhost:4000/user/delete-user/${event.target.id}`)
      .then((res) => {
        let elementToRemove = event.target.parentElement;
        showDetail.removeChild(elementToRemove);
        alert('user delete successfully')
      }).catch((e) => {
        alert('failed')
      })
  }

  if (event.target.classList.contains("editBtn")) {
    let elementToRemove = event.target.parentElement;
    var userData = JSON.parse(localStorage.getItem(event.target.name))
    const username = document.getElementById('username')
    username.value = userData.username
    email.value = userData.emailid
    phone.value = userData.phone

    showDetail.removeChild(elementToRemove);
    localStorage.removeItem(userData.email);

    axios.delete(`http://localhost:4000/user/delete-user/${event.target.id}`)
      .then((res) => {
        console.log('user updated successfully')
      }).catch((e) => {
        console.log('eeeeeeeeee', e)
      })
  }
});