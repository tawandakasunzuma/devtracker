// Roadmap data
const roadmapData = [
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
    cardList.classList.add("card-list")

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
            });
        
        // Create topic title
        const topicTitle = document.createElement("p");
        topicTitle.classList.add("topic-name");
        topicTitle.innerHTML = topic.title;

        // Create description
        const description = document.createElement("p");
        description.classList.add("description"),
        description.innerHTML = topic.description;

        // Create note icon
        const noteIcon = document.createElement("span");
        noteIcon.classList.add("note-icon");
        noteIcon.innerHTML = "📝";

        // Create progress percentage
        const progressPercentage = document.createElement("span");
        progressPercentage.classList.add("progress");
        progressPercentage.innerHTML = "0%";

        // Append into topic card
        topicCard.append(checkBox,topicTitle,description,noteIcon,progressPercentage);

        // Append topic card into section
        cardList.append(topicCard);
    })

    // Append into content on DOM
    content.append(section)
}