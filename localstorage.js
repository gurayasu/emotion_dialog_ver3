//Firebase


// Your web app's Firebase configuration
var firebaseConfig = {
apiKey: "",
authDomain: "dev21chat-8c459.firebaseapp.com",
databaseURL: "https://dev21chat-8c459-default-rtdb.firebaseio.com/",
projectId: "dev21chat-8c459",
storageBucket: "dev21chat-8c459.appspot.com",
messagingSenderId: "286677809656",
appId: "1:286677809656:web:94f29eb233abeffe763e0d"
};
// Initialize Firebases
firebase.initializeApp(firebaseConfig);

//firebaseのデーターベース（保存させる場所）を使いますよ
const newPostRef = firebase.database().ref();

//（初期）変数定義
//localStorage.clear();

//（初期）日付の変数
let today = new Date();
today = today.toDateString();
let key = '';

let dt_login = new Date();
let dt_yesterday = '';

let dt_login_year = dt_login.getFullYear();
let dt_login_month = dt_login.getMonth()+1;
let dt_login_date = dt_login.getDate();

let dt_login_full = `${dt_login_year}年${dt_login_month}月${dt_login_date}日`;

let dt_original = new Date();
let dt_updated = '';
let dt_updated_past = '';
let k = 0;
let login_num = 0;
let num = 1;

//PW画面

window.onload = function unlock(){
    //$('body').attr({'style':'visibility:visible!important;'});

    const user_pw = prompt('Please input password.(code)');
    const fixed_pw = 'code';

    if(user_pw === false || user_pw === null){
        alert('Please please input password.(code)');
        unlock();
    } else {
        if(user_pw === fixed_pw){
            alert('Passed.');
            $('body').attr({'style':'visibility:visible!important;'});

            dt_updated =dt_original.toDateString();
            localStorage.setItem(dt_updated,1);

            dt_login.setDate(dt_login.getDate()-1);
            dt_yesterday = dt_login.toDateString();

            if(!(localStorage.getItem(dt_yesterday) === null)){
            for(let num = 0; num < localStorage.length; num++){

                //if文で連続の日にちだったらの条件分岐を入れる
                //連続だったら日数カウントして、そうでなければカウントしないようにする
                dt_original.setDate(dt_original.getDate()-num);
                dt_updated_past = dt_original.toDateString();
                if(!(localStorage.getItem(dt_updated_past) === null)){
                k = localStorage.getItem(dt_updated_past);
                k = Number(k);
                login_num = login_num + k;
                dt_original = new Date();
                console.log(dt_updated_past);
                }
            } 
            console.log(k);
            console.log(localStorage.length);
            console.log(login_num);
            alert(`${login_num}日連続ログインです！\n${dt_login_full}の感情を記録しましょう`);
            } else {
                alert(`連続ログイン1日目です！\n${dt_login_full}の感情を記録しましょう`);
                //（今日の日付）の感情を記録しよう！とメッセージ出したい
            }

        }else{
            alert('Try again.');
            unlock();
        }
    }

    }


//（初期）DBのKeyセット, setItemは初回のみ必要
let anger = '';
//localStorage.setItem(`anger${today}`,0);

let sad = '';
//localStorage.setItem(`sad${today}`,0);

let hard = '';
//localStorage.setItem(`hard${today}`,0);

let happy = '';
//localStorage.setItem(`happy${today}`,0);

let fun = '';
//localStorage.setItem(`fun${today}`,0);

//（初期）memoのKeyセット
let memo__key = '';
let memo__text = '';

//画像をクリックして値を取得

const pull = document.getElementById('memo__key');

$("#anger").on('click',()=>{
    anger = localStorage.getItem(`anger${today}`);
    anger++;
    localStorage.setItem(`anger${today}`,anger);
    swal('深呼吸してみよう😮‍💨');
    pull.options[1].selected = 'true';
});

$("#sad").on('click',()=>{
    sad = localStorage.getItem(`sad${today}`);
    sad++;
    localStorage.setItem(`sad${today}`,sad);
    swal('大丈夫？🥺');
    pull.options[2].selected = 'true';
});

$("#hard").on('click',()=>{
    hard = localStorage.getItem(`hard${today}`);
    hard++;
    localStorage.setItem(`hard${today}`,hard);
    swal('無理しすぎないでね😢');
    pull.options[3].selected = 'true';
});

$("#happy").on('click',()=>{
    happy = localStorage.getItem(`happy${today}`);
    happy++;
    localStorage.setItem(`happy${today}`,happy);
    swal('良いことがあったんだね！😆');
    pull.options[4].selected = 'true';
});

$("#fun").on('click',()=>{
    fun = localStorage.getItem(`fun${today}`);
    fun++;
    localStorage.setItem(`fun${today}`,fun);
    swal('楽しいのが一番😁');
    pull.options[5].selected = 'true';
});

//テキストをLocalStrorageに登録する
$("#memo__btn").on('click',()=>{
    memo__key = $('#memo__key').val();
    memo__text = $('#memo__text').val();
    localStorage.setItem(`${memo__key}${today}memo` , memo__text);
    swal(`「${memo__text}」を保存しました`);
    $('#memo__text').val('');
});


//選択した期間ごとにDBに登録した値を取得
//感情の配列
const emotion__all = ['anger', 'sad', 'hard', 'happy','fun'];
let periond = '';

let anger__sum = '';
let sad__sum = '';
let hard__sum = '';
let happy__sum = '';
let fun__sum = '';

let anger__memo = '';
let sad__memo = '';
let hard__memo = '';
let happy__memo = '';
let fun__memo = '';

//期間で使う変数外だし
let period_selected = '';
let period_index = '';
let period_text = '';


$('#btn').on('click',()=>{

for(let e = 0; e < emotion__all.length; e++){

let emotion = emotion__all[e];
let emotion__first = `${emotion}__first`;
let emotion__next = `${emotion}__next`;
let emotion__sum = `${emotion}__sum`;
let emotion__memo = `${emotion}__memo`;
let memo__draft = '';
let memo__array = [];

emotion__first = '';
emotion__next = '';
emotion__sum = '';
emotion__memo = [];

//期間条件分岐
if(type.value === 'month'){
    period = 32;
}
if(type.value === 'week'){
    period = 8;
}
if(type.value === 'yesterday'){
    period = 2;
}
if(type.value === ''){
    swal('期間を選んでください');
}

//1週間の場合
for(let i = 0; i < period; i++){

    //まず期間を取得
    let dt = new Date();
    dt.setDate(dt.getDate()-i);
    key =dt.toDateString();
    
    if(i === 0){
        emotion__first = localStorage.getItem(emotion + key);
        emotion__sum = Number(emotion__first);
    }else{
        emotion__next = localStorage.getItem(emotion + key);
        emotion__next = Number(emotion__next);
        emotion__sum = emotion__sum + emotion__next;
    }

    memo__draft = localStorage.getItem(emotion + key + 'memo');
    if(!(memo__draft === '')){
        memo__array.push(memo__draft);
    }
}
emotion__memo = memo__array.filter(Boolean);

if(emotion === 'anger'){
    anger__sum = emotion__sum;
    anger__memo = emotion__memo;
}
if(emotion === 'sad'){
    sad__sum = emotion__sum;
    sad__memo = emotion__memo;
}
if(emotion === 'hard'){
    hard__sum = emotion__sum;
    hard__memo = emotion__memo;
}
if(emotion === 'happy'){
    happy__sum = emotion__sum;
    happy__memo = emotion__memo;
}
if(emotion === 'fun'){
    fun__sum = emotion__sum;
    fun__memo = emotion__memo;
}

}

console.log(`angerの合計は${anger__sum}`);
console.log(`sadの合計は${sad__sum}`);
console.log(`hardの合計は${hard__sum}`);
console.log(`happyの合計は${happy__sum}`);
console.log(`funの合計は${fun__sum}`);

console.log(`angerのmemoは${anger__memo}`);
console.log(`sadのmemoは${sad__memo}`);
console.log(`hardのmemoは${hard__memo}`);
console.log(`happyのmemoは${happy__memo}`);
console.log(`funのmemoは${fun__memo}`);


//結果グラフ作成
var ctx = document.getElementById("myPieChart");
var myPieChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ["怒り", "悲しい", "辛い", "嬉しい","楽しい"],
    datasets: [{
        backgroundColor: [
            "#BB5179",
            "#FAFF67",
            "#58A27C",
            "#3C00FF",
            "#FF9999"
        ],
        data: [anger__sum, anger__sum, hard__sum, happy__sum, fun__sum]
    }]
  },
  options: {
    title: {
      display: true,
      text: '感情グラフ'
    }
  }
});

const html = `
    <li>${anger__memo}</li>
    <li>${sad__memo}</li>
    <li>${hard__memo}</li>
    <li>${happy__memo}</li>
    <li>${fun__memo}</li>
`;

$('#memo__list').append(html);

$('.wrapper__third').show();

//感情分類変数
const negative = anger__sum + sad__sum + hard__sum;
const positive = happy__sum + fun__sum;

//選択した期間の値取得
period_selected = document.getElementById('type');
period_index = period_selected.selectedIndex;
period_text = period_selected[period_index].text;
console.log(period_text);

//期間（Optionの値）を表示できるようにする
if (negative > positive){
    swal(`大変な${period_text}だったね😂\nお疲れ様！\n結果を共有するときはChatを開いてね`);
}
if (negative < positive){
    swal(`ハッピーな${period_text}だったね😆\n結果を共有するときはChatを開いてね`);
}

// newPostRef.push({
//     date:dt_login_full,
//     period:period_text,
//     anger_num:anger__sum,
//     sad_num:sad__sum,
//     hard_num:hard__sum,
//     happy_num:happy__sum,
//     fun_num:fun__sum,
//     anger_comment:anger__memo,
//     sad_comment:sad__memo,
//     hard_comment:hard__memo,
//     happy_comment:happy__memo,
//     fun_comment:fun__memo,
// })

});
