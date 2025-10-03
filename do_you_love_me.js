const questionContainer = document.querySelector(".question-container");
const resultContainer = document.querySelector(".result-container");
const gifResult = document.querySelector(".gif-result");
const heartLoader = document.querySelector(".cssload-main");
const yesBtn = document.querySelector(".js-yes-btn");
const noBtn = document.querySelector(".js-no-btn");

// di chuyển button no (hoạt động cả trên touch)
function moveNoButton() {
  const qcRect = questionContainer.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const maxX = Math.max(0, qcRect.width - btnRect.width);
  const maxY = Math.max(0, qcRect.height - btnRect.height);

  const newX = Math.floor(Math.random() * maxX);
  const newY = Math.floor(Math.random() * maxY);

  // đặt relative so với questionContainer: dùng translate để tránh ảnh hưởng layout toàn cục
  noBtn.style.position = "absolute";
  noBtn.style.left = `${newX}px`;
  noBtn.style.top = `${newY}px`;
}

noBtn.addEventListener("mouseover", moveNoButton);
// hỗ trợ cảm ứng
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveNoButton();
}, {passive: false});

// yes button: show loader, sau 3s show result
yesBtn.addEventListener("click", () => {
  // ẩn câu hỏi
  questionContainer.style.display = "none";

  // hiển thị loader
  heartLoader.style.display = "block";

  // sau 3s hiện kết quả
  setTimeout(() => {
    heartLoader.style.display = "none";
    resultContainer.style.display = "flex";
    resultContainer.setAttribute("aria-hidden", "false");
    if (gifResult && typeof gifResult.play === "function") {
      // play may reject if not allowed; ignore errors
      gifResult.play().catch(()=>{ /* ignore */ });
    }
  }, 3000);
});
