
import { Faculty } from "@/types";

export const faculties: Faculty[] = [
  {
    id: "1",
    name: "Arts & Humanities",
    description: "Explore the creative and cultural aspects of human experience, from literature and philosophy to visual and performing arts.",
    icon: "book",
    slug: "arts-humanities",
    departments: [
      {
        id: "101",
        facultyId: "1",
        name: "Literature",
        description: "Study the great works of literature from around the world and throughout history.",
        slug: "literature",
        courses: [
          {
            id: "1001",
            departmentId: "101",
            name: "Introduction to World Literature",
            instructor: "Dr. Emily Brontë",
            description: "A survey of major works of world literature from ancient times to the present day.",
            image: "/placeholder.svg",
            difficulty: "Beginner",
            duration: "8 weeks",
            slug: "world-literature-intro",
            lessons: [
              {
                id: "10001",
                courseId: "1001",
                title: "Ancient Epic Poetry",
                description: "Examining the Iliad, the Odyssey, and the Epic of Gilgamesh.",
                content: "In this lesson, we'll explore the origins of epic poetry and its significance in ancient cultures. The earliest known literary works in Western civilization are epic poems that originated in oral traditions...",
                duration: "45 minutes",
                order: 1,
                slug: "ancient-epic-poetry",
                questions: [
                  {
                    id: "100001",
                    lessonId: "10001",
                    question: "Who is the author of the Iliad and the Odyssey?",
                    answer: "Homer",
                    options: ["Virgil", "Homer", "Sophocles", "Plato"],
                    type: "multiple-choice"
                  },
                  {
                    id: "100002",
                    lessonId: "10001",
                    question: "What is the main theme of the Epic of Gilgamesh?",
                    answer: "The quest for immortality and the acceptance of human mortality",
                    type: "open-ended"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "102",
        facultyId: "1",
        name: "Philosophy",
        description: "Engage with the fundamental questions of existence, knowledge, values, reason, mind, and language.",
        slug: "philosophy",
        courses: []
      }
    ]
  },
  {
    id: "2",
    name: "Sciences",
    description: "Discover the natural world through systematic study and experimentation in fields like physics, chemistry, and biology.",
    icon: "graduation-cap",
    slug: "sciences",
    departments: [
      {
        id: "201",
        facultyId: "2",
        name: "Physics",
        description: "Study matter, energy, and the fundamental forces that govern the universe.",
        slug: "physics",
        courses: [
          {
            id: "2001",
            departmentId: "201",
            name: "Quantum Mechanics Fundamentals",
            instructor: "Dr. Richard Quantum",
            description: "An introduction to the bizarre and fascinating world of quantum physics.",
            image: "/placeholder.svg",
            difficulty: "Advanced",
            duration: "12 weeks",
            slug: "quantum-mechanics",
            lessons: []
          }
        ]
      },
      {
        id: "202",
        facultyId: "2",
        name: "Biology",
        description: "Explore the living world from molecular structures to ecosystems.",
        slug: "biology",
        courses: []
      }
    ]
  },
  {
    id: "3",
    name: "Social Sciences",
    description: "Understand human behavior and societies through disciplines like psychology, economics, and anthropology.",
    icon: "users",
    slug: "social-sciences",
    departments: [
      {
        id: "301",
        facultyId: "3",
        name: "Psychology",
        description: "Study the mind and behavior through scientific research and clinical practice.",
        slug: "psychology",
        courses: [
          {
            id: "3001",
            departmentId: "301",
            name: "Introduction to Psychology",
            instructor: "Dr. Carl Rogers",
            description: "Explore the fundamentals of human behavior and mental processes.",
            image: "/placeholder.svg",
            difficulty: "Beginner",
            duration: "10 weeks",
            slug: "intro-psychology",
            lessons: []
          }
        ]
      }
    ]
  },
  {
    id: "4",
    name: "Technology & Engineering",
    description: "Apply scientific knowledge to design and build solutions to real-world problems.",
    icon: "settings",
    slug: "technology-engineering",
    departments: [
      {
        id: "401",
        facultyId: "4",
        name: "Computer Science",
        description: "Study the theory and practice of computation and its applications.",
        slug: "computer-science",
        courses: [
          {
            id: "4001",
            departmentId: "401",
            name: "Full-Stack Web Development",
            instructor: "Prof. Ada Lovelace",
            description: "Learn to build modern web applications from front-end to back-end.",
            image: "/placeholder.svg",
            difficulty: "Intermediate",
            duration: "16 weeks",
            slug: "fullstack-web-dev",
            lessons: []
          }
        ]
      }
    ]
  }
];
