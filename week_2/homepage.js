document.addEventListener('DOMContentLoaded', () => {
  // Add complaint button
  // document.getElementById('addComplaintBtn').addEventListener('click', () => {
  //   window.location.href = "complaint.html"; // or wherever your complaint page is located
  // });

  // Get the search input element
  const searchInput = document.getElementById('searchInput');

  // Get all issue cards
  const issueCards = document.querySelectorAll('.issue-card');

  // Add event listener to the search input
  searchInput.addEventListener('input', function () {
    const query = searchInput.value.toLowerCase(); // Get the search query in lowercase

    // Loop through all issue cards
    issueCards.forEach(function (card) {
      // Get the title of each issue card and convert it to lowercase
      const title = card.querySelector('.issue-title').textContent.toLowerCase();

      // If the title includes the search query, show the card, otherwise hide it
      if (title.includes(query)) {
        card.style.display = 'block'; // Show the card
      } else {
        card.style.display = 'none'; // Hide the card
      }
    });
  });
});
