document.addEventListener("DOMContentLoaded", () => {
  // Add complaint button
  // document.getElementById('addComplaintBtn').addEventListener('click', () => {
  //   window.location.href = "complaint.html"; // or wherever your complaint page is located
  // });

  const searchInput = document.getElementById("searchInput");

  const issueCards = document.querySelectorAll(".issue-card");

  searchInput.addEventListener("input", function () {
    const query = searchInput.value.toLowerCase();

    issueCards.forEach(function (card) {
      const title = card
        .querySelector(".issue-title")
        .textContent.toLowerCase();

      if (title.includes(query)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});
