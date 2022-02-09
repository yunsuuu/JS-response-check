const $screen = document.querySelector("#screen");
const $result = document.querySelector("#result");

let startTime;
let endTime;
const records = []; // 클릭값 차이를 담는 배열
let timeoutId;

const playGame = (e) => {
  // 화면색상에 따라 다르게 조건 만들어주기
  if(e.target.classList.contains("waiting")){ // 파란대기화면
    $screen.classList.remove("waiting");
    $screen.classList.add("ready");
    $screen.innerText = "초록색 화면으로 바뀌면 클릭하세요!";

    timeoutId = setTimeout(() => {
        startTime = new Date();
        $screen.classList.remove("ready");
        $screen.classList.add("now");
        $screen.innerText = "클릭하세요!";
    }, Math.floor((Math.random() * 1000) + 2000));
  } else if(e.target.classList.contains("ready")){ // 빨간준비화면
    clearTimeout(timeoutId);
    $screen.classList.remove("ready");
    $screen.classList.add("waiting");
    $screen.innerText = "너무 성급하시군요! 버튼을 다시 클릭하여 게임을 실행하세요!";
  } else if(e.target.classList.contains("now")){ // 초록색클릭화면
    endTime = new Date();
    const current = endTime - startTime;
    records.push(current);
    const average = records.reduce((a, c) => a + c) / records.length;
    $result.innerText = `최근 : ${current}ms / 평균 : ${average}ms`;
    const topFive = records.sort((a, b) => a - b).slice(0, 5);
    topFive.forEach((rank, index) => {
      $result.append(document.createElement("br"), document.createElement("hr"), `${index + 1}위 : ${rank}ms`);
    })
    $screen.classList.remove("now");
    $screen.classList.add("waiting");
    $screen.innerText = "한번 더! 클릭 후 게임을 시작하세요!";
  }
};

$screen.addEventListener("click", playGame);