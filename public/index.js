window.onload = ()=>{
    const url = document.getElementById('url_input')
    const url_form = document.getElementById('url_form')
    url_form.addEventListener('submit',(e)=>{
        e.preventDefault()
        const url_val = url.value
        const http = new XMLHttpRequest()
        http.open('POST','/make_video',true)
        http.setRequestHeader('Content-Type', 'application/json');
        http.send(JSON.stringify({
            url:url_val
        }));
        http.onreadystatechange = function() {
            if (http.readyState === 4)  {
                http.serverResponse = http.responseText;
                const message = "you can find the video on "  + JSON.parse(http.serverResponse).file
                alert(message)
                url.value = ""
            }
        };

    })
}
