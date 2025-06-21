const complaints = [
  {
    id: "Complaint 001",
    title: "Parking Area",
    status: "Resolved",
    image: "resources/elements/parking.png",
  },
  {
    id: "Complaint 002",
    title: "No Cleanliness in Boys Bathroom",
    status: "Pending",
    image: "resources/elements/bathroom.png",
  },
  {
    id: "Complaint 003",
    title: "Broken Bench",
    status: "Under Process",
    image: "resources/elements/bench.png",
  },
  {
    id: "Complaint 004",
    title: "No Water in Bathroom",
    status: "Pending",
    image: "resources/elements/water.png",
  },
  {
    id: "Complaint 005",
    title: "Ragging in Class",
    status: "Resolved",
    image: "resources/elements/ragging.png",
  },
];

function renderComplaints() {
  const container = document.getElementById("complaintContainer");
  container.innerHTML = "";

  complaints.forEach((complaint) => {
    const card = document.createElement("div");
    card.classList.add("complaint-card");

    const statusClass = complaint.status.toLowerCase().replace(" ", "-");
    card.classList.add(statusClass);

    card.innerHTML = `
      <div class="complaint-info">
        <div class="complaint-title">${complaint.id}</div>
        <div>Title : ${complaint.title}</div>
        <div>Status : ${complaint.status}</div>
      </div>
      <img class="complaint-image" src="${complaint.image}" alt="Complaint Image">
    `;

    container.appendChild(card);
  });
}

renderComplaints();

document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    const status = button.getAttribute("data-status");
    document.querySelectorAll(".complaint-card").forEach((card) => {
      if (status === "all" || card.classList.contains(status)) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });
});
