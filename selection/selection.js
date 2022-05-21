import * as data from '../js/exp.js';

const main = () =>{
  data.user.level = parseInt(document.getElementById("input_level").value);
  const percent = document.getElementById("input_exp").value;
  data.setByPercent(parseFloat((percent === "") ? "0" : percent) / 100);

  if(!data.isProper(data.user.level, data.min_lv, data.max_lv)){
    alert("사용자의 레벨은 200렙 이상 299렙 이하로 해주세요!");
  }

  if(!data.isProper(data.user.percent, 0, 1)){
    alert("사용자의 경험치는 0%이상 100%이하로 해주세요!");
  }


  document.getElementById("resultlevel").textContent = data.user.level;
  document.getElementById("resultexp").textContent = Math.round(data.user.percent * 100 * 1000) / 1000;
}

document.getElementById("submit").addEventListener('click', ()=>{
  main();
});

document.addEventListener("keyup", (e) => (e.key == 'Enter') ? document.getElementById("submit").click() : 0);
