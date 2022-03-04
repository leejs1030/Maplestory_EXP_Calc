import * as data from './exp.js';

/**
 * @type {number[][]}
 * arr[i][0]: i개의 코인을 사용해서 도달 가능한 최대 레벨+경험치.
 * 예를 들어, 232.049라면 232레벨 4.9%
 * 
 * arr[i][1]: i개의 코인을 사용하기 직전에 어디에서 사용했는지. back-trace를 위함
 */
let dp = new Array(50000);

for(let i = 0; i < 50000; i++){
    dp[i] = new Array(2);
    dp[i][0] = dp[i][1] = 0;
}


let res = 0;

/**
 * 
 * @param {number} n
 * Currently used number of point(coin)
 * @param {number} POINT 
 * Total point user is having
 * @returns 
 * max level and exp from using n and maximum POINT
 */
const dfs = (n, POINT) => {
    for(let i = 0; i < 5; i++){
        if(n + data.elixirCoin[i] <= POINT){
            data.user.level = parseInt(dp[n][0]);
            data.user.exp = dp[n][0] - data.user.level;
            if(data.user.level >= data.max_lv) return;
            data.elixir(i + 1);
            if(data.user.level + data.user.exp > dp[n + data.elixirCoin[i]][0]){
                dp[n + data.elixirCoin[i]][0] = data.user.level + data.user.exp;
                if(dp[res][0] < dp[n + data.elixirCoin[i]][0]) res = n + data.elixirCoin[i];
                dp[n + data.elixirCoin[i]][1] = n;
                dfs(n + data.elixirCoin[i], POINT);
            }
        }
        else return;
    }
}

const showResult = () => {
    let printing = [0, 0, 0, 0, 0];
    document.getElementById('result_level').textContent = parseInt(dp[res][0]);
    document.getElementById('result_exp').textContent = Math.round((dp[res][0] - parseInt(dp[res][0])) * 100 * 1000) / 1000;
    while(res >= 0){
        for(let i = 0; i < 5; i++){
            if(res - dp[res][1] == data.elixirCoin[i]){
                printing[i]++;
                break;
            }
        }
        res = dp[res][1];
    }

    for(let i = 0; i < 5; i++){
        switch(i){
        case 0:
            document.getElementById('elixir1').innerHTML = ('성장의 비약 (200~209):<span class="tab">&#9;</span>' + printing[i] + '(개)');
            break;
        case 1:
            document.getElementById('elixir2').innerHTML = ('성장의 비약 (200~219):<span class="tab">&#9;</span>' + printing[i] + '(개)');
            break;
        case 2:
            document.getElementById('elixir3').innerHTML = ('성장의 비약 (200~229):<span class="tab">&#9;</span>' + printing[i] + '(개)');
            break;
        case 3:
            document.getElementById('elixir4').innerHTML = ('태풍 성장의 비약:<span class="tab">&#9;</span>' + printing[i] + '(개)');
            break;
        case 4:
            document.getElementById('elixir5').innerHTML = ('극한 성장의 비약:<span class="tab">&#9;</span>' + printing[i] + '(개)');
            break;
        }
    }
}

const main = (lv, xp, po) => {
    data.user.level = lv; data.user.exp = xp;//Here will get data.user level, exp and point.
    const POINT = po;

    for(let i = 0; i < 50000; i++){
        dp[i] = new Array(2);
        dp[i][0] = 0;
    }
    dp[0][0] = data.user.level + data.user.exp;
    res = 0;
    
    dfs(0, POINT);
    showResult();
}

const doWithInput = () => {
    console.log('hi');
    let lv = parseInt(document.getElementById('input_level').value);
    let xp = parseFloat(document.getElementById('input_exp').value) / 100;
    let po = parseInt(document.getElementById('input_coin').value);

    if(!data.isProper(lv, data.min_lv, data.max_lv)) return alert('200레벨 이상, 300레벨 미만으로 입력해주세요!');
    if(!data.isProper(xp, 0, 100)) return alert('0%이상, 100%미만으로 입력해주세요!');
    if(!data.isProper(po, 0, data.MPOINT)) return alert('비 정상적인 포인트 입니다.');
    
    main(lv, xp, po);
}

document.getElementById('submit').addEventListener('click', doWithInput);
document.addEventListener('keyup', (e) => (e.key == 'Enter') ? document.getElementById('submit').click() : 0);