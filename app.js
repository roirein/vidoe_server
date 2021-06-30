const server_utils = require('./utils/server_utils')
const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const path = require('path')
const pubDirectory = path.join(__dirname,'/public')
const valid_url = require('valid-url')
app.use(express.json())
app.use(express.static(pubDirectory))


app.post('/make_video', async (req,res)=>{
    const url = req.body.url
    if (!valid_url.is_uri(url)){
        res.status(400).send('invalid url')
    }
    const web_image = await server_utils.takePicture(url)
    const web_video = server_utils.makeVideo(url,web_image)
    res.status(201).send(web_video)
})




app.listen(port,()=>{
    console.log('Server Started on Port ' + port)
})