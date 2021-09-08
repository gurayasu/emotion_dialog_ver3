
let value = 1;
let sum = '';

//受信で使う変数
let v = '';
let k_data = '';

let botResponse = '';
let botHtml = '';

let userText ='';
let userHtml = '';

//ハートアイコンの回数を入れる変数
let icon_num = '';

var coll = document.getElementsByClassName('collapsible');


// 受信処理
newPostRef.on("child_added", function (data) {
    v = data.val();
    console.log(v);
    k_data = data.key;
    console.log(k_data);
    icon_num = v.icon;
    console.log(icon_num);


    if(!(v.anger_comment)){
        v.anger_comment = '（怒りコメントなし）';
    }
    if(!(v.sad_comment)){
        v.sad_comment = '（悲しみコメントなし）';
    }
    if(!(v.hard_comment)){
        v.hard_comment = '（辛さコメントなし）';
    }
    if(!(v.happy_comment)){
        v.happy_comment = '（喜びコメントなし）';
    }
    if(!(v.fun_comment)){
        v.fun_comment = '（楽しいコメントなし）';
    }

    // //$("#chat-timestamp-past").append(v.time_stamp);
    botHtml = `<p class="botText-past"><span>日付：${v.date}<br>
    期間：${v.period}<br>怒り：${v.anger_num}回<br>悲しい：${v.sad_num}回<br>
    辛い：${v.hard_num}回<br>嬉しい：${v.happy_num}回<br>楽しい：${v.fun_num}回<br>
    コメント：${v.anger_comment} ${v.sad_comment} ${v.hard_comment} ${v.happy_comment} ${v.fun_comment}</span></p>`;
    $("#chatbox-past").append(botHtml);

});


for (let i =0; i < coll.length; i++){
    coll[i].addEventListener('click',function(){
        this.classList.toggle("active");

        var content = this.nextElementSibling;

        if(content.style.maxHeight){
            content.style.maxHeight =null;
        }else{
            content.style.maxHeight = content.scrollHeight + 'px';
        }

        setTimeout(()=>{
            firstBotMessage();
        },1000)

    });
}

function getTime(){

    let today = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();

    if(hours < 10){
        hours = `0${hours}`;
    }
    if(minutes < 10){
        minutes = `0${minutes}`;
    }
    let time = `${hours}:${minutes}`;
    return time;

}

//最初のメッセージ
function firstBotMessage() {
    let firstMessage = "最新の感情日記を共有しますか？\n(YES / NO)";
    document.getElementById('botstarterMessage').innerHTML = `<p class = "botText"><span>${firstMessage}</span></p>`;

    let time = getTime();
    $("#chat-timestamp").append(time);
    document.getElementById("userInput").scrollIntoView(false);

}

//firstBotMessage();
// 結果共有するかの質問に回答した後のアクション
function emotion_result(userText) {

    icon_num = v.icon;
    console.log(icon_num);

    if (userText === 'YES'){

        newPostRef.push({
            date:dt_login_full,
            period:period_text,
            anger_num:anger__sum,
            sad_num:sad__sum,
            hard_num:hard__sum,
            happy_num:happy__sum,
            fun_num:fun__sum,
            anger_comment:anger__memo,
            sad_comment:sad__memo,
            hard_comment:hard__memo,
            happy_comment:happy__memo,
            fun_comment:fun__memo,
            icon:icon_num
        })

        botResponse = '結果をChatで送ります😊';
        let botHtml = '<p class="botText"><span>' + botResponse + '</span></p>';
        $("#chatbox").append(botHtml);

        botHtml = `<p class="botText"><span>日付：${v.date}<br>
        期間：${v.period}<br>怒り：${v.anger_num}回<br>悲しい：${v.sad_num}回<br>
        辛い：${v.hard_num}回<br>嬉しい：${v.happy_num}回<br>楽しい：${v.fun_num}回<br>
        コメント：${v.anger_comment} ${v.sad_comment} ${v.hard_comment} ${v.happy_comment} ${v.fun_comment}</span></p>`;
        $("#chatbox").append(botHtml);

    } else if (userText === 'NO'){
        botResponse = '了解です！結果共有は無しですね😉';
        let botHtml = '<p class="botText"><span>' + botResponse + '</span></p>';
        $("#chatbox").append(botHtml);
    } else {
        firstBotMessage();
        return;
    }

    document.getElementById("chat-bar-bottom").scrollIntoView(true);

    setTimeout(()=>{
        secondBotMessage();
    },2000)
}

function secondBotMessage() {
    botResponse = "最近調子はどう？🙃";
    let botHtml = '<p class="botText"><span>' + botResponse + '</span></p>';
    $("#chatbox").append(botHtml);

    document.getElementById("userInput").scrollIntoView(false);
}

//Enterおすとここにくる
function getResponse() {
    let userText = $("#textInput").val();


    if (userText == "") {
        userText = "可もなく不可もなく😉";
        let userHtml = '<p class="userText"><span>' + userText + '</span></p>';

        $("#textInput").val("");
        $("#chatbox").append(userHtml);

        botResponse = "何かあったら相談してね😊";
        let botHtml = '<p class="botText"><span>' + botResponse + '</span></p>';
        $("#chatbox").append(botHtml);
        document.getElementById("chat-bar-bottom").scrollIntoView(true);

        return;
    }

    let userHtml = '<p class="userText"><span>' + userText + '</span></p>';

    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);

    if (userText == "YES" || userText == "NO") {
        emotion_result(userText);
        return;
    }

    setTimeout(() => {
        getHardResponse(userText);
    }, 1000)

    }

    //getresponseからのつながり、Chat関数を呼び出してChatする、その後Chat処理
    function getHardResponse(userText) {
        let botResponse = getBotResponse(userText);
        let botHtml = '<p class="botText"><span>' + botResponse + '</span></p>';
        $("#chatbox").append(botHtml);
    
        document.getElementById("chat-bar-bottom").scrollIntoView(true);
    }

    //ハートボタン押されて動く処理
    function buttonSendText(sampleText) {

    icon_num = icon_num + 1;

    let userHtml = '<p class="userText"><span>' + sampleText + '</span></p>';

    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);

    if (icon_num % 2 === 0){
    botResponse = "いいね！今日も素敵な1日を！😆";
    let botHtml = '<p class="botText"><span>' + botResponse + '</span></p>';
    $("#chatbox").append(botHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);
    } else {
    botResponse = "You looks happy！😁";
    let botHtml = '<p class="botText"><span>' + botResponse + '</span></p>';
    $("#chatbox").append(botHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);
    }

    return;

    setTimeout(() => {
        getHardResponse(userText);
    }, 1000)

    }

    function sendButton() {
        getResponse();
    }
    
    //ハートスタンプ押した処理
    function heartButton() {
        buttonSendText("調子いいよ!😉")
    }
    
    // Enter押すと動く処理
    $("#textInput").keypress(function (e) {
        if (e.which == 13) {
            getResponse();
        }
    });

    //Chatにユーザーが文字を入力した際に反応する関数
    function getBotResponse(input) {
    
        if (input == "おつかれ") {
            return "おつかれさま！!";
        } else if (input == "疲れた") {
            return "無理しないでねಠ_ಠ";
        } else if (input == "おやすみ") {
            return "Good night😴";
        } else {
            return "I'mhappy if you give me other comments!";
        }

    }
