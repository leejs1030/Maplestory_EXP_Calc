// 우측 상단 로그인 닉네임을 클릭했을 때의 유저 메뉴가 뜨는 것과 관한 내용
import * as data from '../js/exp.js';
const help_btn = document.getElementById('help-btn'); // 로그인 닉네임 부분
const help_text = document.getElementById('help-text'); // 눌렀을 때 뜨는 박스 부분

help_text.innerHTML = `펀치킹 이벤트와 같이, 정해진 수량의 코인으로 비약을 구매해야하는 경우에 사용 가능합니다.<br>
현재 해당 기능은 추추페스티벌 유니온 펀치킹이 기준입니다.<br>
최대 보유 가능 코인은 ${data.MPOINT}이며, 이 이상으로 입력 불가능합니다.<br>
비약 별 요구 코인은 다음과 같습니다.<br>
성장의 비약 (200~209):	${data.elixirCoin[0]}(코인)<br>
성장의 비약 (200~219):	${data.elixirCoin[1]}(코인)<br>
성장의 비약 (200~229):	${data.elixirCoin[2]}(코인)<br>
태풍 성장의 비약:	${data.elixirCoin[3]}(코인)<br>
극한 성장의 비약:	${data.elixirCoin[4]}(코인)<br>
`

document.getElementsByTagName('html')[0].addEventListener('click', (e)=>{ // 타 영역 클릭 시 유저 메뉴 박스를 관리
    if(e.target === help_btn || e.target === help_text) return; // help_btn 혹은 help_text 부분이면 이 리스너는 무반응.
    // 다른 리스너 반응 등으로 인하여 변화가 생길 수는 있음.
    help_text.className = "collapse"; // 그 외의 영역을 클릭하면, 강제로 닫아버리는 역할.
})
