// Roadmap data
let roadmapData = [
    {
        sectionName: "HTML",
        listOfTopics: [
            {
                id: "html-basics",
                title: "HTML Basics",
                description: "Defines the structure and content of web pages.",
                checked: false,
                notes: ""
            }
        ]
    },
    {
        sectionName: "CSS",
        listOfTopics: [
            {
                id: "css-fundamentals",
                title: "CSS Fundamentals",
                description: "Styles elements using color, layout, and spacing rules.",
                checked: false,
                notes: "" 
            },
            {
                id: "flexbox-and-grid",
                title: "Flexbox & Grid",
                description: "Layout systems for aligning and organizing page elements.",
                checked: false,
                notes: ""
            },
            {
                id: "responsive-design",
                title: "Responsive Design",
                description: "Ensures websites look good on all screen sizes.",
                checked: false,
                notes: ""
            }
        ]
    },
    {
        sectionName: "JavaScript",
        listOfTopics: [
            {
                id: "javascript-basics",
                title: "JavaScript Basics",
                description: "Core language for adding behavior and interactivity to websites.",
                checked: false,
                notes: ""
            },
            {
                id: "dom-manipulation",
                title: "DOM Manipulation",
                description: "Accesses and updates page elements dynamically with JavaScript.",
                checked: false,
                notes: ""
            },
            {
                id: "using-fetch-api",
                title: "Using Fetch API",
                description: "Retrieves data from servers or APIs using JavaScript.",
                checked: false,
                notes: ""
            },
            {
                id: "es6+-features",
                title: "ES6+ Features",
                description: "Modern JavaScript improvements like arrow functions and let/const.",
                checked: false,
                notes: ""
            }
        ]
    },
    {
        sectionName: "Frameworks & Tooling",
        listOfTopics: [
            {
                id: "tooling",
                title: "Tooling",
                description: "Tools for dependency management and efficient development workflows.",
                checked: false,
                notes: ""
            },
            {
                id: "basic-react",
                title: "Basic React",
                description: "JavaScript library for building fast, component-based user interfaces.",
                checked: false,
                notes: ""
            }
        ]
    }
]

// Content container
const content = document.getElementById("content");

// Read from localStorage Data
const saved = localStorage.getItem("devTrackerData");

// Check if data null
if (saved) {
    try {
        // Load save roadmapData from localStorage
        roadmapData = JSON.parse(saved);
    }
    catch (err) {
        // Fallback to default if not found
        console.error("Failed to parse saved roadmap data:", err);
    }
}

// Read from localStorage Theme
const savedTheme = localStorage.getItem("theme")

// Set theme
if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
} else {
    document.documentElement.setAttribute("data-theme", "light");
}

// Change theme button
const themeButton = document.getElementById("change-theme");

// Initialize button label on page load
themeButton.textContent = savedTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";

// Theme button event listener
themeButton.addEventListener("click", () => {
    // Read current data theme on html
    const html = document.documentElement;
    const currentTheme = html.getAttribute("data-theme");
    // Compute the new mode
    const nextMode = currentTheme === "dark" ? "light" : "dark";
    // Update the attribute
    html.setAttribute("data-theme", nextMode);
    // Save to localStorage
    localStorage.setItem("theme", nextMode);
    // Change Text
    themeButton.textContent = nextMode === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"; 
});

// Loop through roadmap data and create different sections
for (let i = 0; i < roadmapData.length; i++) {
    // Create section
    const section = document.createElement("section");
    section.classList.add("section");

    // Create heading
    const sectionHeading = document.createElement("h3");
    sectionHeading.classList.add("section-heading");
    sectionHeading.innerHTML = roadmapData[i].sectionName;
    // Create card list
    const cardList = document.createElement("div");
    cardList.classList.add("card-list");

    // Append heading and card list into section
    section.append(sectionHeading,cardList);

    roadmapData[i].listOfTopics.forEach(topic => {
        // Create topic card
        const topicCard = document.createElement("div");
        topicCard.classList.add("topic-card");

        // Create checkbox
        const checkBox = document.createElement("input");
        checkBox.classList.add("checkbox");
        checkBox.type = "checkbox";
        checkBox.checked = topic.checked;
        
            // Checkbox event listener
            checkBox.addEventListener("change", (event) => {
                if (event.target.checked) {
                    topic.checked = true;
                } else {
                    topic.checked = false;
                }
                // Calculate percentage of progress
                calculateSectionProgress ();
                // Save progress to localStorage
                saveProgress ();
            });

        // Create topic title
        const topicTitle = document.createElement("p");
        topicTitle.classList.add("topic-name");
        topicTitle.innerHTML = topic.title;

        // Create description
        const description = document.createElement("p");
        description.classList.add("description");
        description.innerHTML = topic.description;

        // Create note icon
        const noteIcon = document.createElement("span");
        noteIcon.classList.add("note-icon");
        noteIcon.innerHTML = "📝";

        // Click event listener on note icon
        noteIcon.addEventListener("click", () => {
            // Declare values
            const notePopup = document.getElementById("note-popup");
            const noteTitle = document.getElementById("note-title");
            const noteText = document.getElementById("note-text");
            const overlay = document.getElementById("overlay");
            // Turn on displays
            notePopup.style.display = "flex";
            overlay.style.display = "block";
            noteTitle.innerHTML = topic.title;
            noteText.innerHTML = topic.notes;
            // Create save btn and close btn
            const saveBtn = document.getElementById("save-note-btn");
            const closeBtn = document.getElementById("close-note-btn");
            //Save btn event listener
            saveBtn.addEventListener("click", () => {
                // Save progress to localStorage
                noteIcon.innerHTML = noteText.value;
                topic.notes = noteText.value;
                saveProgress ();
                // Hide popup
                notePopup.style.display = "none";
                // Hide overlay
                overlay.style.display = "none";
            })
            // Delete btn event listener
            closeBtn.addEventListener("click", () => {
                notePopup.style.display = "none";
                // Hide overlay
                overlay.style.display = "none";
            })
        })

        // Append into topic card
        topicCard.append(checkBox,topicTitle,description,noteIcon);

        // Append topic card into section
        cardList.append(topicCard);
    })

    // Append into content on DOM
    content.append(section)
}

// Search event listener
const searchInput = document.getElementById("search-input");
const topicCards = document.querySelectorAll(".topic-card");

searchInput.addEventListener("input", () => {
    const filterText = searchInput.value.trim().toLowerCase();
    topicCards.forEach(card => {
        const titleName = card.querySelector(".topic-name");
        const cardTitle = titleName.textContent.toLowerCase();
        if (cardTitle.includes(filterText)) {
            card.style.display = "";
            setTimeout(() => {
                card.style.opacity = "1";
            }, 300)
        } else {
            card.style.opacity = "0";
            setTimeout(() => {
                card.style.display = "none";
            }, 300)
        }
    })
});

// Clear search event listener
const clearSearch = document.getElementById("clear-search");
clearSearch.addEventListener("click", () => {
    searchInput.value = "";
    topicCards.forEach(topic => {
        topic.style.display = "";
        topic.style.opacity = "1";
    });
    searchInput.focus();
})

// Reload 
calculateSectionProgress ();

// Progress function

function calculateSectionProgress () {
    // Calculate percentage
    const totalTopics = roadmapData.reduce((acc, section) => acc + section.listOfTopics.length, 0);
    const topicsCompleted = roadmapData.reduce((acc, section) => acc + section.listOfTopics.filter(t => t.checked).length, 0);
    const competedPercentage = Math.round((topicsCompleted / totalTopics) * 100);

    // Update progress bar
    const progressBar = document.getElementById("progress-bar");
    progressBar.style.width = `${competedPercentage}%`;
    progressBar.style.animation = "none";

    // Update color
    if (competedPercentage <= 25) {
        progressBar.style.backgroundColor = "red";
    } else if (competedPercentage === 100 ) {
        progressBar.style.backgroundColor = "green";
    } else {
        progressBar.style.backgroundColor = "var(--primary-color)"
    }
}

// Save progress function

function saveProgress () {
    localStorage.setItem("devTrackerData", JSON.stringify(roadmapData))
}

// Clear progress

const clearProgress = document.getElementById("clear-storage");
clearProgress.addEventListener("click", () => {
    localStorage.removeItem("devTrackerData");
    location.reload();
})