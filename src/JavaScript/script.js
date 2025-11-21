// State Management
const participants = [];
// DOM Elements
const form = document.getElementsByTagName("form")[0];
// Event Listeners
form.addEventListener("submit", (event) => {
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
});
