import * as data from './exp.js';

/**
 * @type {number[][]}
 * arr[i][0]: i개의 코인을 사용해서 도달 가능한 최대치의 레벨 값
 * 
 * arr[i][1]: i개의 코인을 사용해서 도달 가능한 최대치의 경험치 값(비율이 아닌, 절대치)
 * 
 * arr[i][1]: i개의 코인을 사용하기 직전에 어디에서 사용했는지. back-trace를 위함
 */
let arr = new Array(data.MPOINT + 1);
for(let i = 0; i < data.MPOINT + 1; i++){
    arr[i] = new Array(3);
    arr[i][0] = arr[i][1] = arr[i][1] = 0;
}
const resetArr = () => { for(let i = 0; i < data.MPOINT + 1; i++) arr[i][0] = arr[i][1] = arr[i][1] = 0; }
/**
 * 
 * @param {number[] | data.user} arr1
 * @param {number[] | data.user} arr2
 * @returns {boolean}
 * If arr1 is greater than arr2, return true.
 * 
 * Else, return false.
 * 
 * Evaluate by comparing level and exp.
 */
const lv_compare = (arr1, arr2) =>{
    if(JSON.stringify(arr1) === JSON.stringify(data.user)){
        arr1 = new Array(2);
        arr1[0] = data.user.level;
        arr1[1] = data.user.exp;
    }
    if(JSON.stringify(arr2) === JSON.stringify(data.user)){
        arr2 = new Array(2);
        arr2[0] = data.user.level;
        arr2[1] = data.user.exp;
    }
    if(arr1[0] > arr2[0]) return true;
    else if(arr1[0] < arr2[0]) return false;
    else if(arr1[1] > arr2[1]) return true;
    else if(arr1[1] < arr2[1]) return false;
    else return false;
}

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
            data.user.level = arr[n][0];
            data.user.exp = arr[n][1];
            if(data.user.level >= data.max_lv) break;
            data.elixir(i + 1);
            if(lv_compare(data.user, arr[n + data.elixirCoin[i]])) {
                arr[n + data.elixirCoin[i]][0] = data.user.level;
                arr[n + data.elixirCoin[i]][1] = data.user.exp;
                if(lv_compare(arr[n + data.elixirCoin[i]], arr[ret])) ret = n + data.elixirCoin[i];
                arr[n + data.elixirCoin[i]][2] = n;
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
    data.user.level = arr[res][0];
    data.setExp(arr[res][1]);
    document.getElementById('result_level').textContent = data.user.level;
    document.getElementById('result_exp').textContent = Math.round(data.user.percent * 100 * 1000) / 1000;
    while(res > 0){
        for(let i = 0; i < 5; i++){
            if(res - arr[res][2] == data.elixirCoin[i]){
                printing[i]++;
                break;
            }
        }
        res = arr[res][2];
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
    arr[0][0] = data.user.level;
    arr[0][1] = data.user.exp;
    showResult(dfs(0, POINT));
}

const doWithInput = () => {
    let lv = parseInt(document.getElementById('input_level').value);
    let po = parseInt(document.getElementById('input_coin').value);
    let xp = document.getElementById('input_exp').value;
    if(xp === "") xp = 0;
    else xp = parseFloat(xp) / 100;

    if(!data.isProper(lv, data.min_lv, data.max_lv)) return alert('200레벨 이상, 300레벨 미만으로 입력해주세요!');
    if(!data.isProper(xp, 0, 100)) return alert('0%이상, 100%미만으로 입력해주세요!');
    if(!data.isProper(po, 0, data.MPOINT)) return alert('비 정상적인 포인트 입니다.');
    
    main(lv, xp, po);
}

document.getElementById('submit').addEventListener('click', doWithInput);
document.addEventListener('keyup', (e) => (e.key == 'Enter') ? document.getElementById('submit').click() : 0);