var cameraOpts;

window.onload = function(){
    document.addEventListener('deviceready', init, false);
}
function init()
{
    var btnCam = document.getElementById('btnCam');
    btnCam.style.display="block";
    cameraOpts = 
        {quality: 40,
        destinationType: Camera.destinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: false,
        encodingType: Camera.EncodingType.JPEG, 
        saveToPhotoAlbum: true};
}
function takePic(){
    navigator.camera.getPicture(CameraSuccess, cameraFail, cameraOpts);
}
function cameraFail(msg)
{
    alert("Error: "+ msg);
}
function cameraSuccess(imageData)
{
    var result = document.getElementById("resultImg");
    result.src = imageData;
}