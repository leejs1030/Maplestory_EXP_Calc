import * as data from '../js/exp.js';

const elixirCountMapper = [0, 8, 4, 2, 1];
const elixirNameMapper = ["", "성장의 비약(200~209) 8개", "성장의 비약(200~219) 4개", "성장의 비약(200~229) 2개", "성장의 비약(200~239) 1개"]

const useElixirs = (num) => {
  data.user.level = parseInt(document.getElementById("input_level").value);
  const percent = document.getElementById("input_exp").value;
  data.setByPercent(parseFloat((percent === "") ? "0" : percent) / 100);
  console.log(`${num}: `);
  console.log(data.user);
  for (let i = 0; i < elixirCountMapper[num]; i++) data.elixir(num);
  console.log(data.user);
  return {
    lv: data.user.level,
    percent: data.user.percent,
    type: num
  }
}

const main = () => {
  data.user.level = parseInt(document.getElementById("input_level").value);
  const percent = document.getElementById("input_exp").value;
  data.setByPercent(parseFloat((percent === "") ? "0" : percent) / 100);

  if (!data.isProper(data.user.level, data.min_lv, data.max_lv)) {
    alert("사용자의 레벨은 200렙 이상 299렙 이하로 해주세요!");
  }

  if (!data.isProper(data.user.percent, 0, 1)) {
    alert("사용자의 경험치는 0%이상 100%이하로 해주세요!");
  }

  let max = {lv: 0, exp: 0, type: 0};
  console.log(max);
  for (let i = 0; i <= 4; i++) {
    const res = useElixirs(i);
    console.log(res);
    if (max.lv < res.lv) max = res;
    else if (max.lv == res.lv && max.percent < res.percent) max = res;
  }

  document.getElementById("recommend-elixir").textContent = `${elixirNameMapper[max.type]}를 사용하셨을 때 최고의 효과를 얻습니다.`
  document.getElementById("resultlevel").textContent = max.lv;
  document.getElementById("resultexp").textContent = Math.round(max.percent * 100 * 1000) / 1000;
}

document.getElementById("submit").addEventListener('click', () => {
  main();
});

document.addEventListener("keyup", (e) => (e.key == 'Enter') ? document.getElementById("submit").click() : 0);
