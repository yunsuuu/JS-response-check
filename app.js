const $screen = document.querySelector("#screen");
const $result = document.querySelector("#result");

// console.log(Math.floor(Math.random() * 10)); // 0-9
// console.log(Math.floor(Math.random() * 10) + 20); // 20-29

// 값을 기록하면 무조건 변수로 만들어주기
let startTime;
let endTime;
const records = []; // 사용자가 초록색 화면 클릭했을 때 시간을 담는 배열
let timeoutId;

const changeColor = (e) => {
  if(e.target.classList.contains("waiting")){ // 파란화면(초기)
    $screen.classList.remove("waiting");
    $screen.classList.add("ready");
    $screen.innerText = "초록색 화면으로 바뀌면 클릭하세요!"

    timeoutId = setTimeout(() => {
      startTime = new Date(); // 초록화면이 뜬 시간을 new Date() 값으로 저장
      $screen.classList.remove("ready");
      $screen.classList.add("now");
      $screen.innerText = "클릭하세요!";
    }, Math.floor(Math.random() * 1000) + 2000); // 랜덤초(2-3초 사이)
    // 0 <= x < 1
    // 0 + 2 <= x < 1 + 2 -> Math.random() 시작이 0이기 때문에 원하는 숫자를 더해서 시작값을 변경
    // 2 <= x < 3
  } else if(e.target.classList.contains("ready")){ // 분홍화면(대기)
    clearTimeout(timeoutId);
    $screen.classList.remove("ready");
    $screen.classList.add("waiting");
    $screen.innerText = "너무 성급하시군요! 버튼을 다시 클릭하면 게임이 실행됩니다!";
  } else if(e.target.classList.contains("now")){ // 초록화면(실행)
    endTime = new Date();
    const current = endTime - startTime;
    records.push(current);
    // 평균 구하는 코드(암기)
    const average = Math.floor(records.reduce((a, c) => a + c) / records.length);
    $result.innerText = `현재 : ${current}ms / 평균 : ${average}ms`;
    const topFive = records.sort((a, b) => a - b).slice(0, 5);
    topFive.forEach((top, index) => {
      $result.append(document.createElement("br"), document.createElement("hr"), `${index + 1}위 : ${top}ms`);
    })
    // 값 초기화(필수코드는 아니지만 혹시 모를 버그를 예방하기 위해)
    startTime = null;
    endTime = null;
    $screen.classList.remove("now");
    $screen.classList.add("waiting");
    $screen.innerText = "클릭해서 시작하세요!"
  }
};

$screen.addEventListener("click", changeColor);