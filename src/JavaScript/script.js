// State Management
const participants = [];
// DOM Elements
const form = document.getElementsByTagName("form")[0];
// Functions
function sortSecretSanta(participants) {
  let assignments = [...participants];
  let isInvalid = true;
  while (isInvalid) {
    // Fisher-Yates Shuffle
    assignments = assignments
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map((obj) => obj.value);
    isInvalid = participants.some(
      (participant, i) => participant === assignments[i]
    );
  }
  const result = participants.map((giver, i) => ({
    giver,
    receiver: assignments[i],
  }));
  return result;
}
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
  const participant4 = {
    name: form.participant4Name.value,
    email: form.participant4Email.value,
  };
  const participant5 = {
    name: form.participant5Name.value,
    email: form.participant5Email.value,
  };
  const participant6 = {
    name: form.participant6Name.value,
    email: form.participant6Email.value,
  };
  participants.push(
    participant1,
    participant2,
    participant3,
    participant4,
    participant5,
    participant6
  );
  console.log(sortSecretSanta(participants));
});
