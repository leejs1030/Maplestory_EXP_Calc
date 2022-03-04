import {user, min_lv, max_lv, max_elixir, isProper, elixir} from './exp.js';

const main = () =>{
    user.level = parseInt(document.getElementById("input_level").value);
    user.exp = parseFloat(document.getElementById("input_exp").value) / 100;

    if(!isProper(user.level, min_lv, max_lv)){
        alert("사용자의 레벨은 200렙 이상 299렙 이하로 해주세요!");
    }

    if(!isProper(user.exp, 0, 1)){
        alert("사용자의 경험치는 0%이상 100%이하로 해주세요!");
    }

    let elixirs = document.getElementsByClassName("elixir");


    for(let e = 0; e < 5; e++){

        let val = elixirs[e].lastElementChild.value;
        if(val === "") val = 0;
        else val = parseInt(val);
        console.log(val);
        if(!isProper(val, 0, max_elixir)){
            alert("성장의 비약 각 항목은 0 이상 100 이하의 정수로 해주세요!");
            return;
        }

        while(val--) elixir(e + 1);

        if(user.level >= 300) break;
    }

    document.getElementById("resultlevel").textContent = user.level;
    document.getElementById("resultexp").textContent = Math.round(user.exp * 100 * 1000) / 1000;
}

document.getElementById("submit").addEventListener('click', ()=>{
    main();
});

document.addEventListener("keyup", (e) => (e.key == 'Enter') ? document.getElementById("submit").click() : 0);
