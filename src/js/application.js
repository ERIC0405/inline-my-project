(function() {
    function mytime() {
        var a = new Date();
        var b = a.toLocaleTimeString();
        var c = a.toLocaleDateString();
        document.getElementById("dateDiv").innerHTML = c + "&nbsp" + b;
    }
    mytime();
    setTimeout(function() {
        document.querySelector('#dialogbg').style.height = window.innerHeight + "px";
        document.querySelector('#dialogbg').style.display = "none";
    }, 1);
    setInterval(function() {
        mytime();
        updateWaitedMinutes();
    }, 1000);

    window.datafolder = new DataFolder();

})();

function dialogToggle() {
    var x = document.getElementById("dialogbg");
    if (x.style.display == "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function welcomeParticipant(e) {
	let name = document.querySelector('#inputName').value;
	let tel = document.querySelector('#inputTel').value;
	if (!name) {alert("Input your name, Please!");return;};
	if (!tel) {alert("Input your Telephone Number, Please!");return;};
    let participant = new Participant(datafolder.lineNow.length+datafolder.lineHis.length+1,name,tel);
    datafolder.lineIn(participant);
    document.querySelector("tbody").appendChild(participant.createDom());
    dialogToggle();
    resetDialogInput();
}

function announceNext(e)
{
	let tbodyDom = document.querySelector("tbody");
	let removedDom = tbodyDom.removeChild(tbodyDom.childNodes[0]);
	let removedParticipant = datafolder.lineOut();
	alert(`Welcome ${removedParticipant.pname}!${removedParticipant.timeWaited()}`);
}

function resetDialogInput()
{
	document.querySelector('#inputName').value=null;
	document.querySelector('#inputTel').value=null;
}

function updateWaitedMinutes()
{
	datafolder.lineNow.forEach(function(item){
	let td = document.querySelector('#num'+item.num);
	td.innerHTML = item.minutesWaited();
});
}