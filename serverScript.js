const data = [];

const getData = (filepath) => {
    let request = new XMLHttpRequest();
    request.open("GET", filepath);
    request.responseType = 'json';
    request.send();
    request.onload = () => {
        for (let i = 0; i < request.response.length; i++) {
            data.push(request.response[i]);
        }
        for (let i = 0; i < data.length; i++) {
            if (data[i].nodetype === "dir") {
                for (let j = 0; j < data.length; j++) {
                    if (i !== j && data[j].nodetype !== "dir") {
                        [data[i], data[j]] = [data[j], data[i]];
                        break; 
                    }
                }
            }
        }
        let output = "<ul>";
        for(let i=0; i<data.length; i++){
            output += `<li>Nodetype: ${data[i].nodetype}, nodename: ${data[i].nodename}, date/time: ${data[i].datetime}`
        }
        output += "</ul>"
        document.getElementById("json-output").innerHTML = output;
    };
    console.log(data);
}


const submit = () => {
    let form = [];
    form.push(document.getElementById("text").value);
    if(document.getElementById("radio1").checked){
        form.push(document.getElementById("radio1").value);
    }
    if(document.getElementById("radio2").checked){
        form.push(document.getElementById("radio2").value);
    }
    if(document.getElementById("radio3").checked){
        form.push(document.getElementById("radio3").value);
    }
    form.push(document.getElementById("checkbox1").checked);
    form.push(document.getElementById("file").value);
    let selector = document.getElementById("select");
    form.push(selector[selector.selectedIndex].value);
    let request;
    if(window.XMLHttpRequest)
    {
        request = new XMLHttpRequest;
    } else if (window.ActiveXObject){
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if(request !== undefined){
        try{
            request.open("POST", "output.json", false);
        } catch{
            alert("Something went wrong :(");
        }
        request.send(form);
    }
    alert("submitted");
}
getData("data.json");