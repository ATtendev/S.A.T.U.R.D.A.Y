import { getDevices } from "./media.js";

// Create an empty array to store the transcriptions
let transcriptionsArray = [];

export function updateTranscriptions(role, text) {
  // Determine the role to display based on the input role
  const displayRole = role === "you" ? "you" : "bot";

  // Add the new transcription to the array with the displayRole
  transcriptionsArray.push({ role: displayRole, text });

  // Update the display with the updated array of transcriptions
  const div = document.getElementById("transcriptions");

  // Clear the previous content
  div.innerHTML = "";

  // Loop through the array and create bubble chat elements for each transcription
  transcriptionsArray.forEach(({ role, text }) => {
    const bubbleChat = document.createElement("div");
    bubbleChat.classList.add("flex", "flex-col", "my-2");

    const bubble = document.createElement("div");
    bubble.classList.add(
      role === "you" ? "bg-green-500" : "bg-blue-500",
      "text-white",
      "py-2",
      "px-4",
      "rounded-lg",
      "max-w-3/4",
      "mb-2",
      role === "you" ? "mr-auto" : "ml-auto"
    );

    const paragraph = document.createElement("p");
    paragraph.innerText = text;

    bubble.appendChild(paragraph);
    bubbleChat.appendChild(bubble);

    div.appendChild(bubbleChat);
  });
}

export async function initializeDeviceSelect() {
  const videoSelect = document.getElementById("camera");
  const audioSelect = document.getElementById("mic");

  const { videoDevices, audioDevices } = await getDevices();

  videoSelect.disabled = false;
  videoDevices.forEach((device, index) => {
    videoSelect.options[index] = new Option(device.label, device.deviceId);
  });

  audioSelect.disabled = false;
  audioDevices.forEach((device, index) => {
    audioSelect.options[index] = new Option(device.label, device.deviceId);
  });
}
