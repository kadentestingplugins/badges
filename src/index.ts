const badgeConfig = {
  "default": "https://i.imgur.com/jmfdykW.png",
  "nitro": "https://i.imgur.com/hKZ8OwZ.png",
  "staff": "https://i.imgur.com/dheDAzL.png",
  "early_supporter": "https://i.imgur.com/xC0n7xv.png",
  "hypesquad_events": "https://i.imgur.com/PDmdo5Z.png",
  "hypesquad_bravery": "https://i.imgur.com/9X9phTx.png",
  "hypesquad_brilliance": "https://i.imgur.com/dLPPrbg.png",
  "hypesquad_balance": "https://i.imgur.com/y3gZ4bE.png",
  "partner": "https://i.imgur.com/1S2C9Q8.png",
  "bug_hunter": "https://i.imgur.com/8Lm5V7L.png",
  "bug_hunter_level_2": "https://i.imgur.com/ywJLoy0.png",
  "verified_bot_developer": "https://i.imgur.com/z26OS8I.png",
  "discord_employee": "https://i.imgur.com/8IgWqTS.png",
  "discord_certified_moderator": "https://i.imgur.com/YmBQD9K.png",
  "custom": null,
};

function setBadge(badge) {
  let badgeUrl = null;
  if (badge === "custom") {
    const customBadgeInput = document.getElementById("custom-badge-url");
    badgeUrl = customBadgeInput.value;
  } else {
    badgeUrl = badgeConfig[badge];
  }
  if (badgeUrl) {
    const badgeElement = document.querySelector("[data-badge]");
    badgeElement.style.backgroundImage = `url('${badgeUrl}')`;
  }
}

function buildSettings() {
  const settingsContainer = document.createElement("div");

  const customBadgeLabel = document.createElement("label");
  customBadgeLabel.textContent = "Custom Badge URL:";
  const customBadgeInput = document.createElement("input");
  customBadgeInput.type = "text";
  customBadgeInput.id = "custom-badge-url";
  customBadgeInput.value = badgeConfig.custom;
  customBadgeInput.addEventListener("input", () => {
    badgeConfig.custom = customBadgeInput.value;
    setBadge("custom");
  });
  customBadgeLabel.appendChild(customBadgeInput);
  settingsContainer.appendChild(customBadgeLabel);

  for (const [badgeName, badgeUrl] of Object.entries(badgeConfig)) {
    const badgeLabel = document.createElement("label");
    badgeLabel.textContent = badgeName;
    const badgeInput = document.createElement("input");
    badgeInput.type = "radio";
    badgeInput.name = "badge";
    badgeInput.value = badgeName;
    if (badgeName === "default") {
      badgeInput.checked = true;
    }
    badgeInput.addEventListener("change", () => {
      setBadge(badgeName);
    });
    badgeLabel.appendChild(badgeInput);
    settingsContainer.appendChild(badgeLabel);
  }

  return settingsContainer;
}

function applySettings() {
  const selectedBadge = document.querySelector("[name=badge]:checked").value;
  setBadge(selectedBadge);
}

function createBadgeElement() {
  const badgeElement = document.createElement("div");
  badgeElement.style.backgroundImage = `url('${badgeConfig.default}')`;
  badgeElement.style.backgroundRepeat = "no-repeat";
  badgeElement.style.backgroundSize = "contain";
  badgeElement.style.width = "32px";
  badgeElement.style.height = "32px";
  badgeElement.style.marginLeft = "8px";
  badgeElement.dataset.badge = "";
  return badgeElement;
}

function initialize() {
  const userPopout = document.querySelector(".userPopout-4pfA0d");
  if (!userPopout) {
    return;
  }

  const badgesWrapper = userPopout.querySelector(
    ".headerBadgeList-17T-qI"
  );
  if (!badgesWrapper) {
    return;
  }

  const badgeElement = createBadgeElement();
  badgesWrapper.appendChild(badgeElement);

  const settingsButton = userPopout.querySelector(
    ".headerBadgeButton-2J5NQ2"
  );
  settingsButton.addEventListener("click", () => {
    const settingsModal = document.createElement("div");
    settingsModal.className = "modal-1UGdnR";
    settingsModal.innerHTML = `
      <div class="inner-3fwTL2">
        <div class="header-2xO7vT">Personal Badges</div>
        <div class
