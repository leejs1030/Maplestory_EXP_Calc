const exp = [0, 15, 34, 57, 92, 135, 372, 560, 840, 1242, 1242, 1242, 1242, 1242, 1242, 1490, 1788, 2145, 2574, 3088, 3705, 4446, 5335, 6402, 7682, 9218, 11061, 13273, 15927, 19112, 19112, 19112, 19112, 19112, 19112, 22934, 27520, 33024, 39628, 47553, 51357, 55465, 59902, 64694, 69869, 75458, 81494, 88013, 95054, 102658, 110870, 119739, 129318, 139663, 150836, 162902, 175934, 190008, 205208, 221624, 221624, 221624, 221624, 221624, 221624, 238245, 256113, 275321, 295970, 318167, 342029, 367681, 395257, 424901, 456768, 488741, 522952, 559558, 598727, 640637, 685481, 733464, 784806, 839742, 898523, 961419, 1028718, 1100728, 1177778, 1260222, 1342136, 1429374, 1522283, 1621231, 1726611, 1838840, 1958364, 2085657, 2221224, 2365603, 2365603, 2365603, 2365603, 2365603, 2365603, 2519367, 2683125, 2857528, 3043267, 3241079, 3451749, 3676112, 3915059, 4169537, 4440556, 4729192, 5036589, 5363967, 5712624, 6083944, 6479400, 6900561, 7349097, 7826788, 8335529, 8877338, 9454364, 10068897, 10723375, 11420394, 12162719, 12953295, 13795259, 14691950, 15646926, 16663976, 17747134, 18900697, 20129242, 21437642, 22777494, 24201087, 25713654, 27320757, 29028304, 30842573, 32770233, 34818372, 36994520, 39306677, 41763344, 44373553, 47146900, 50093581, 53224429, 56550955, 60085389, 63840725, 67830770, 72070193, 76574580, 81360491, 86445521, 91848366, 97588888, 103688193, 110168705, 117054249, 124370139, 132143272, 138750435, 145687956, 152972353, 160620970, 168652018, 177084618, 185938848, 195235790, 204997579, 215247457, 226009829, 237310320, 249175836, 261634627, 274716358, 288452175, 302874783, 318018522, 333919448, 350615420, 368146191, 386553500, 405881175, 426175233, 447483994, 469858193, 493351102, 518018657, 543919589, 571115568, 2207026470, 2471869646, 2768494003, 3100713283, 3472798876, 3889534741, 4356278909, 4879032378, 5464516263, 6120258214, 9792413142, 10869578587, 12065232231, 13392407776, 14865572631, 19325244420, 21064516417, 22960322894, 25026751954, 27279159629, 43646655406, 46701921284, 49971055773, 53469029677, 57211861754, 74375420280, 78094191294, 81998900858, 86098845900, 90403788195, 144646061112, 148985442945, 153455006233, 158058656419, 162800416111, 211640540944, 217989757172, 224529449887, 231265333383, 238203293384, 381125269414, 392559027496, 404335798320, 416465872269, 428959848437, 557647802968, 574377237057, 591608554168, 609356810793, 627637515116, 1313764762354, 1326902409977, 1340171434076, 1353573148416, 1367108879900, 1380779968699, 1394587768385, 1408533646068, 1422618982528, 1436845172353, 2902427248153, 2931451520634, 2960766035840, 2990373696198, 3020277433159, 3050480207490, 3080985009564, 3111794859659, 3142912808255, 3174341936337, 6412170711400, 6476292418514, 6541055342699, 6606465896125, 6672530555086, 13478511721273, 14826362893400, 16308999182740, 17939899101014, 19733889011115, 39862455802452, 43848701382697, 48233571520966, 53056928673062, 58362621540368, 117892495511543, 129681745062697, 142649919568966, 156914911525862, 172606402678448, 348664933410464, 383531426751510, 421884569426661, 464073026369327, 510480329006259, 1031170264592643, 1134287291051907, 1247716020157097, 1372487622172806, 2058731433259209 ];//0번째는 0렙->1렙. 1번째는 1렙->2렙

let user = {
    level: 0,
    exp: 0
};

const expToPercent = (cur) =>{
    res = cur / exp[user.level];
    return res;
}

const percentToExp = (cur) =>{
    res = cur * exp[user.level];
    return res;
}

const elixir1 = () =>{ //~209. 성장비1
    if(user.level >= 200 && user.level < 300){
        user.exp = percentToExp(user.exp);
        if(user.level < 210){
            user.level++;
            user.exp = expToPercent(user.exp);
        }
        else {
            user.exp += exp[209];
            if(user.exp > exp[user.level]){
                user.exp -= exp[user.level];
                user.level++;
            }
            user.exp = expToPercent(user.exp);
        }
        if(user.level == 300) user.exp = 0;
    }
    else{
        console.log("사용 불가!");
    }
};

const elixir2 = () =>{ //~219. 성장비2
    if(user.level >= 200 && user.level < 300){
        user.exp = percentToExp(user.exp);
        if(user.level < 220){
            user.level++;
            user.exp = expToPercent(user.exp);
        }
        else {
            user.exp += exp[219];
            if(user.exp > exp[user.level]){
                user.exp -= exp[user.level];
                user.level++;
            }
            user.exp = expToPercent(user.exp);
        }
        if(user.level == 300) user.exp = 0;
    }
    else{
        console.log("사용 불가!");
    }
};

const elixir3 = () =>{ //~229. 성장비3
    if(user.level >= 200 && user.level < 300){
        user.exp = percentToExp(user.exp);
        if(user.level < 230){
            user.level++;
            user.exp = expToPercent(user.exp);
        }
        else {
            user.exp += exp[229];
            if(user.exp > exp[user.level]){
                user.exp -= exp[user.level];
                user.level++;
            }
            user.exp = expToPercent(user.exp);
        }
        if(user.level == 300) user.exp = 0;
    }
    else{
        console.log("사용 불가!");
    }
};

const elixir4 = () =>{ //~239. 태성비
    if(user.level >= 200 && user.level < 300){
        user.exp = percentToExp(user.exp);
        if(user.level < 240){
            user.level++;
            user.exp = expToPercent(user.exp);
        }
        else {
            user.exp += exp[239];
            if(user.exp > exp[user.level]){
                user.exp -= exp[user.level];
                user.level++;
            }
            user.exp = expToPercent(user.exp);
        }
        if(user.level == 300) user.exp = 0;
    }
    else{
        console.log("사용 불가!");
    }
};

const elixir5 = () =>{ //~249. 극성비
    if(user.level >= 200 && user.level < 300){
        user.exp = percentToExp(user.exp);
        if(user.level < 250){
            user.level++;
            user.exp = expToPercent(user.exp);
        }
        else {
            user.exp += exp[249];
            if(user.exp > exp[user.level]){
                user.exp -= exp[user.level];
                user.level++;
            }
            user.exp = expToPercent(user.exp);
        }
        if(user.level == 300) user.exp = 0;
    }
    else{
        console.log("사용 불가!");
    }
};

const elixir = (num) => {
    switch(num){
        case 1:
            elixir1();
            break;
        case 2:
            elixir2();
            break;
        case 3:
            elixir3();
            break;
        case 4:
            elixir4();
            break;
        case 5:
            elixir5();
            break;
    }
}

const isProper = (n, m, M) =>{
    if(isNaN(n)) return false;
    if(n < m) return false;
    if(n > M) return false;
    return true;
}

document.getElementById("submit").addEventListener('click', ()=>{

    user.level = parseInt(document.getElementById("input_level").value);
    user.exp = parseFloat(document.getElementById("input_exp").value) / 100;

    if(!isProper(user.level, 200, 299)){
        alert("사용자의 레벨은 200렙 이상 299렙 이하로 해주세요!");
    }

    if(!isProper(user.exp, 0, 1)){
        alert("사용자의 경험치는 0%이상 100%이하로 해주세요!");
    }

    let elixirs = document.getElementsByClassName("elixir");
    //console.log("hi");


    for(let e = 0; e < 5; e++){

        let val = elixirs[e].lastElementChild.value;
        if(val === "") val = 0;
        else val = parseInt(val);
        console.log(val);
        if(!isProper(val, 0, 100)){
            //alert("성장의 비약 각 항목은 0 이상 100 이하의 정수로 해주세요!");
            return;
        }

        while(val--){
            // console.log(user.level);
            elixir(e + 1);
        }

        if(user.level == 300) break;
    }

    // console.log(user.level);
    // console.log(user.exp * 100);
    document.getElementById("resultlevel").textContent = user.level;
    document.getElementById("resultexp").textContent = user.exp * 100;

});