
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
              },
              {
                id: "10002",
                courseId: "1001",
                title: "Shakespeare's Tragedies",
                description: "Analyzing the themes and characters in Shakespeare's most famous tragic plays.",
                content: "William Shakespeare's tragedies are among the most powerful works in the English language. In this lesson, we'll examine plays like Hamlet, Macbeth, and King Lear, focusing on their complex characters, moral dilemmas, and philosophical depths...",
                duration: "50 minutes",
                order: 2,
                slug: "shakespeare-tragedies",
                questions: [
                  {
                    id: "100003",
                    lessonId: "10002",
                    question: "Which of these is NOT one of Shakespeare's tragedies?",
                    answer: "A Midsummer Night's Dream",
                    options: ["Hamlet", "Macbeth", "A Midsummer Night's Dream", "Othello"],
                    type: "multiple-choice"
                  }
                ]
              }
            ]
          },
          {
            id: "1002",
            departmentId: "101",
            name: "Poetry and Poetic Forms",
            instructor: "Dr. Maya Angelou",
            description: "Discover the beauty and power of poetry through various forms, techniques, and traditions.",
            image: "/placeholder.svg",
            difficulty: "Intermediate",
            duration: "6 weeks",
            slug: "poetry-poetic-forms",
            lessons: [
              {
                id: "10003",
                courseId: "1002",
                title: "Sonnets and Structured Forms",
                description: "Understanding the rules and variations of formal poetry structures.",
                content: "In this lesson, we will explore the precise structures of formal poetry, focusing particularly on the sonnet form pioneered by Petrarch and adapted by Shakespeare...",
                duration: "45 minutes",
                order: 1,
                slug: "sonnets-structured-forms",
                questions: [
                  {
                    id: "100004",
                    lessonId: "10003",
                    question: "How many lines does a traditional sonnet have?",
                    answer: "14",
                    options: ["12", "14", "16", "20"],
                    type: "multiple-choice"
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
        courses: [
          {
            id: "1003",
            departmentId: "102",
            name: "Introduction to Ethics",
            instructor: "Dr. Peter Singer",
            description: "Explore major ethical theories and their applications to contemporary moral problems.",
            image: "/placeholder.svg",
            difficulty: "Beginner",
            duration: "10 weeks",
            slug: "intro-ethics",
            lessons: [
              {
                id: "10004",
                courseId: "1003",
                title: "Utilitarianism",
                description: "Examining the ethical theory that actions are right if they promote happiness or pleasure.",
                content: "In this lesson, we'll explore utilitarianism as developed by Jeremy Bentham and John Stuart Mill. We'll discuss the principle of utility, the greatest happiness principle, and various objections to utilitarian thinking...",
                duration: "60 minutes",
                order: 1,
                slug: "utilitarianism",
                questions: [
                  {
                    id: "100005",
                    lessonId: "10004",
                    question: "Who wrote 'Utilitarianism' in 1861?",
                    answer: "John Stuart Mill",
                    options: ["Jeremy Bentham", "John Stuart Mill", "Immanuel Kant", "Aristotle"],
                    type: "multiple-choice"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "103",
        facultyId: "1",
        name: "Visual Arts",
        description: "Explore drawing, painting, sculpture, photography, and digital art forms.",
        slug: "visual-arts",
        courses: [
          {
            id: "1004",
            departmentId: "103",
            name: "History of Modern Art",
            instructor: "Prof. Frida Rivera",
            description: "Trace the development of art from Impressionism to contemporary movements.",
            image: "/placeholder.svg",
            difficulty: "Intermediate",
            duration: "12 weeks",
            slug: "modern-art-history",
            lessons: [
              {
                id: "10005",
                courseId: "1004",
                title: "Impressionism and Post-Impressionism",
                description: "Exploring the revolutionary art movements of the late 19th century.",
                content: "This lesson examines how artists like Monet, Renoir, Van Gogh, and Cézanne broke with academic traditions to create new ways of seeing and representing the world...",
                duration: "55 minutes",
                order: 1,
                slug: "impressionism",
                questions: [
                  {
                    id: "100006",
                    lessonId: "10005",
                    question: "Which artist is known for 'The Starry Night'?",
                    answer: "Vincent van Gogh",
                    options: ["Claude Monet", "Vincent van Gogh", "Pablo Picasso", "Salvador Dalí"],
                    type: "multiple-choice"
                  }
                ]
              }
            ]
          }
        ]
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
            lessons: [
              {
                id: "20001",
                courseId: "2001",
                title: "Wave-Particle Duality",
                description: "Understanding how quantum objects behave as both waves and particles.",
                content: "This lesson explores the revolutionary concept of wave-particle duality, from the double-slit experiment to its implications for our understanding of reality...",
                duration: "65 minutes",
                order: 1,
                slug: "wave-particle-duality",
                questions: [
                  {
                    id: "200001",
                    lessonId: "20001",
                    question: "Which experiment first demonstrated the wave-like properties of electrons?",
                    answer: "The Davisson-Germer experiment",
                    options: ["Young's double-slit experiment", "The Davisson-Germer experiment", "The Stern-Gerlach experiment", "The Michelson-Morley experiment"],
                    type: "multiple-choice"
                  }
                ]
              }
            ]
          },
          {
            id: "2002",
            departmentId: "201",
            name: "Classical Mechanics",
            instructor: "Dr. Isaac Newton",
            description: "Learn the fundamental principles of motion, forces, and energy.",
            image: "/placeholder.svg",
            difficulty: "Intermediate",
            duration: "10 weeks",
            slug: "classical-mechanics",
            lessons: [
              {
                id: "20002",
                courseId: "2002",
                title: "Newton's Laws of Motion",
                description: "Understanding the three fundamental laws that describe the relationship between motion and force.",
                content: "This lesson covers Newton's three laws of motion and how they form the foundation of classical mechanics...",
                duration: "50 minutes",
                order: 1,
                slug: "newtons-laws",
                questions: [
                  {
                    id: "200002",
                    lessonId: "20002",
                    question: "What is Newton's First Law also known as?",
                    answer: "The Law of Inertia",
                    options: ["The Law of Inertia", "The Law of Acceleration", "The Law of Action and Reaction", "The Law of Gravitation"],
                    type: "multiple-choice"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "202",
        facultyId: "2",
        name: "Biology",
        description: "Explore the living world from molecular structures to ecosystems.",
        slug: "biology",
        courses: [
          {
            id: "2003",
            departmentId: "202",
            name: "Cellular Biology",
            instructor: "Dr. Rosalind Franklin",
            description: "Discover the structure, function, and processes of cells, the basic units of life.",
            image: "/placeholder.svg",
            difficulty: "Intermediate",
            duration: "8 weeks",
            slug: "cellular-biology",
            lessons: [
              {
                id: "20003",
                courseId: "2003",
                title: "Cell Structure and Organelles",
                description: "Examining the components of eukaryotic and prokaryotic cells.",
                content: "This lesson explores the intricate structures within cells and how they function together to support life...",
                duration: "55 minutes",
                order: 1,
                slug: "cell-structure",
                questions: [
                  {
                    id: "200003",
                    lessonId: "20003",
                    question: "Which organelle is known as the 'powerhouse of the cell'?",
                    answer: "Mitochondria",
                    options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi apparatus"],
                    type: "multiple-choice"
                  }
                ]
              }
            ]
          },
          {
            id: "2004",
            departmentId: "202",
            name: "Evolutionary Biology",
            instructor: "Dr. Charles Wallace",
            description: "Understand the processes and mechanisms that drive biological diversity and adaptation.",
            image: "/placeholder.svg",
            difficulty: "Beginner",
            duration: "6 weeks",
            slug: "evolutionary-biology",
            lessons: [
              {
                id: "20004",
                courseId: "2004",
                title: "Natural Selection and Adaptation",
                description: "Understanding Darwin's theory and how species adapt to their environments.",
                content: "This lesson covers the core principles of natural selection, the evidence supporting it, and how it leads to adaptation and speciation...",
                duration: "60 minutes",
                order: 1,
                slug: "natural-selection",
                questions: [
                  {
                    id: "200004",
                    lessonId: "20004",
                    question: "In which year was 'On the Origin of Species' published?",
                    answer: "1859",
                    options: ["1809", "1859", "1882", "1900"],
                    type: "multiple-choice"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "203",
        facultyId: "2",
        name: "Chemistry",
        description: "Study the composition, properties, and transformations of matter.",
        slug: "chemistry",
        courses: [
          {
            id: "2005",
            departmentId: "203",
            name: "Organic Chemistry Fundamentals",
            instructor: "Dr. Marie Curie",
            description: "Explore the chemistry of carbon compounds and their applications.",
            image: "/placeholder.svg",
            difficulty: "Advanced",
            duration: "14 weeks",
            slug: "organic-chemistry",
            lessons: [
              {
                id: "20005",
                courseId: "2005",
                title: "Introduction to Functional Groups",
                description: "Understanding the key structures that determine chemical reactivity.",
                content: "This lesson introduces the major functional groups in organic chemistry and their properties...",
                duration: "70 minutes",
                order: 1,
                slug: "functional-groups",
                questions: [
                  {
                    id: "200005",
                    lessonId: "20005",
                    question: "Which functional group is characterized by the C=O bond?",
                    answer: "Carbonyl",
                    options: ["Hydroxyl", "Carbonyl", "Carboxyl", "Amino"],
                    type: "multiple-choice"
                  }
                ]
              }
            ]
          }
        ]
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
            lessons: [
              {
                id: "30001",
                courseId: "3001",
                title: "The Brain and Behavior",
                description: "Understanding how brain structure and function influence human behavior.",
                content: "This lesson explores the relationship between neuroanatomy, neurochemistry, and psychological processes...",
                duration: "55 minutes",
                order: 1,
                slug: "brain-behavior",
                questions: [
                  {
                    id: "300001",
                    lessonId: "30001",
                    question: "Which part of the brain is primarily responsible for memory formation?",
                    answer: "Hippocampus",
                    options: ["Amygdala", "Hippocampus", "Cerebellum", "Frontal lobe"],
                    type: "multiple-choice"
                  }
                ]
              }
            ]
          },
          {
            id: "3002",
            departmentId: "301",
            name: "Abnormal Psychology",
            instructor: "Dr. Sigmund Freud",
            description: "Study psychological disorders, their causes, symptoms, and treatments.",
            image: "/placeholder.svg",
            difficulty: "Intermediate",
            duration: "12 weeks",
            slug: "abnormal-psychology",
            lessons: [
              {
                id: "30002",
                courseId: "3002",
                title: "Anxiety Disorders",
                description: "Understanding the different types of anxiety disorders and their treatments.",
                content: "This lesson covers the symptoms, causes, and therapeutic approaches for various anxiety disorders...",
                duration: "60 minutes",
                order: 1,
                slug: "anxiety-disorders",
                questions: [
                  {
                    id: "300002",
                    lessonId: "30002",
                    question: "Which therapy is considered most effective for treating specific phobias?",
                    answer: "Exposure therapy",
                    options: ["Psychoanalysis", "Exposure therapy", "Play therapy", "Art therapy"],
                    type: "multiple-choice"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "302",
        facultyId: "3",
        name: "Economics",
        description: "Study the production, distribution, and consumption of goods and services.",
        slug: "economics",
        courses: [
          {
            id: "3003",
            departmentId: "302",
            name: "Macroeconomics Principles",
            instructor: "Dr. John Keynes",
            description: "Understand how economies function at the national and global levels.",
            image: "/placeholder.svg",
            difficulty: "Intermediate",
            duration: "8 weeks",
            slug: "macroeconomics",
            lessons: [
              {
                id: "30003",
                courseId: "3003",
                title: "GDP and Economic Growth",
                description: "Understanding how we measure economic output and prosperity.",
                content: "This lesson explores the calculation and significance of Gross Domestic Product as a measure of economic health...",
                duration: "50 minutes",
                order: 1,
                slug: "gdp-economic-growth",
                questions: [
                  {
                    id: "300003",
                    lessonId: "30003",
                    question: "Which of the following is NOT included in GDP calculations?",
                    answer: "Used goods transactions",
                    options: ["Government spending", "Consumer spending", "Used goods transactions", "Business investments"],
                    type: "multiple-choice"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "303",
        facultyId: "3",
        name: "Sociology",
        description: "Examine human society, social relationships, and institutions.",
        slug: "sociology",
        courses: [
          {
            id: "3004",
            departmentId: "303",
            name: "Social Inequality",
            instructor: "Dr. Max Weber",
            description: "Explore the causes and consequences of inequality in human societies.",
            image: "/placeholder.svg",
            difficulty: "Intermediate",
            duration: "9 weeks",
            slug: "social-inequality",
            lessons: [
              {
                id: "30004",
                courseId: "3004",
                title: "Class, Status, and Power",
                description: "Understanding different dimensions of stratification in society.",
                content: "This lesson explores Weber's multidimensional approach to social stratification...",
                duration: "65 minutes",
                order: 1,
                slug: "class-status-power",
                questions: [
                  {
                    id: "300004",
                    lessonId: "30004",
                    question: "According to Weber, which of these is NOT a dimension of social stratification?",
                    answer: "Genetics",
                    options: ["Class", "Status", "Power", "Genetics"],
                    type: "multiple-choice"
                  }
                ]
              }
            ]
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
            lessons: [
              {
                id: "40001",
                courseId: "4001",
                title: "Front-End Fundamentals",
                description: "Building user interfaces with HTML, CSS, and JavaScript.",
                content: "This lesson covers the core technologies used to create interactive web interfaces...",
                duration: "75 minutes",
                order: 1,
                slug: "frontend-fundamentals",
                questions: [
                  {
                    id: "400001",
                    lessonId: "40001",
                    question: "Which language is primarily responsible for styling web pages?",
                    answer: "CSS",
                    options: ["HTML", "JavaScript", "CSS", "Python"],
                    type: "multiple-choice"
                  }
                ]
              }
            ]
          },
          {
            id: "4002",
            departmentId: "401",
            name: "Data Structures and Algorithms",
            instructor: "Dr. Alan Turing",
            description: "Master the fundamental building blocks of efficient computer programs.",
            image: "/placeholder.svg",
            difficulty: "Advanced",
            duration: "14 weeks",
            slug: "data-structures-algorithms",
            lessons: [
              {
                id: "40002",
                courseId: "4002",
                title: "Binary Search Trees",
                description: "Understanding hierarchical data structures for efficient searching.",
                content: "This lesson explores the implementation and operations of binary search trees...",
                duration: "70 minutes",
                order: 1,
                slug: "binary-search-trees",
                questions: [
                  {
                    id: "400002",
                    lessonId: "40002",
                    question: "What is the time complexity of searching in a balanced binary search tree?",
                    answer: "O(log n)",
                    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
                    type: "multiple-choice"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "402",
        facultyId: "4",
        name: "Electrical Engineering",
        description: "Study and application of electricity, electronics, and electromagnetism.",
        slug: "electrical-engineering",
        courses: [
          {
            id: "4003",
            departmentId: "402",
            name: "Circuit Analysis",
            instructor: "Dr. Nikola Tesla",
            description: "Learn to analyze and design electrical circuits using fundamental laws and theorems.",
            image: "/placeholder.svg",
            difficulty: "Intermediate",
            duration: "10 weeks",
            slug: "circuit-analysis",
            lessons: [
              {
                id: "40003",
                courseId: "4003",
                title: "Ohm's Law and Kirchhoff's Rules",
                description: "Understanding the fundamental laws governing electrical circuits.",
                content: "This lesson covers the mathematical relationships between voltage, current, and resistance in electrical networks...",
                duration: "60 minutes",
                order: 1,
                slug: "ohms-law-kirchhoff",
                questions: [
                  {
                    id: "400003",
                    lessonId: "40003",
                    question: "Ohm's Law states that voltage equals current multiplied by what?",
                    answer: "Resistance",
                    options: ["Power", "Resistance", "Capacitance", "Inductance"],
                    type: "multiple-choice"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "403",
        facultyId: "4",
        name: "Mechanical Engineering",
        description: "Study the design, analysis, and manufacturing of mechanical systems.",
        slug: "mechanical-engineering",
        courses: [
          {
            id: "4004",
            departmentId: "403",
            name: "Thermodynamics",
            instructor: "Dr. Sadi Carnot",
            description: "Explore the principles governing energy, heat, and work in physical systems.",
            image: "/placeholder.svg",
            difficulty: "Advanced",
            duration: "12 weeks",
            slug: "thermodynamics",
            lessons: [
              {
                id: "40004",
                courseId: "4004",
                title: "Laws of Thermodynamics",
                description: "Understanding the fundamental principles governing energy transformations.",
                content: "This lesson covers the four laws of thermodynamics and their applications in various systems...",
                duration: "65 minutes",
                order: 1,
                slug: "laws-thermodynamics",
                questions: [
                  {
                    id: "400004",
                    lessonId: "40004",
                    question: "The First Law of Thermodynamics is essentially a statement of what principle?",
                    answer: "Conservation of energy",
                    options: ["Entropy increase", "Conservation of energy", "Absolute zero", "Heat transfer"],
                    type: "multiple-choice"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "5",
    name: "Business & Management",
    description: "Develop skills in leadership, entrepreneurship, finance, and organizational management.",
    icon: "users",
    slug: "business-management",
    departments: [
      {
        id: "501",
        facultyId: "5",
        name: "Marketing",
        description: "Learn strategies for promoting products, services, and brands to target audiences.",
        slug: "marketing",
        courses: [
          {
            id: "5001",
            departmentId: "501",
            name: "Digital Marketing Fundamentals",
            instructor: "Prof. Gary Vaynerchuk",
            description: "Master the core concepts and tools of marketing in the digital age.",
            image: "/placeholder.svg",
            difficulty: "Beginner",
            duration: "8 weeks",
            slug: "digital-marketing",
            lessons: [
              {
                id: "50001",
                courseId: "5001",
                title: "Social Media Marketing Strategies",
                description: "Leveraging social platforms to build brand awareness and engagement.",
                content: "This lesson explores effective tactics for marketing on various social media platforms...",
                duration: "55 minutes",
                order: 1,
                slug: "social-media-marketing",
                questions: [
                  {
                    id: "500001",
                    lessonId: "50001",
                    question: "Which metric is most directly related to engagement on social media?",
                    answer: "Comments and shares",
                    options: ["Impressions", "Reach", "Comments and shares", "Follower count"],
                    type: "multiple-choice"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "502",
        facultyId: "5",
        name: "Finance",
        description: "Study the management of money, investments, and other financial assets.",
        slug: "finance",
        courses: [
          {
            id: "5002",
            departmentId: "502",
            name: "Investment Analysis",
            instructor: "Dr. Warren Buffett",
            description: "Learn to analyze and value investments using fundamental and technical methods.",
            image: "/placeholder.svg",
            difficulty: "Advanced",
            duration: "12 weeks",
            slug: "investment-analysis",
            lessons: [
              {
                id: "50002",
                courseId: "5002",
                title: "Fundamental Analysis",
                description: "Evaluating a company's financial health and intrinsic value.",
                content: "This lesson covers techniques for analyzing financial statements and valuing companies...",
                duration: "70 minutes",
                order: 1,
                slug: "fundamental-analysis",
                questions: [
                  {
                    id: "500002",
                    lessonId: "50002",
                    question: "Which ratio helps investors evaluate a company's debt burden?",
                    answer: "Debt-to-Equity Ratio",
                    options: ["Price-to-Earnings Ratio", "Return on Equity", "Debt-to-Equity Ratio", "Dividend Yield"],
                    type: "multiple-choice"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];
