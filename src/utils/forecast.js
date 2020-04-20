const request = require('request')
const url = require('url')


const forecast = (latitude,longitude,location,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=33b48dfc0478e7aaf746d781fe48e056&query=' + encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'&units=m'
    request({url,json:true} , (error,response) => {
        if(error){
            callback('unable to connect to location services',undefined)
        } else if (response.body.error){
            callback('unable to find location . Try another location' , undefined)
        } else {
            //console.log("tryit",response.body.location.country)
            callback(undefined,'It is currently ' + response.body.current.temperature +' degrees out. It feels like ' + response.body.current.feelslike + ' degrees out.'
            )
        }
    })
}
module.exports = forecast