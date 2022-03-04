import * as data from './exp.js';

/**
 * @type {number[][]}
 * arr[i][0]: i개의 코인을 사용해서 도달 가능한 최대 레벨+경험치.
 * 예를 들어, 232.049라면 232레벨 4.9%
 * 
 * arr[i][1]: i개의 코인을 사용하기 직전에 어디에서 사용했는지. back-trace를 위함
 */
let arr = new Array(50000);
for(let i = 0; i < 50000; i++){
    arr[i] = new Array(2);
    arr[i][0] = arr[i][1] = 0;
}
const resetArr = () => { for(let i = 0; i < 50000; i++) arr[i][0] = arr[i][1] = 0; }

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
    if(n >= POINT) return n;
    let ret = n;
    for(let i = 0; i < 5; i++){
        if(n + data.elixirCoin[i] <= POINT){
            data.user.level = parseInt(arr[n][0]);
            data.user.percent = arr[n][0] - data.user.level;
            if(data.user.level >= data.max_lv) break;
            data.setPercent();
            data.elixir(i + 1);
            if(data.user.level + data.user.percent > arr[n + data.elixirCoin[i]][0]){
                arr[n + data.elixirCoin[i]][0] = data.user.level + data.user.percent;
                if(arr[ret][0] < arr[n + data.elixirCoin[i]][0]) ret = n + data.elixirCoin[i];
                arr[n + data.elixirCoin[i]][1] = n;
                const s = dfs(n + data.elixirCoin[i], POINT);
                if(arr[ret][0] < arr[s][0]) ret = s;
            }
        }
        else break;
    }
    return ret;
}

const showResult = (res) => {
    let printing = [0, 0, 0, 0, 0];
    document.getElementById('result_level').textContent = parseInt(arr[res][0]);
    document.getElementById('result_exp').textContent = Math.round((arr[res][0] - parseInt(arr[res][0])) * 100 * 1000) / 1000;
    while(res > 0){
        for(let i = 0; i < 5; i++){
            if(res - arr[res][1] == data.elixirCoin[i]){
                printing[i]++;
                break;
            }
        }
        res = arr[res][1];
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
    data.user.level = lv; data.user.percent = xp;//Here will get data.user level, exp and point.
    data.setPercent();
    const POINT = po;

    resetArr();
    arr[0][0] = data.user.level + data.user.percent;
    
    showResult(dfs(0, POINT));
}

const doWithInput = () => {
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