window.addEventListener("DOMContentLoaded", function () {
  var ul = document.querySelector('ul')
  axios.get("https://crudcrud.com/api/ce29ece0a2314de991e22b1cce600613/booking")
    .then((res) => {

      ul.className = "showDetail"
      res.data.map((item) => {
        const li = document.createElement('li')
        li.textContent = `${item.username} - ${item.email} ${item.phone}`
        const button = document.createElement('button')
        const editButton = document.createElement('button')
        button.className = "deleteBtn"
        editButton.className = "editBtn"
        button.textContent = "delete"
        editButton.textContent = "Edit"
        button.id = item._id
        editButton.id = item._id
        editButton.name = item.email
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
    "email": event.target.email.value,
    "phone": event.target.phone.value
  }

  axios.post("https://crudcrud.com/api/ce29ece0a2314de991e22b1cce600613/booking", userDetail)
    .then((res) => console.log('success', res))
    .catch((e) => console.log('error', e))

  let email = event.target.email.value
  localStorage.setItem(email,JSON.stringify(userDetail))

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
    let elementToRemove = event.target.parentElement;
    showDetail.removeChild(elementToRemove);
    
    axios.delete(`https://crudcrud.com/api/ce29ece0a2314de991e22b1cce600613/booking/${event.target.id}`)
      .then((res)=>{
        alert('user delete successfully')
      }).catch((e)=>{
        alert('failed')
        console.log('eeeeeeeeee',e)
      })

  }

  if (event.target.classList.contains("editBtn")) {
    let elementToRemove = event.target.parentElement;
    console.log(elementToRemove)
    var userData = JSON.parse(localStorage.getItem(event.target.name))
    const username = document.getElementById('username')
    username.value = userData.username
    email.value = userData.email
    phone.value = userData.phone
    console.log('userdata',userData)

    showDetail.removeChild(elementToRemove);
    localStorage.removeItem(userData.email);

    axios.delete(`https://crudcrud.com/api/ce29ece0a2314de991e22b1cce600613/booking/${event.target.id}`)
      .then((res)=>{
      console.log('user updated successfully')
    }).catch((e)=>{
      console.log('eeeeeeeeee',e)
    })
  }
});