const request = require('request')
const url = require('url')


const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYWF5dXNoYSIsImEiOiJjazh5OGNqdDAwMno4M2RsYzFybWxydmwzIn0.-crJ0g_F4zXq_qWRL6Sk2g&limit=1'
    request({
        url,
        json:true
    } , (error,response) => {
        if(error){
            callback('unable to connect to location services',undefined)
        } else if (response.body.features.length === 0){
            callback('unable to find location . Try another location' , undefined)
        } else {
            // console.log("latitude",response.body.features[0].center[1]);
            // console.log("loonngigitude",response.body.features[0].center[0]);
            // console.log("location",response.body.features[0].place_name);
                callback(undefined,{
                 latitude : response.body.features[0].center[1],
                 longitude : response.body.features[0].center[0],
                 location : response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode