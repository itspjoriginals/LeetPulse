document.addEventListener("DOMContentLoaded", () => {
  /* =======================
     DOM ELEMENTS
  ======================= */
  const searchBtn = document.getElementById("search-btn");
  const usernameInput = document.getElementById("user-input");

  const easyCircle = document.querySelector(".easy-progress");
  const mediumCircle = document.querySelector(".medium-progress");
  const hardCircle = document.querySelector(".hard-progress");

  const easyLabel = document.getElementById("easy-level");
  const mediumLabel = document.getElementById("medium-level");
  const hardLabel = document.getElementById("hard-level");

  const statsCard = document.querySelector(".stats-card");
  const container = document.querySelector(".container");

  /* =======================
     CONSTANTS
  ======================= */
  const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
  const GRAPHQL_URL = "https://leetcode.com/graphql/";

  /* =======================
     UTILITIES
  ======================= */
  function isValidUsername(username) {
    return /^[a-zA-Z0-9_-]{3,20}$/.test(username);
  }

  function setLoading(isLoading) {
    searchBtn.textContent = isLoading ? "Fetching..." : "Search";
    searchBtn.disabled = isLoading;
    container.classList.toggle("loading", isLoading);
  }

  function resetUI() {
    updateProgress(0, 1, easyLabel, easyCircle);
    updateProgress(0, 1, mediumLabel, mediumCircle);
    updateProgress(0, 1, hardLabel, hardCircle);
    statsCard.innerHTML = "";
  }

  function updateProgress(solved, total, label, circle) {
    const percentage = total ? (solved / total) * 100 : 0;
    circle.style.setProperty("--progress-degree", `${percentage}%`);
    label.textContent = `${solved}/${total}`;
  }

  function mapByDifficulty(arr) {
    return arr.reduce((acc, item) => {
      acc[item.difficulty] = item;
      return acc;
    }, {});
  }

  function showError(message) {
    statsCard.innerHTML = `
      <p style="color:#f87171; text-align:center; width:100%;">
        ${message}
      </p>`;
  }

  /* =======================
     API
  ======================= */
  async function fetchUserStats(username) {
    // Cache check
    const cached = localStorage.getItem(`leetmetric-${username}`);
    if (cached) {
      return JSON.parse(cached);
    }

    const query = {
      query: `
        query userSessionProgress($username: String!) {
          allQuestionsCount {
            difficulty
            count
          }
          matchedUser(username: $username) {
            submitStats {
              acSubmissionNum {
                difficulty
                count
              }
              totalSubmissionNum {
                difficulty
                submissions
              }
            }
          }
        }
      `,
      variables: { username }
    };

    const response = await fetch(PROXY_URL + GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(query)
    });

    if (!response.ok) {
      throw new Error("Network error");
    }

    const data = await response.json();

    if (!data.data || !data.data.matchedUser) {
      throw new Error("User not found");
    }

    localStorage.setItem(
      `leetmetric-${username}`,
      JSON.stringify(data)
    );

    return data;
  }

  /* =======================
     RENDER
  ======================= */
  function renderStats(data) {
    const totalMap = mapByDifficulty(data.data.allQuestionsCount);
    const solvedMap = mapByDifficulty(
      data.data.matchedUser.submitStats.acSubmissionNum
    );
    const submissionMap = mapByDifficulty(
      data.data.matchedUser.submitStats.totalSubmissionNum
    );

    updateProgress(
      solvedMap.Easy.count,
      totalMap.Easy.count,
      easyLabel,
      easyCircle
    );

    updateProgress(
      solvedMap.Medium.count,
      totalMap.Medium.count,
      mediumLabel,
      mediumCircle
    );

    updateProgress(
      solvedMap.Hard.count,
      totalMap.Hard.count,
      hardLabel,
      hardCircle
    );

    statsCard.innerHTML = `
      <div class="card">
        <h3>Total Submissions</h3>
        <p>${submissionMap.All.submissions}</p>
      </div>
      <div class="card">
        <h3>Easy Submissions</h3>
        <p>${submissionMap.Easy.submissions}</p>
      </div>
      <div class="card">
        <h3>Medium Submissions</h3>
        <p>${submissionMap.Medium.submissions}</p>
      </div>
      <div class="card">
        <h3>Hard Submissions</h3>
        <p>${submissionMap.Hard.submissions}</p>
      </div>
    `;
  }

  /* =======================
     HANDLER
  ======================= */
  async function handleSearch() {
    const username = usernameInput.value.trim();

    if (!isValidUsername(username)) {
      showError("Please enter a valid LeetCode username");
      return;
    }

    resetUI();
    setLoading(true);

    try {
      const data = await fetchUserStats(username);
      renderStats(data);
    } catch (error) {
      showError(error.message);
    } finally {
      setLoading(false);
    }
  }

  /* =======================
     EVENTS
  ======================= */
  searchBtn.addEventListener("click", handleSearch);

  usernameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  });
});
