document.body.onmousedown = function () { 
    return false; 
}
var elem = document.getElementById('elemId');
elem.onselectstart = function () {
    return false;
};