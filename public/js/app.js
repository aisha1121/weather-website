const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#p1')
const message2 = document.querySelector('#p2')


weatherform.addEventListener('submit' , (e) => {
    e.preventDefault()
    message1.textContent = 'Loading'
    message2.textContent = ''
    const location1 = search.value
    fetch('/weather?address='+encodeURIComponent(location1)).then((response) => {
        response.json().then( (data) => {
            if(data.error) {
                message1.textContent = data.error
            } else {
                message1.textContent = data.location
                message2.textContent = data.forecast
            }
        }

        )
    }
)
})
