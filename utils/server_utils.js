const Pageres = require('pageres')
const videoshow = require('videoshow')
const path = require('path');
const fs = require('fs')
const image_resulotion = '1920x1080'
const website_videos_dirs = '/web_videos'
const dir_path = path.join(__dirname,website_videos_dirs)
const videoOptions = {
    loop:10,
    fps: 24,
    transition: false,
    videoBitrate: 1024 ,
    videoCodec: 'libx264',
    size: '1920x1080',
    outputOptions: ['-pix_fmt yuv420p'],
    format: 'mp4'
}



const takePicture = async (url)=>{
    const file_name = (new URL(url).hostname).split(".")[1]
    await new Pageres()
        .src(url, [image_resulotion],{filename: file_name})
        .dest(dir_path)
        .run().catch((e)=>{return e});
    return path.join(dir_path,file_name)
}


const makeVideo =  (url, image_path) => {
    const image = [{
        path: image_path + '.png'
    }]
    const vid_location = image_path + ".mp4"
    videoshow(image, videoOptions).save(vid_location).on('start', function (command) {
        console.log('conversion start' + command)
    })
        .on('error', function (err, stdout, stderr) {
            console.log(err)
        })
        .on('end', function (output) {
            fs.unlink(image_path+'.png',(err,data)=>{
                console.log('image_deleted')
            })
            console.log("ended")
        })

    return {file: vid_location}

}

module.exports = {takePicture : takePicture, makeVideo:makeVideo}