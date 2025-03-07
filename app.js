var time;
function startTime() {
    var today = new Date();
    var hr = today.getHours();
    var min = today.getMinutes();
    var sec = today.getSeconds();
    ap = (hr < 12) ? "<span>AM</span>" : "<span>PM</span>";
    hr = (hr == 0) ? 12 : hr;
    hr = (hr > 12) ? hr - 12 : hr;
    hr = checkTime(hr);
    min = checkTime(min);
    sec = checkTime(sec);
    document.getElementById("clock").innerHTML = hr + ":" + min + ":" + sec + " " + ap;
    
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var curWeekDay = days[today.getDay()];
    var curDay = today.getDate();
    var curMonth = months[today.getMonth()];
    var curYear = today.getFullYear();
    var date = curWeekDay+", "+curDay+" "+curMonth+" "+curYear;
    document.getElementById("date").innerHTML = date;
    
    time = setTimeout(function(){ startTime() }, 500);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
document.addEventListener("DOMContentLoaded", function () {
    let lockScreen = document.getElementById("lockpage");
    let content = document.getElementById("content-pass");
    let startY = 0;

    document.addEventListener("touchstart", function (event) {
        startY = event.touches[0].clientY;
    }, { passive: true });

    document.addEventListener("touchend", function (event) {
        let endY = event.changedTouches[0].clientY;
        let deltaY = startY - endY;

        if (deltaY > 50) { 
            lockScreen.style.transform = "translateY(-100%)";
            setTimeout(() => {
                lockScreen.remove();
                clearTimeout(time); 
                content.style.display = "flex";
                content.style.justifyContent = "center";
                content.style.alignItems = "center";
                content.style.height = "100vh";
                document.body.style.setProperty("backdrop-filter", "blur(10px)");
                document.body.style.setProperty("-webkit-backdrop-filter", "blur(10px)"); 
            }, 500);
        }
    });
});
let inputCode = "";
let failCount = 0;
const correctCode = "0812";

function addNumber(num) {
    if (inputCode.length < 4) {
        inputCode += num;
        updateDots();
    }
    if (inputCode.length === 4) {
        checkNumber();
    }
}

function updateDots() {
    for (let i = 0; i < 4; i++) {
        document.getElementById(`dot${i + 1}`).classList.toggle("filled", i < inputCode.length);
    }
}

function clearInput() {
    inputCode = "";
    updateDots();
}

function deleteLast() {
    inputCode = inputCode.slice(0, -1);
    updateDots();
}

function checkNumber() {
    let modalMessage = document.getElementById("modalMessage");

    if (inputCode === correctCode) {
        modalMessage.textContent = "true";
        modalMessage.style.color = "green";
        failCount = 0;
        document.getElementById("content-pass").remove();
        document.getElementById("myModal").remove();
        document.body.style.setProperty("backdrop-filter", "blur(5px)");
        document.body.style.setProperty("-webkit-backdrop-filter", "blur(5px)"); 
        document.body.style.background = "url(/image/6.jpg) no-repeat center / cover "; 
        document.getElementById("content").style.display= "block";

        function createHeart() {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.innerHTML = '❤️';
            
            heart.style.left = Math.random() * 100 + 'vw';
            
            heart.style.animationDuration = (Math.random() * 2 + 6) + 's';

            const randomSize = Math.floor(Math.random() * 51) + 10; // 10 đến 50
            heart.style.fontSize = randomSize + 'px';

            document.body.appendChild(heart);
            setTimeout(() => {
                heart.remove();
            }, 10000);
        }
        setInterval(createHeart, 800);
        for(let i = 0; i < 5; i++) {
            createHeart();
        }
        function updateTime() {
            const startDate = new Date("2024-12-08T20:30:00"); 
            const now = new Date();
            const diff = now - startDate; 

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            document.getElementById("timeCounter").innerHTML = 
                `${days}d ${hours}h`;
        }

        setInterval(updateTime, 1000); 
        updateTime(); 

    } else {
        failCount++;
        if (failCount === 1) {
            modalMessage.textContent = "Gợi ý là một ngày";
        } else if (failCount === 2) {
            modalMessage.textContent = "Một ngày kỉ niệm đôi ta";
        } else if (failCount === 3) {
            modalMessage.textContent = "Đã gợi ý vậy mà ko đoán ra thì cũng chịu";
        }else if (failCount === 4) {
            modalMessage.textContent = "Đã sai quá 3 lần rùi nếu sai 5 lần sẽ khóa lại đóa";
        }else if (failCount === 5) {
            modalMessage.textContent = "Như mà anh hông nỡ khóa lại nơi";
        }else if (failCount === 6) {
            modalMessage.textContent = "Pass là ngày chúng ta là chính thức của nhau";
            failCount = 0;
        }
        modalMessage.style.color = "red";
    }

    document.getElementById("myModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
    clearInput();
}