const stages = [
  {
    title: "Stage 1",
    description:
      "Welcome to ACS' first event, Christmas Event 2024. Let's just get this straight, blablalbalblal...",
  },
  {
    title: "Stage 2",
    description:
      "Now that you're ready, let's get into the Christmas spirit. Remember to have fun and keep racing!",
  },
  {
    title: "Stage 3",
    description:
      "Final stage! Use your wits and racing skills to complete the event. Good luck!",
  },
];

let currentStage = 0;

document.getElementById("next-stage").addEventListener("click", () => {
  currentStage++;
  if (currentStage < stages.length) {
    document.getElementById("stage-title").textContent =
      stages[currentStage].title;
    document.getElementById("stage-description").textContent =
      stages[currentStage].description;
  } else {
    document.getElementById("stage-title").textContent = "Congratulations!";
    document.getElementById("stage-description").textContent =
      "You've completed the Christmas Event 2024! See you next year.";
    document.getElementById("next-stage").disabled = true;
    document.getElementById("next-stage").textContent = "Event Complete!";
  }
});
