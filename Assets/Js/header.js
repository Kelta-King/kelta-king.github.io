window.onscroll = function(event) {
    if(window.scrollY >= window.innerHeight) {
        document.getElementById("navBar").classList.add("sticky");
    }
    else {
        document.getElementById("navBar").classList.remove("sticky");
    }
}