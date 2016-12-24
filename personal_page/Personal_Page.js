/**
 * Created by vanessamnoble on 12/20/16.
 */

//Sticky Navbar
// window.onscroll = function() {sticky_nav()};
// function sticky_nav() {
//     if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50)
//     {
//         document.getElementById("nav").className = 'sticky';
//     } else {   document.getElementById("nav").className = '';}
// }


function validateForm() {
    var x = document.forms["form"]["name"].value;
    var y = document.forms["form"]["message"].value;
    if ((x == null || x == "")&&(y == null || y == "")){
        document.getElementById('messages').innerHTML = "Please enter a name and a message";
        return false;
    } else if (y == null || y == "") {
        document.getElementById('messages').innerHTML = "Please enter a message";
        return false;
    } else if (x == null || x == "") {
        document.getElementById('messages').innerHTML = "Please enter a name";
        return false;
    } else {
        alert ("Thank You!");
    }
}


// div slider
$( document ).ready(function() {
    $( '#my-slider' ).sliderPro();
});
$( document ).ready(function() {
        $( '#example1' ).sliderPro({
        width: 960,
        height: 500,
        responsive: true,
        arrows: true,
        buttons: false,
        waitForLayers: true,
        thumbnailWidth: 200,
        thumbnailHeight: 100,
        thumbnailPointer: true,
        autoplay: false,
        autoScaleLayers: true,
        breakpoints: {
            500: {
                thumbnailWidth: 120,
                thumbnailHeight: 50
            }
        }
    });
}); //end div slider

