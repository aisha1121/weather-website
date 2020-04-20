const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')

const pathname = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../template/views')               //for customising views directory
const partialpath = path.join(__dirname,'../template/partials')
 const app = express()

 app.set('view engine', 'hbs')   // we set the template we want to use
 app.set('views',viewsPath)
 hbs.registerPartials(partialpath)
 app.use(express.static(pathname))

 app.get('', (req,res) => {
     res.render('index',{
         title:"Weather",
         name:"Aayusha"
     })
 })

 app.get('/help', (req,res) => {
    res.render('help',{
        title:'Help',
        name:'Aayusha',
        message:"This is a help page!!"
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title:'About me',
        name:'Aayusha'
        
    })
})

app.get('/weather' , ( req,res ) => {
    if(!req.query.address){
       return  res.send({
            error: "enter a valid location"
        })
    } else {
        geocode(req.query.address,(error,{latitude,longitude,location} = {}) => {
            if(error){
                return res.send({
                    error
                })
            }
            forecast(latitude,longitude,location,(error,forecastresponse) => {
                if(error){
                    return res.send({
                        error:error
                    })
                }
                var countrynameArray = location.split(', ');
                var countryname = countrynameArray[countrynameArray.length-1];
                //console.log("coyhgf",countryname);
                
                res.send({
                    forecast: forecastresponse,
                    address:req.query.address,
                    location:location
                })
            })
       })

    }}
)



app.get('/products' , ( req,res ) => {
    if(!req.query.search){
       return  res.send({
            error: "enter a avalid search"
        })
    }
    console.log(req.query.search)
    res.send({
        products:[req.query.search]
    })
})
 
app.get('/help/*', (req,res) => {
    res.render('404',{
        title:'404 page!',
        message: 'Help article not found!',
        name:'Aayusha'
    })
 })

 app.get('*', (req,res) => {
    res.render('404',{
        title:'404 page!',
        message: 'Page not found!',
        name:'Aayusha'
    }) })



 app.listen(3000, () => {
     console.log('server is on!')
 })