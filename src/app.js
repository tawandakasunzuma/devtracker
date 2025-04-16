// Roadmap data
const roadmapData = [
    {
        sectionName: "HTML",
        listOfTopics: [
            {
                title: "HTML Basics",
                checked: false,
                notes: ""
            }
        ]
    },
    {
        sectionName: "CSS",
        listOfTopics: [
            {
                title: "CSS Fundamentals",
                checked: false,
                notes: "" 
            },
            {
                title: "Flexbox & Grid",
                checked: false,
                notes: ""
            },
            {
                title: "Responsive Design",
                checked: false,
                notes: ""
            }
        ]
    },
    {
        sectionName: "JavaScript",
        listOfTopics: [
            {
                title: "JavaScript Basics",
                checked: false,
                notes: ""
            },
            {
                title: "DOM Manipulation",
                checked: false,
                notes: ""
            },
            {
                title: "Using Fetch API",
                checked: false,
                notes: ""
            },
            {
                title: "ES6+ Features",
                checked: false,
                notes: ""
            }
        ]
    },
    {
        sectionName: "Frameworks $ Tooling",
        listOfTopics: [
            {
                title: "Tooling (npm, webpack, etc.)",
                checked: false,
                notes: ""
            },
            {
                title: "Basic React",
                checked: false,
                notes: ""
            }
        ]
    }
]

// Content container
const content = document.getElementById("content");

// Loop through roadmap data
for (let i = 0; i < roadmapData.length; i++) {
    const section = document.createElement("section");

    const sectionHeading = document.createElement("h3");
    sectionHeading.innerHTML = roadmapData[i].sectionName;
    sectionHeading.classList.add("section-heading");

    const cardList = document.createElement("div");

    section.append(sectionHeading,cardList);
    content.append(section)
}