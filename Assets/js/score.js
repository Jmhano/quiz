var mostRecentScore = localStorage.getItem("mostRecentScore");
finalScore.innerText = mostRecentScore;

document.getElementById("submit").addEventListener("click", function () {
  window.alert("Thank you for taking this quiz!");
});
