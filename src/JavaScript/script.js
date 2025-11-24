// State Management
const participants = [];
// DOM Elements
const form = document.getElementsByTagName("form")[0];
// Event Listeners
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const participant1 = {
    name: form.participant1Name.value,
    email: form.participant1Email.value,
  };
  const participant2 = {
    name: form.participant2Name.value,
    email: form.participant2Email.value,
  };
  const participant3 = {
    name: form.participant3Name.value,
    email: form.participant3Email.value,
  };
  participants.push(participant1, participant2, participant3);
  try {
    const response = await fetch("http://localhost:3000/api/assignments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ participants, sendEmails: true }),
    });
    const data = await response.json();
    console.log("Server Response:", data);
  } catch (error) {
    console.log("Error:", error.message);
  }
});
