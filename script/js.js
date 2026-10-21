// 스크롤이 되면 헤더 모양이 바뀜
const gnb = document.querySelector(".gnb");

window.addEventListener("scroll", function () {
  gnb.classList.toggle("on", window.scrollY > 100);
});

// 스크롤 섹션
// const sections = document.querySelectorAll('main, section');
// let isScrolling = false;

// window.addEventListener('wheel', (e) => {
//   if (isScrolling) {
//     e.preventDefault();               // 이동 중 휠 입력 무시
//     return;
//   }

//   const vh = window.innerHeight;

//   const current = [...sections].findIndex(section => {
//     const rect = section.getBoundingClientRect();
//     return rect.top <= 10 && rect.bottom > 10;
//   });
//   if (current === -1) return;

//   const rect = sections[current].getBoundingClientRect();
//   const goingDown = e.deltaY > 0;

//   // 섹션이 화면보다 길 때: 안쪽에 아직 볼 내용이 남았으면 기본 스크롤 허용
//   if (goingDown && rect.bottom > vh + 10) return;   // 아래쪽 내용이 더 있음
//   if (!goingDown && rect.top < -10) return;         // 위쪽 내용이 더 있음

//   e.preventDefault();                 // 여기서부터는 섹션 스냅

//   let next = current + (goingDown ? 1 : -1);
//   next = Math.max(0, Math.min(next, sections.length - 1));
//   if (next === current) return;

//   isScrolling = true;
//   sections[next].scrollIntoView({ behavior: 'smooth', block: 'start' });

//   setTimeout(() => { isScrolling = false; }, 700);
// }, { passive: false });               // preventDefault를 쓰려면 필수

// 스와이퍼
var swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "3",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
  },
  /* 모바일만 덮어쓰기 */
  breakpoints: {
    0: {
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 20,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      },
    },
    744: {
      slidesPerView: 3,
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
    },
  },
});

// 갤러리 모달팝업
const gallery = {
  SION: [
    "sion06",
    "sion02",
    "sion01",
    "sion03",
    "sion04",
    "sion05",
    "sion09",
    "sion08",
    "sion07",
  ],
  RIKU: [
    "riku07",
    "riku04",
    "riku03",
    "riku02",
    "riku05",
    "riku06",
    "riku01",
    "riku08",
    "riku09",
  ],
  SAKUYA: [
    "sakuya01",
    "sakuya02",
    "sakuya06",
    "sakuya04",
    "sakuya07",
    "sakuya05",
    "sakuya10",
    "sakuya08",
    "sakuya09",
  ],
  YUSHI: [
    "yushi01",
    "yushi02",
    "yushi06",
    "yushi04",
    "yushi05",
    "yushi03",
    "yushi07",
    "yushi08",
    "yushi09",
  ],
  RYO: [
    "ryo07",
    "ryo02",
    "ryo06",
    "ryo04",
    "ryo05",
    "ryo03",
    "ryo09",
    "ryo08",
    "ryo01",
  ],
  JAEHEE: [
    "jaehee01",
    "jaehee06",
    "jaehee03",
    "jaehee02",
    "jaehee05",
    "jaehee04",
    "jaehee07",
    "jaehee08",
    "jaehee09",
  ],
};

// 파일명 -> 경로로 바꿔주기 (확장자는 여기서 한 번만 관리)
Object.keys(gallery).forEach((key) => {
  gallery[key] = gallery[key].map((file) => `img/gallery/${file}.jfif`);
});

// 갤러리 모달
const modal = document.getElementById("gmodal");
const nameEl = modal.querySelector(".gmodal_name");
const gridEl = modal.querySelector(".gmodal_grid");
const closeBtn = modal.querySelector(".gmodal_close");

// 라이트박스
const lb = document.getElementById("glightbox");
const lbImg = lb.querySelector("img");
const lbClose = lb.querySelector(".glightbox_close");

function openGallery(name) {
  const imgs = gallery[name];
  if (!imgs) return;

  nameEl.textContent = name;
  gridEl.innerHTML = imgs
    .map(
      (src, i) => `
      <figure class="item" style="--i:${i}">
        <img src="${src}" alt="${name} ${i + 1}">
      </figure>`,
    )
    .join("");

  modal.classList.add("on");
  document.documentElement.style.overflow = "hidden";
}

function closeGallery() {
  modal.classList.remove("on");
  document.documentElement.style.overflow = "";
  gridEl.innerHTML = "";
}

function openLightbox(src, alt) {
  lbImg.src = src;
  lbImg.alt = alt;
  lb.classList.add("on");
}

function closeLightbox() {
  lb.classList.remove("on");
  lbImg.src = "";
}

// 멤버 사진 클릭 -> 갤러리 열기
document.querySelector(".sec06_cols").addEventListener("click", (e) => {
  const fig = e.target.closest("figure[data-name]");
  if (fig) openGallery(fig.dataset.name);
});

// 갤러리 안 사진 클릭 -> 확대
gridEl.addEventListener("click", (e) => {
  const img = e.target.closest(".item img");
  if (img) openLightbox(img.src, img.alt);
});

// 갤러리 닫기: X 버튼 / 어두운 바깥
closeBtn.addEventListener("click", closeGallery);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeGallery();
});

// 라이트박스 닫기: X 버튼 / 어두운 바깥 / 사진 클릭
lbClose.addEventListener("click", closeLightbox);
lb.addEventListener("click", (e) => {
  if (!e.target.closest(".glightbox_close")) closeLightbox();
});

// ESC: 라이트박스가 열려 있으면 그것만, 아니면 갤러리 닫기
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  if (lb.classList.contains("on")) closeLightbox();
  else if (modal.classList.contains("on")) closeGallery();
});

// 모바일 - 멤버 프로필 변경
/* ===== 멤버 데이터: 사진, 생일, 컬러를 여기서 고치세요 ===== */
const members = {
  sion: {
    name: "SION",
    img: "img/si.avif",
    birth: "2002.5.11",
    color: "COLOR",
    hex: "#ad17c1",
  },
  riku: {
    name: "RIKU",
    img: "img/ri.avif",
    birth: "2003.6.28",
    color: "COLOR",
    hex: "#c94a4a",
  },
  yushi: {
    name: "YUSHI",
    img: "img/yu.avif",
    birth: "2004.4.5",
    color: "BLUE",
    hex: "#429ce0",
  },
  jaehee: {
    name: "JAEHEE",
    img: "img/ja.avif",
    birth: "2005.6.21",
    color: "COLOR",
    hex: "#199e3a",
  },
  ryo: {
    name: "RYO",
    img: "img/ry.avif",
    birth: "2007.8.4",
    color: "COLOR",
    hex: "#f8f523",
  },
  sakuya: {
    name: "SAKUYA",
    img: "img/sa.avif",
    birth: "2007.11.18",
    color: "COLOR",
    hex: "#ff99f6",
  },
};

/* ===== 요소 ===== */
const memberImg = document.getElementById("member_img");
const memberName = document.getElementById("member_name");
const memberBirth = document.getElementById("member_birth");
const memberColor = document.getElementById("id_color");
const memberDot = document.querySelector(".info_rows .dot");
const mcNow = document.getElementById("mc_now");
const mcTotal = document.getElementById("mc_total");

const keys = Object.keys(members); // sion, riku, yushi ...
const chips = document.querySelectorAll(".only_m a");
const listItems = document.querySelectorAll(".member_list li");

mcTotal.textContent = keys.length;

showMember("yushi");

/* ===== 멤버 바꾸기 ===== */
function showMember(key) {
  const m = members[key];
  if (!m) return;

  memberImg.src = m.img;
  memberImg.alt = m.name;
  memberName.textContent = m.name;
  memberBirth.textContent = m.birth;
  memberColor.textContent = m.color;
  memberDot.style.background = m.hex;
  memberDot.style.background = m.hex;
  document.querySelector(".sec02").style.setProperty("--accent", m.hex);
  mcNow.textContent = keys.indexOf(key) + 1;

  // 모바일 칩: 파란색(active) 이동
  chips.forEach((c) => {
    const on = c.dataset.member === key;
    c.classList.toggle("active", on);
    c.style.color = on ? m.hex : "";
  });

  // 데스크톱 이름 목록: on 이동
  listItems.forEach((li) => {
    li.classList.toggle("on", li.querySelector("a").dataset.member === key);
  });
}

/* ===== 클릭 연결 (칩 + 이름 목록 공통) ===== */
document.querySelectorAll(".only_m a, .member_list a").forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    showMember(a.dataset.member);
  });
});

// sec05
/* ===== 공지 ===== */
(function () {
  // 공지 데이터: 새 공지는 맨 위에 한 줄 추가
  const notices = [
    {
      date: "2026.09.21 mon",
      title: "NCT WISH, 日 싱글 성공적 흥행! 레코드협회 ‘플래티넘’ 인증",
      link: "#",
    },
    {
      date: "2026.09.17 fri",
      title:
        "NCT WISH, 中에서도 뜨겁다! 8개 도시 쇼핑몰 랩핑 팝업에 31만 명 대거 운집",
      link: "#",
    },
    {
      date: "2026.09.10 mon",
      title: "이게 바로 정규의 맛! NCT WISH가 정규 1집으로 이룬 것들",
      link: "#",
    },
    {
      date: "2026.09.01 thu",
      title:
        "NCT WISH, 1만 3천 명 방문→웨이팅 릴레이로 정규 1집 팝업&특별 전시회 성황",
      link: "#",
    },
    // 아래는 2페이지 테스트용 (실제 공지로 교체)
    { date: "2026.08.28 fri", title: "NCT WISH, 미니 4집 ‘I SPY’ 온∙오프라인으로 즐긴다! 컴백 프로모션 본격 시동", link: "#" },
    { date: "2026.08.25 tue", title: "NCT WISH, 팬미팅 亞 4개 지역 10회 공연 성료! ‘전석 매진’ 홍콩서 2만 관객 동원", link: "#" },
    { date: "2026.08.20 thu", title: "NCT WISH, 2026년 흥행 연타 나선다! 네 번째 미니앨범 ‘I SPY’ 발매", link: "#" },
    { date: "2026.08.15 sat", title: "NCT WISH, 日 빛낸 ‘확신의 대세’! 새 싱글 오리콘 차트 1위", link: "#" },
    { date: "2026.08.28 fri", title: "NCT WISH, 日 싱글 발매 기념 쇼케이스 성황 → 음악방송 출격", link: "#" },
    { date: "2026.08.25 tue", title: "NCT WISH, 서울 앙코르 공연만 남았다! 가오슝∙방콕·자카르타 공연도 성황", link: "#" },
    { date: "2026.08.20 thu", title: "NCT WISH 세계관에 빠져든다! 정규 1집 팝업스토어 4월 21일 오픈", link: "#" },
    { date: "2026.08.15 sat", title: "NCT WISH의 랜선 집들이 파티! 20일 오후 4시 30분 컴백 기념 라이브 진행", link: "#" },
    { date: "2026.08.28 fri", title: "NCT WISH, 정규 1집 ‘Ode to Love’ 음원∙음반 모두 美친 기세", link: "#" },
    { date: "2026.08.25 tue", title: "NCT WISH에게 영감 받다! 정규 1집 발매 기념 특별 전시회 개최", link: "#" },
    { date: "2026.08.20 thu", title: "‘3연속 밀리언셀러’ NCT WISH, 정규 1집으로 韓∙中∙日 주간 차트까지 접수 중", link: "#" },
    { date: "2026.08.15 sat", title: "NCT WISH, 日 특집 음악 방송서 신곡 ‘BOY MEETS GIRL’ 무대 첫 공개 화제", link: "#" },
    { date: "2026.08.28 fri", title: "NCT WISH, 日 드라마 OST 참여! 신곡 ‘Same Sky’ 오늘(27일) 오후 6시 음원 공개", link: "#" },
    { date: "2026.08.25 tue", title: "NCT WISH, 대학 축제 휩쓸었다! 캠퍼스에 울려 퍼진 “뚜-뚜루뚜”", link: "#" },
    { date: "2026.08.20 thu", title: "NCT WISH, 日 싱글 더블 타이틀곡 ‘BOY MEETS GIRL’ 오늘(22일) 발매 화제", link: "#" },
    { date: "2026.08.15 sat", title: "NCT WISH, 日 팬미팅 전석 매진 → 신곡 ‘YO-I-DON!’ 오늘(13일) 공개 화제", link: "#" },
  ];

  const PER_PAGE = 5;
  const totalPages = Math.ceil(notices.length / PER_PAGE);
  const listEl = document.getElementById("notice_list");
  const pagingEl = document.getElementById("notice_paging");

  if (!listEl || !pagingEl) return;

  let current = 1;

  function render() {
    // 1) 목록
    const start = (current - 1) * PER_PAGE;

    listEl.innerHTML = notices
      .slice(start, start + PER_PAGE)
      .map(
        (n) => `
          <article>
            <a href="${n.link}">
              <span class="date">${n.date}</span>
              <p>${n.title}</p>
            </a>
          </article>`,
      )
      .join("");

    // 2) 페이지 버튼
    // 페이지 버튼
    let html = `<a href="#" class="${current === 1 ? "off" : ""}" data-go="${current - 1}">&lt;</a>`;

    for (let i = 1; i <= totalPages; i++) {
      html += `<a href="#" data-go="${i}"${i === current ? ' class="on"' : ""}>${i}</a>`;
    }

    html += `<a href="#" class="next ${current === totalPages ? "off" : ""}" data-go="${current + 1}">&gt;</a>`;

    pagingEl.innerHTML = html;
  }

  // 3) 클릭은 paging 한 곳에서 처리
  pagingEl.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-go]");
    if (!a) return;

    e.preventDefault();

    if (a.classList.contains("off")) return;

    current = Number(a.dataset.go);
    render();
  });

  render();
})();

// 아이프레임 뮤비
const playBtn = document.querySelector(".play_btn");
const videoModal = document.querySelector(".video_modal");
const videoCloseBtn = document.querySelector(".close_btn");
const videoIframe = videoModal.querySelector("iframe");

const videoURL = "https://www.youtube.com/embed/xIlFjHHUfI0?autoplay=1";

// 플레이 버튼 클릭
playBtn.addEventListener("click", (e) => {
  e.preventDefault();
  videoModal.hidden = false;
  videoIframe.src = videoURL;
});

// 닫기 버튼 클릭
videoCloseBtn.addEventListener("click", closeModal);

// 모달 바깥 배경 클릭
videoModal.addEventListener("click", (e) => {
  if (e.target === videoModal) {
    closeModal();
  }
});

// ESC 키로 닫기
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !videoModal.hidden) {
    closeModal();
  }
});

// 모달 닫기 및 영상 정지
function closeModal() {
  videoModal.hidden = true;
  videoIframe.src = "";
}

// 유튜브 더보기 버튼
document.querySelector(".moreBtn").addEventListener("click", function (e) {
  e.preventDefault();
  e.stopPropagation();

  document.querySelector(".video_extra").classList.add("active");
  document.querySelector(".video_more").style.display = "none";
});

//sec04
// VIDEO 썸네일 아이프레임 모달
const youtubeModal = document.querySelector(".youtube_modal");
const youtubeIframe = document.querySelector(".youtube_wrap iframe");
const youtubeCloseBtn = document.querySelector(".youtube_close");

const videoBtns = document.querySelectorAll(".sec04 figure a[data-video]");

// 썸네일 클릭
videoBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    const videoURL = btn.dataset.video;

    youtubeIframe.src = videoURL + "?autoplay=1";
    youtubeModal.hidden = false;
  });
});

// 닫기 버튼
youtubeCloseBtn.addEventListener("click", closeYoutubeModal);

// 모달 바깥 클릭
youtubeModal.addEventListener("click", (e) => {
  if (e.target === youtubeModal) {
    closeYoutubeModal();
  }
});

// ESC 키로 닫기
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !youtubeModal.hidden) {
    closeYoutubeModal();
  }
});

// 모달 닫기 + 영상 정지
function closeYoutubeModal() {
  youtubeModal.hidden = true;
  youtubeIframe.src = "";
}

// 헤더 gnb 메뉴 팝업 ==============
const root = document.documentElement;
const menuBtn = document.querySelector('.hamburger button');
const menu = document.querySelector('.menu_modal');

function toggleMenu(open) {
  const willOpen = open === undefined ? !menu.classList.contains('on') : open;
  menu.classList.toggle('on', willOpen);
  menuBtn.classList.toggle('on', willOpen);
  root.classList.toggle('menu_open', willOpen);
  menuBtn.setAttribute('aria-expanded', willOpen);
  menu.setAttribute('aria-hidden', !willOpen);
}

menuBtn.addEventListener('click', () => toggleMenu());

// ESC로 닫기
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') toggleMenu(false);
});

// 메뉴 클릭: 닫고 해당 섹션으로 이동
menu.querySelectorAll('a').forEach((a) => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(a.dataset.target);
    toggleMenu(false);
    if (target) {
      setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
    }
  });
});