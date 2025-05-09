
import { Faculty } from "@/types";

export const faculties: Faculty[] = [
  {
    id: "1",
    name: "Faculty of Science",
    description: "Discover the natural world through systematic study and experimentation across scientific disciplines.",
    icon: "graduation-cap",
    slug: "faculty-of-science",
    departments: [
      {
        id: "101",
        facultyId: "1",
        name: "Department of Physics",
        description: "Study matter, energy, and the fundamental forces that govern the universe.",
        slug: "physics",
        courses: [
          {
            id: "1001",
            departmentId: "101",
            name: "Quantum Mechanics Fundamentals",
            instructor: "Dr. Richard Quantum",
            description: "An introduction to the bizarre and fascinating world of quantum physics.",
            image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            difficulty: "Advanced",
            duration: "12 weeks",
            slug: "quantum-mechanics",
            lessons: [
              {
                id: "10001",
                courseId: "1001",
                title: "Wave-Particle Duality",
                description: "Understanding how quantum objects behave as both waves and particles.",
                content: "This lesson explores the revolutionary concept of wave-particle duality, from the double-slit experiment to its implications for our understanding of reality...",
                duration: "65 minutes",
                order: 1,
                slug: "wave-particle-duality",
                questions: [
                  {
                    id: "100001",
                    lessonId: "10001",
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
            id: "1002",
            departmentId: "101",
            name: "Classical Mechanics",
            instructor: "Dr. Isaac Newton",
            description: "Learn the fundamental principles of motion, forces, and energy.",
            image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            difficulty: "Intermediate",
            duration: "10 weeks",
            slug: "classical-mechanics",
            lessons: [
              {
                id: "10002",
                courseId: "1002",
                title: "Newton's Laws of Motion",
                description: "Understanding the three fundamental laws that describe the relationship between motion and force.",
                content: "This lesson covers Newton's three laws of motion and how they form the foundation of classical mechanics...",
                duration: "50 minutes",
                order: 1,
                slug: "newtons-laws",
                questions: [
                  {
                    id: "100002",
                    lessonId: "10002",
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
        id: "102",
        facultyId: "1",
        name: "Department of Chemistry",
        description: "Study the composition, properties, and transformations of matter.",
        slug: "chemistry",
        courses: [
          {
            id: "1003",
            departmentId: "102",
            name: "Organic Chemistry Fundamentals",
            instructor: "Dr. Marie Curie",
            description: "Explore the chemistry of carbon compounds and their applications.",
            image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            difficulty: "Advanced",
            duration: "14 weeks",
            slug: "organic-chemistry",
            lessons: [
              {
                id: "10003",
                courseId: "1003",
                title: "Introduction to Functional Groups",
                description: "Understanding the key structures that determine chemical reactivity.",
                content: "This lesson introduces the major functional groups in organic chemistry and their properties...",
                duration: "70 minutes",
                order: 1,
                slug: "functional-groups",
                questions: [
                  {
                    id: "100003",
                    lessonId: "10003",
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
      },
      {
        id: "103",
        facultyId: "1",
        name: "Department of Biological Sciences",
        description: "Explore the living world from molecular structures to ecosystems.",
        slug: "biological-sciences",
        courses: [
          {
            id: "1004",
            departmentId: "103",
            name: "Cellular Biology",
            instructor: "Dr. Rosalind Franklin",
            description: "Discover the structure, function, and processes of cells, the basic units of life.",
            image: "https://images.unsplash.com/photo-1530210124550-912dc1381cb8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            difficulty: "Intermediate",
            duration: "8 weeks",
            slug: "cellular-biology",
            lessons: [
              {
                id: "10004",
                courseId: "1004",
                title: "Cell Structure and Organelles",
                description: "Examining the components of eukaryotic and prokaryotic cells.",
                content: "This lesson explores the intricate structures within cells and how they function together to support life...",
                duration: "55 minutes",
                order: 1,
                slug: "cell-structure",
                questions: [
                  {
                    id: "100004",
                    lessonId: "10004",
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
            id: "1005",
            departmentId: "103",
            name: "Evolutionary Biology",
            instructor: "Dr. Charles Wallace",
            description: "Understand the processes and mechanisms that drive biological diversity and adaptation.",
            image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            difficulty: "Beginner",
            duration: "6 weeks",
            slug: "evolutionary-biology",
            lessons: [
              {
                id: "10005",
                courseId: "1005",
                title: "Natural Selection and Adaptation",
                description: "Understanding Darwin's theory and how species adapt to their environments.",
                content: "This lesson covers the core principles of natural selection, the evidence supporting it, and how it leads to adaptation and speciation...",
                duration: "60 minutes",
                order: 1,
                slug: "natural-selection",
                questions: [
                  {
                    id: "100005",
                    lessonId: "10005",
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
        id: "104",
        facultyId: "1",
        name: "Department of Mathematics and Statistics",
        description: "Study the abstract relationships among numbers, shapes, and quantities.",
        slug: "mathematics-statistics",
        courses: [
          {
            id: "1006",
            departmentId: "104",
            name: "Advanced Calculus",
            instructor: "Dr. Leonard Euler",
            description: "Explore differentiation, integration, and their applications in science and engineering.",
            image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            difficulty: "Advanced",
            duration: "12 weeks",
            slug: "advanced-calculus",
            lessons: [
              {
                id: "10006",
                courseId: "1006",
                title: "Multiple Integration",
                description: "Extending calculus to functions of several variables.",
                content: "This lesson covers double and triple integrals and their applications in calculating volumes, masses, and moments of inertia...",
                duration: "75 minutes",
                order: 1,
                slug: "multiple-integration",
                questions: [
                  {
                    id: "100006",
                    lessonId: "10006",
                    question: "Which coordinate system is most appropriate for problems with circular symmetry?",
                    answer: "Polar coordinates",
                    options: ["Cartesian coordinates", "Polar coordinates", "Spherical coordinates", "Cylindrical coordinates"],
                    type: "multiple-choice"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "105",
        facultyId: "1",
        name: "Department of Environmental Science",
        description: "Study the environment and environmental problems created by human activities.",
        slug: "environmental-science",
        courses: [
          {
            id: "1007",
            departmentId: "105",
            name: "Climate Change Science",
            instructor: "Dr. Greta Thunberg",
            description: "Understand the science behind climate change, its causes, effects, and potential solutions.",
            image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
            difficulty: "Intermediate",
            duration: "8 weeks",
            slug: "climate-change-science",
            lessons: [
              {
                id: "10007",
                courseId: "1007",
                title: "The Greenhouse Effect",
                description: "Understanding how greenhouse gases trap heat in Earth's atmosphere.",
                content: "This lesson explores the physics behind the greenhouse effect and how human activities have enhanced it...",
                duration: "60 minutes",
                order: 1,
                slug: "greenhouse-effect",
                questions: [
                  {
                    id: "100007",
                    lessonId: "10007",
                    question: "Which gas is the most abundant greenhouse gas in Earth's atmosphere?",
                    answer: "Water vapor",
                    options: ["Carbon dioxide", "Methane", "Water vapor", "Nitrous oxide"],
                    type: "multiple-choice"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "106",
        facultyId: "1",
        name: "Department of Earth and Space",
        description: "Study the Earth, its geological processes, and the universe beyond.",
        slug: "earth-space",
        courses: [
          {
            id: "1008",
            departmentId: "106",
            name: "Introduction to Astronomy",
            instructor: "Dr. Neil Tyson",
            description: "Explore the cosmos, from planets and stars to galaxies and the structure of the universe.",
            image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1111&q=80",
            difficulty: "Beginner",
            duration: "10 weeks",
            slug: "intro-astronomy",
            lessons: [
              {
                id: "10008",
                courseId: "1008",
                title: "The Solar System",
                description: "Understanding the structure and components of our solar system.",
                content: "This lesson covers the Sun, planets, moons, asteroids, comets, and other objects orbiting our star...",
                duration: "65 minutes",
                order: 1,
                slug: "solar-system",
                questions: [
                  {
                    id: "100008",
                    lessonId: "10008",
                    question: "Which planet has the most moons in our solar system?",
                    answer: "Saturn",
                    options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
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
    name: "Faculty of Engineering and Technology",
    description: "Apply scientific knowledge to design and build solutions to real-world problems.",
    icon: "settings",
    slug: "engineering-technology",
    departments: [
      {
        id: "201",
        facultyId: "2",
        name: "Department of Electrical Engineering",
        description: "Study and application of electricity, electronics, and electromagnetism.",
        slug: "electrical-engineering",
        courses: [
          {
            id: "2001",
            departmentId: "201",
            name: "Circuit Analysis",
            instructor: "Dr. Nikola Tesla",
            description: "Learn to analyze and design electrical circuits using fundamental laws and theorems.",
            image: "https://images.unsplash.com/photo-1621619856624-94ec7f0a53fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80",
            difficulty: "Intermediate",
            duration: "10 weeks",
            slug: "circuit-analysis",
            lessons: [
              {
                id: "20001",
                courseId: "2001",
                title: "Ohm's Law and Kirchhoff's Rules",
                description: "Understanding the fundamental laws governing electrical circuits.",
                content: "This lesson covers the mathematical relationships between voltage, current, and resistance in electrical networks...",
                duration: "60 minutes",
                order: 1,
                slug: "ohms-law-kirchhoff",
                questions: [
                  {
                    id: "200001",
                    lessonId: "20001",
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
        id: "202",
        facultyId: "2",
        name: "Department of Mechanical Engineering",
        description: "Study the design, analysis, and manufacturing of mechanical systems.",
        slug: "mechanical-engineering",
        courses: [
          {
            id: "2002",
            departmentId: "202",
            name: "Thermodynamics",
            instructor: "Dr. Sadi Carnot",
            description: "Explore the principles governing energy, heat, and work in physical systems.",
            image: "https://images.unsplash.com/photo-1581093458791-9a9cd7093db6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            difficulty: "Advanced",
            duration: "12 weeks",
            slug: "thermodynamics",
            lessons: [
              {
                id: "20002",
                courseId: "2002",
                title: "Laws of Thermodynamics",
                description: "Understanding the fundamental principles governing energy transformations.",
                content: "This lesson covers the four laws of thermodynamics and their applications in various systems...",
                duration: "65 minutes",
                order: 1,
                slug: "laws-thermodynamics",
                questions: [
                  {
                    id: "200002",
                    lessonId: "20002",
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
      },
      {
        id: "203",
        facultyId: "2",
        name: "Department of Civil Engineering",
        description: "Design, construction, and maintenance of the built environment.",
        slug: "civil-engineering",
        courses: [
          {
            id: "2003",
            departmentId: "203",
            name: "Structural Analysis",
            instructor: "Dr. Gustave Eiffel",
            description: "Learn to analyze and design structures that can safely resist applied loads.",
            image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80",
            difficulty: "Advanced",
            duration: "14 weeks",
            slug: "structural-analysis",
            lessons: [
              {
                id: "20003",
                courseId: "2003",
                title: "Forces and Moments",
                description: "Understanding the fundamental concepts of structural mechanics.",
                content: "This lesson covers the analysis of forces, moments, and equilibrium in structural systems...",
                duration: "70 minutes",
                order: 1,
                slug: "forces-moments",
                questions: [
                  {
                    id: "200003",
                    lessonId: "20003",
                    question: "What principle states that for a body in equilibrium, the sum of all forces must equal zero?",
                    answer: "First condition of equilibrium",
                    options: ["Newton's First Law", "First condition of equilibrium", "Pascal's principle", "Hooke's Law"],
                    type: "multiple-choice"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "204",
        facultyId: "2",
        name: "Department of Computer Engineering",
        description: "Study of computer hardware, software, and their integration.",
        slug: "computer-engineering",
        courses: [
          {
            id: "2004",
            departmentId: "204",
            name: "Digital Systems Design",
            instructor: "Dr. Gordon Moore",
            description: "Learn to design and implement digital logic circuits and systems.",
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            difficulty: "Intermediate",
            duration: "10 weeks",
            slug: "digital-systems",
            lessons: [
              {
                id: "20004",
                courseId: "2004",
                title: "Boolean Algebra and Logic Gates",
                description: "Understanding the mathematical foundation of digital systems.",
                content: "This lesson covers Boolean operations, logic gates, and their implementation in digital circuits...",
                duration: "55 minutes",
                order: 1,
                slug: "boolean-algebra",
                questions: [
                  {
                    id: "200004",
                    lessonId: "20004",
                    question: "Which logic gate performs the OR operation?",
                    answer: "OR gate",
                    options: ["AND gate", "NOT gate", "OR gate", "XOR gate"],
                    type: "multiple-choice"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "205",
        facultyId: "2",
        name: "Department of Software Engineering",
        description: "Systematic application of engineering approaches to software development.",
        slug: "software-engineering",
        courses: [
          {
            id: "2005",
            departmentId: "205",
            name: "Software Development Lifecycle",
            instructor: "Dr. Agile Scrum",
            description: "Learn the methodologies, processes, and practices for developing high-quality software.",
            image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80",
            difficulty: "Intermediate",
            duration: "8 weeks",
            slug: "sdlc",
            lessons: [
              {
                id: "20005",
                courseId: "2005",
                title: "Agile Development Methodologies",
                description: "Understanding iterative and incremental development approaches.",
                content: "This lesson covers the principles, practices, and benefits of Agile development methodologies...",
                duration: "60 minutes",
                order: 1,
                slug: "agile-methodologies",
                questions: [
                  {
                    id: "200005",
                    lessonId: "20005",
                    question: "Which of the following is NOT one of the four core values in the Agile Manifesto?",
                    answer: "Documentation over working software",
                    options: [
                      "Individuals and interactions over processes and tools",
                      "Working software over comprehensive documentation",
                      "Documentation over working software",
                      "Responding to change over following a plan"
                    ],
                    type: "multiple-choice"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "206",
        facultyId: "2",
        name: "Department of Mechatronics",
        description: "Integration of mechanical, electrical, and computer systems.",
        slug: "mechatronics",
        courses: [
          {
            id: "2006",
            departmentId: "206",
            name: "Robotics Fundamentals",
            instructor: "Dr. Robotic Asimov",
            description: "Learn the principles of designing, building, and programming robotic systems.",
            image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            difficulty: "Advanced",
            duration: "12 weeks",
            slug: "robotics",
            lessons: [
              {
                id: "20006",
                courseId: "2006",
                title: "Robot Kinematics",
                description: "Understanding the motion of robotic mechanisms.",
                content: "This lesson covers the mathematical description of robot motion without considering the forces that cause it...",
                duration: "75 minutes",
                order: 1,
                slug: "robot-kinematics",
                questions: [
                  {
                    id: "200006",
                    lessonId: "20006",
                    question: "Which of the following describes the forward kinematics problem?",
                    answer: "Finding the end-effector position given the joint angles",
                    options: [
                      "Finding the joint angles given the end-effector position",
                      "Finding the end-effector position given the joint angles",
                      "Finding the joint torques given the end-effector forces",
                      "Finding the end-effector forces given the joint torques"
                    ],
                    type: "multiple-choice"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "207",
        facultyId: "2",
        name: "Department of Chemical Engineering",
        description: "Application of physics, chemistry, biology, and mathematics to chemical processes.",
        slug: "chemical-engineering",
        courses: [
          {
            id: "2007",
            departmentId: "207",
            name: "Chemical Process Design",
            instructor: "Dr. Haber Bosch",
            description: "Learn to design, optimize, and control chemical processes for industrial applications.",
            image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            difficulty: "Advanced",
            duration: "14 weeks",
            slug: "chemical-process-design",
            lessons: [
              {
                id: "20007",
                courseId: "2007",
                title: "Material and Energy Balances",
                description: "Understanding the conservation principles applied to chemical processes.",
                content: "This lesson covers the systematic approach to solving material and energy balance problems in chemical engineering...",
                duration: "70 minutes",
                order: 1,
                slug: "material-energy-balances",
                questions: [
                  {
                    id: "200007",
                    lessonId: "20007",
                    question: "What conservation principle states that mass can neither be created nor destroyed in chemical reactions?",
                    answer: "Conservation of mass",
                    options: ["Conservation of energy", "Conservation of mass", "Conservation of momentum", "Conservation of charge"],
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
    name: "Faculty of Computer and Data Science",
    description: "Develop expertise in computing technologies, programming, and data analysis.",
    icon: "code",
    slug: "computer-data-science",
    departments: [
      {
        id: "301",
        facultyId: "3",
        name: "Department of Computer Science",
        description: "Study the theory and practice of computation and its applications.",
        slug: "computer-science",
        courses: [
          {
            id: "3001",
            departmentId: "301",
            name: "Data Structures and Algorithms",
            instructor: "Dr. Alan Turing",
            description: "Master the fundamental building blocks of efficient computer programs.",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            difficulty: "Advanced",
            duration: "14 weeks",
            slug: "data-structures-algorithms",
            lessons: [
              {
                id: "30001",
                courseId: "3001",
                title: "Binary Search Trees",
                description: "Understanding hierarchical data structures for efficient searching.",
                content: "This lesson explores the implementation and operations of binary search trees...",
                duration: "70 minutes",
                order: 1,
                slug: "binary-search-trees",
                questions: [
                  {
                    id: "300001",
                    lessonId: "30001",
                    question: "What is the time complexity of searching in a balanced binary search tree?",
                    answer: "O(log n)",
                    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
                    type: "multiple-choice"
                  }
                ]
              }
            ]
          },
          {
            id: "3002",
            departmentId: "301",
            name: "Operating Systems",
            instructor: "Dr. Linux Torvalds",
            description: "Understand the principles and implementation of modern operating systems.",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            difficulty: "Advanced",
            duration: "12 weeks",
            slug: "operating-systems",
            lessons: [
              {
                id: "30002",
                courseId: "3002",
                title: "Process Management",
                description: "Understanding how operating systems manage and schedule processes.",
                content: "This lesson covers process states, scheduling algorithms, and interprocess communication...",
                duration: "65 minutes",
                order: 1,
                slug: "process-management",
                questions: [
                  {
                    id: "300002",
                    lessonId: "30002",
                    question: "Which scheduling algorithm gives priority to processes with the shortest estimated processing time?",
                    answer: "Shortest Job First",
                    options: ["First Come First Served", "Round Robin", "Shortest Job First", "Priority Scheduling"],
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
        name: "Department of Artificial Intelligence",
        description: "Study the development of intelligent machines and software.",
        slug: "artificial-intelligence",
        courses: [
          {
            id: "3003",
            departmentId: "302",
            name: "Machine Learning Fundamentals",
            instructor: "Dr. Andrew Ng",
            description: "Learn the principles and applications of algorithms that improve through experience.",
            image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            difficulty: "Advanced",
            duration: "12 weeks",
            slug: "machine-learning",
            lessons: [
              {
                id: "30003",
                courseId: "3003",
                title: "Supervised Learning",
                description: "Understanding algorithms that learn from labeled training data.",
                content: "This lesson covers classification and regression techniques, including linear models, decision trees, and neural networks...",
                duration: "75 minutes",
                order: 1,
                slug: "supervised-learning",
                questions: [
                  {
                    id: "300003",
                    lessonId: "30003",
                    question: "Which of the following is NOT an example of supervised learning?",
                    answer: "K-means clustering",
                    options: ["Linear regression", "Support vector machines", "K-means clustering", "Random forests"],
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
        name: "Department of Cybersecurity",
        description: "Study the protection of computer systems, networks, and data from digital attacks.",
        slug: "cybersecurity",
        courses: [
          {
            id: "3004",
            departmentId: "303",
            name: "Network Security",
            instructor: "Dr. Bruce Schneier",
            description: "Learn the principles and practices of securing computer networks.",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            difficulty: "Advanced",
            duration: "10 weeks",
            slug: "network-security",
            lessons: [
              {
                id: "30004",
                courseId: "3004",
                title: "Cryptography Basics",
                description: "Understanding the mathematical foundations of secure communications.",
                content: "This lesson covers encryption, decryption, digital signatures, and cryptographic protocols...",
                duration: "70 minutes",
                order: 1,
                slug: "cryptography",
                questions: [
                  {
                    id: "300004",
                    lessonId: "30004",
                    question: "Which of the following is a symmetric encryption algorithm?",
                    answer: "AES",
                    options: ["RSA", "AES", "Diffie-Hellman", "ECC"],
                    type: "multiple-choice"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "304",
        facultyId: "3",
        name: "Department of Data Science",
        description: "Study the extraction of knowledge and insights from structured and unstructured data.",
        slug: "data-science",
        courses: [
          {
            id: "3005",
            departmentId: "304",
            name: "Big Data Analytics",
            instructor: "Dr. Hadoop Spark",
            description: "Learn to process and analyze large datasets using modern tools and techniques.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            difficulty: "Advanced",
            duration: "10 weeks",
            slug: "big-data-analytics",
            lessons: [
              {
                id: "30005",
                courseId: "3005",
                title: "Distributed Computing Frameworks",
                description: "Understanding systems for processing large datasets across clusters of computers.",
                content: "This lesson covers Hadoop, Spark, and other frameworks for scalable data processing...",
                duration: "65 minutes",
                order: 1,
                slug: "distributed-computing",
                questions: [
                  {
                    id: "300005",
                    lessonId: "30005",
                    question: "Which core abstraction does Apache Spark use for distributed data processing?",
                    answer: "Resilient Distributed Dataset (RDD)",
                    options: ["MapReduce", "Resilient Distributed Dataset (RDD)", "Directed Acyclic Graph (DAG)", "HDFS"],
                    type: "multiple-choice"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "305",
        facultyId: "3",
        name: "Department of Cloud and DevOps Engineering",
        description: "Study the design, deployment, and management of applications on cloud platforms.",
        slug: "cloud-devops",
        courses: [
          {
            id: "3006",
            departmentId: "305",
            name: "Cloud Computing Infrastructure",
            instructor: "Dr. Amazon Azure",
            description: "Learn to design and manage scalable, resilient cloud infrastructure.",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80",
            difficulty: "Intermediate",
            duration: "8 weeks",
            slug: "cloud-infrastructure",
            lessons: [
              {
                id: "30006",
                courseId: "3006",
                title: "Infrastructure as Code",
                description: "Understanding the practice of managing infrastructure through code rather than manual processes.",
                content: "This lesson covers tools like Terraform, CloudFormation, and Ansible for automating infrastructure deployment...",
                duration: "60 minutes",
                order: 1,
                slug: "infrastructure-as-code",
                questions: [
                  {
                    id: "300006",
                    lessonId: "30006",
                    question: "Which of the following is NOT an Infrastructure as Code tool?",
                    answer: "Docker",
                    options: ["Terraform", "CloudFormation", "Ansible", "Docker"],
                    type: "multiple-choice"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "306",
        facultyId: "3",
        name: "Department of Software Development",
        description: "Study the process of creating, designing, and maintaining software applications.",
        slug: "software-development",
        courses: [
          {
            id: "3007",
            departmentId: "306",
            name: "Full-Stack Web Development",
            instructor: "Prof. Ada Lovelace",
            description: "Learn to build modern web applications from front-end to back-end.",
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            difficulty: "Intermediate",
            duration: "16 weeks",
            slug: "fullstack-web-dev",
            lessons: [
              {
                id: "30007",
                courseId: "3007",
                title: "Front-End Fundamentals",
                description: "Building user interfaces with HTML, CSS, and JavaScript.",
                content: "This lesson covers the core technologies used to create interactive web interfaces...",
                duration: "75 minutes",
                order: 1,
                slug: "frontend-fundamentals",
                questions: [
                  {
                    id: "300007",
                    lessonId: "30007",
                    question: "Which language is primarily responsible for styling web pages?",
                    answer: "CSS",
                    options: ["HTML", "JavaScript", "CSS", "Python"],
                    type: "multiple-choice"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "307",
        facultyId: "3",
        name: "Department of Blockchain and Web3",
        description: "Study distributed ledger technology and its applications in decentralized systems.",
        slug: "blockchain-web3",
        courses: [
          {
            id: "3008",
            departmentId: "307",
            name: "Blockchain Fundamentals",
            instructor: "Dr. Satoshi Nakamoto",
            description: "Learn the principles and applications of blockchain technology.",
            image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80",
            difficulty: "Intermediate",
            duration: "8 weeks",
            slug: "blockchain-fundamentals",
            lessons: [
              {
                id: "30008",
                courseId: "3008",
                title: "Distributed Consensus Mechanisms",
                description: "Understanding how blockchain networks achieve agreement on the state of the ledger.",
                content: "This lesson covers proof of work, proof of stake, and other consensus algorithms...",
                duration: "65 minutes",
                order: 1,
                slug: "consensus-mechanisms",
                questions: [
                  {
                    id: "300008",
                    lessonId: "30008",
                    question: "Which consensus mechanism is used by Bitcoin?",
                    answer: "Proof of Work",
                    options: ["Proof of Work", "Proof of Stake", "Delegated Proof of Stake", "Practical Byzantine Fault Tolerance"],
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
    name: "Faculty of Business & Management",
    description: "Develop skills in leadership, entrepreneurship, finance, and organizational management.",
    icon: "briefcase",
    slug: "business-management",
    departments: [
      {
        id: "401",
        facultyId: "4",
        name: "Department of Marketing",
        description: "Study strategies for promoting products, services, and brands to target audiences.",
        slug: "marketing",
        courses: [
          {
            id: "4001",
            departmentId: "401",
            name: "Digital Marketing Fundamentals",
            instructor: "Prof. Gary Vaynerchuk",
            description: "Master the core concepts and tools of marketing in the digital age.",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            difficulty: "Beginner",
            duration: "8 weeks",
            slug: "digital-marketing",
            lessons: [
              {
                id: "40001",
                courseId: "4001",
                title: "Social Media Marketing Strategies",
                description: "Leveraging social platforms to build brand awareness and engagement.",
                content: "This lesson explores effective tactics for marketing on various social media platforms...",
                duration: "55 minutes",
                order: 1,
                slug: "social-media-marketing",
                questions: [
                  {
                    id: "400001",
                    lessonId: "40001",
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
        id: "402",
        facultyId: "4",
        name: "Department of Finance",
        description: "Study the management of money, investments, and other financial assets.",
        slug: "finance",
        courses: [
          {
            id: "4002",
            departmentId: "402",
            name: "Investment Analysis",
            instructor: "Dr. Warren Buffett",
            description: "Learn to analyze and value investments using fundamental and technical methods.",
            image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            difficulty: "Advanced",
            duration: "12 weeks",
            slug: "investment-analysis",
            lessons: [
              {
                id: "40002",
                courseId: "4002",
                title: "Fundamental Analysis",
                description: "Evaluating a company's financial health and intrinsic value.",
                content: "This lesson covers techniques for analyzing financial statements and valuing companies...",
                duration: "70 minutes",
                order: 1,
                slug: "fundamental-analysis",
                questions: [
                  {
                    id: "400002",
                    lessonId: "40002",
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
  },
  {
    id: "5",
    name: "Faculty of Arts and Humanities",
    description: "Explore the creative and cultural aspects of human experience, from literature and philosophy to visual and performing arts.",
    icon: "book",
    slug: "arts-humanities",
    departments: [
      {
        id: "501",
        facultyId: "5",
        name: "Department of Literature",
        description: "Study the great works of literature from around the world and throughout history.",
        slug: "literature",
        courses: [
          {
            id: "5001",
            departmentId: "501",
            name: "Introduction to World Literature",
            instructor: "Dr. Emily Brontë",
            description: "A survey of major works of world literature from ancient times to the present day.",
            image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
            difficulty: "Beginner",
            duration: "8 weeks",
            slug: "world-literature-intro",
            lessons: [
              {
                id: "50001",
                courseId: "5001",
                title: "Ancient Epic Poetry",
                description: "Examining the Iliad, the Odyssey, and the Epic of Gilgamesh.",
                content: "In this lesson, we'll explore the origins of epic poetry and its significance in ancient cultures. The earliest known literary works in Western civilization are epic poems that originated in oral traditions...",
                duration: "45 minutes",
                order: 1,
                slug: "ancient-epic-poetry",
                questions: [
                  {
                    id: "500001",
                    lessonId: "50001",
                    question: "Who is the author of the Iliad and the Odyssey?",
                    answer: "Homer",
                    options: ["Virgil", "Homer", "Sophocles", "Plato"],
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
        name: "Department of Philosophy",
        description: "Engage with the fundamental questions of existence, knowledge, values, reason, mind, and language.",
        slug: "philosophy",
        courses: [
          {
            id: "5002",
            departmentId: "502",
            name: "Introduction to Ethics",
            instructor: "Dr. Peter Singer",
            description: "Explore major ethical theories and their applications to contemporary moral problems.",
            image: "https://images.unsplash.com/photo-1471970394675-613138e45da3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            difficulty: "Beginner",
            duration: "10 weeks",
            slug: "intro-ethics",
            lessons: [
              {
                id: "50002",
                courseId: "5002",
                title: "Utilitarianism",
                description: "Examining the ethical theory that actions are right if they promote happiness or pleasure.",
                content: "In this lesson, we'll explore utilitarianism as developed by Jeremy Bentham and John Stuart Mill. We'll discuss the principle of utility, the greatest happiness principle, and various objections to utilitarian thinking...",
                duration: "60 minutes",
                order: 1,
                slug: "utilitarianism",
                questions: [
                  {
                    id: "500002",
                    lessonId: "50002",
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
      }
    ]
  },
  {
    id: "6",
    name: "Faculty of Social Sciences",
    description: "Understand human behavior and societies through disciplines like psychology, economics, and anthropology.",
    icon: "users",
    slug: "social-sciences",
    departments: [
      {
        id: "601",
        facultyId: "6",
        name: "Department of Psychology",
        description: "Study the mind and behavior through scientific research and clinical practice.",
        slug: "psychology",
        courses: [
          {
            id: "6001",
            departmentId: "601",
            name: "Introduction to Psychology",
            instructor: "Dr. Carl Rogers",
            description: "Explore the fundamentals of human behavior and mental processes.",
            image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            difficulty: "Beginner",
            duration: "10 weeks",
            slug: "intro-psychology",
            lessons: [
              {
                id: "60001",
                courseId: "6001",
                title: "The Brain and Behavior",
                description: "Understanding how brain structure and function influence human behavior.",
                content: "This lesson explores the relationship between neuroanatomy, neurochemistry, and psychological processes...",
                duration: "55 minutes",
                order: 1,
                slug: "brain-behavior",
                questions: [
                  {
                    id: "600001",
                    lessonId: "60001",
                    question: "Which part of the brain is primarily responsible for memory formation?",
                    answer: "Hippocampus",
                    options: ["Amygdala", "Hippocampus", "Cerebellum", "Frontal lobe"],
                    type: "multiple-choice"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "602",
        facultyId: "6",
        name: "Department of Economics",
        description: "Study the production, distribution, and consumption of goods and services.",
        slug: "economics",
        courses: [
          {
            id: "6002",
            departmentId: "602",
            name: "Macroeconomics Principles",
            instructor: "Dr. John Keynes",
            description: "Understand how economies function at the national and global levels.",
            image: "https://images.unsplash.com/photo-1468254095679-bbcba94a7066?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
            difficulty: "Intermediate",
            duration: "8 weeks",
            slug: "macroeconomics",
            lessons: [
              {
                id: "60002",
                courseId: "6002",
                title: "GDP and Economic Growth",
                description: "Understanding how we measure economic output and prosperity.",
                content: "This lesson explores the calculation and significance of Gross Domestic Product as a measure of economic health...",
                duration: "50 minutes",
                order: 1,
                slug: "gdp-economic-growth",
                questions: [
                  {
                    id: "600002",
                    lessonId: "60002",
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
      }
    ]
  },
  {
    id: "7",
    name: "Faculty of Education",
    description: "Study the principles and methods of teaching and learning across educational contexts.",
    icon: "graduation-cap",
    slug: "education",
    departments: [
      {
        id: "701",
        facultyId: "7",
        name: "Department of Educational Psychology",
        description: "Study how humans learn in educational settings and the effectiveness of educational interventions.",
        slug: "educational-psychology",
        courses: [
          {
            id: "7001",
            departmentId: "701",
            name: "Learning Theory and Practice",
            instructor: "Dr. Jean Piaget",
            description: "Explore how people learn and how to apply this knowledge to educational practice.",
            image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            difficulty: "Intermediate",
            duration: "12 weeks",
            slug: "learning-theory",
            lessons: [
              {
                id: "70001",
                courseId: "7001",
                title: "Cognitive Development",
                description: "Understanding how thinking and reasoning abilities develop from childhood to adulthood.",
                content: "This lesson explores Piaget's stages of cognitive development and their implications for education...",
                duration: "65 minutes",
                order: 1,
                slug: "cognitive-development",
                questions: [
                  {
                    id: "700001",
                    lessonId: "70001",
                    question: "Which of Piaget's stages is characterized by abstract thinking and hypothetical reasoning?",
                    answer: "Formal operational stage",
                    options: ["Sensorimotor stage", "Preoperational stage", "Concrete operational stage", "Formal operational stage"],
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
    id: "8",
    name: "Faculty of Law & Legal Studies",
    description: "Study legal systems, principles, and practices across various domains.",
    icon: "scale",
    slug: "law-legal-studies",
    departments: [
      {
        id: "801",
        facultyId: "8",
        name: "Department of Constitutional Law",
        description: "Study the fundamental principles and structures of governance.",
        slug: "constitutional-law",
        courses: [
          {
            id: "8001",
            departmentId: "801",
            name: "Comparative Constitutional Systems",
            instructor: "Dr. Ruth Ginsburg",
            description: "Analyze and compare constitutional frameworks from different countries.",
            image: "https://images.unsplash.com/photo-1589994965851-a7f91ddd11a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            difficulty: "Advanced",
            duration: "10 weeks",
            slug: "comparative-constitutional",
            lessons: [
              {
                id: "80001",
                courseId: "8001",
                title: "Separation of Powers",
                description: "Understanding the distribution of governmental authority among different branches.",
                content: "This lesson explores how different constitutional systems implement checks and balances...",
                duration: "70 minutes",
                order: 1,
                slug: "separation-powers",
                questions: [
                  {
                    id: "800001",
                    lessonId: "80001",
                    question: "Which country's constitution is the oldest written constitution still in use?",
                    answer: "United States",
                    options: ["United Kingdom", "France", "United States", "Germany"],
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
    id: "9",
    name: "Faculty of Health & Medical Sciences",
    description: "Study the prevention, diagnosis, and treatment of disease and injury.",
    icon: "heart-pulse",
    slug: "health-medical",
    departments: [
      {
        id: "901",
        facultyId: "9",
        name: "Department of Public Health",
        description: "Study the protection and improvement of health at the population level.",
        slug: "public-health",
        courses: [
          {
            id: "9001",
            departmentId: "901",
            name: "Epidemiology Fundamentals",
            instructor: "Dr. John Snow",
            description: "Learn to investigate and address health-related events in populations.",
            image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80",
            difficulty: "Intermediate",
            duration: "8 weeks",
            slug: "epidemiology",
            lessons: [
              {
                id: "90001",
                courseId: "9001",
                title: "Measures of Disease Frequency",
                description: "Understanding how to quantify and compare disease occurrence in populations.",
                content: "This lesson covers incidence, prevalence, and other key epidemiological measures...",
                duration: "60 minutes",
                order: 1,
                slug: "disease-frequency",
                questions: [
                  {
                    id: "900001",
                    lessonId: "90001",
                    question: "Which measure represents the proportion of a population that has a disease at a specific point in time?",
                    answer: "Prevalence",
                    options: ["Incidence", "Prevalence", "Relative risk", "Odds ratio"],
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
    id: "10",
    name: "Faculty of Media & Communication",
    description: "Study the creation, transmission, and impact of information and entertainment content.",
    icon: "globe",
    slug: "media-communication",
    departments: [
      {
        id: "1001",
        facultyId: "10",
        name: "Department of Journalism",
        description: "Study the gathering, processing, and dissemination of news and information.",
        slug: "journalism",
        courses: [
          {
            id: "10001",
            departmentId: "1001",
            name: "Investigative Reporting",
            instructor: "Dr. Bob Woodward",
            description: "Learn the methods and ethics of in-depth journalistic investigation.",
            image: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            difficulty: "Advanced",
            duration: "10 weeks",
            slug: "investigative-reporting",
            lessons: [
              {
                id: "100001",
                courseId: "10001",
                title: "Sources and Research Methods",
                description: "Developing strategies for finding and verifying information.",
                content: "This lesson covers techniques for identifying sources, conducting interviews, and verifying facts...",
                duration: "65 minutes",
                order: 1,
                slug: "sources-research",
                questions: [
                  {
                    id: "1000001",
                    lessonId: "100001",
                    question: "What is the practice of confirming information with multiple independent sources called?",
                    answer: "Cross-verification",
                    options: ["Fact-checking", "Cross-verification", "Deep background", "Source cultivation"],
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
    id: "11",
    name: "Faculty of Agriculture and Natural Resources",
    description: "Study the science and practice of farming, forestry, and management of natural resources.",
    icon: "book",
    slug: "agriculture-natural-resources",
    departments: [
      {
        id: "1101",
        facultyId: "11",
        name: "Department of Sustainable Agriculture",
        description: "Study farming practices that protect the environment, public health, and animal welfare.",
        slug: "sustainable-agriculture",
        courses: [
          {
            id: "11001",
            departmentId: "1101",
            name: "Agroecology Principles",
            instructor: "Dr. Wendell Berry",
            description: "Learn the ecological principles that govern sustainable agricultural systems.",
            image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
            difficulty: "Intermediate",
            duration: "12 weeks",
            slug: "agroecology",
            lessons: [
              {
                id: "110001",
                courseId: "11001",
                title: "Soil Health and Management",
                description: "Understanding the foundation of sustainable agricultural systems.",
                content: "This lesson covers soil biology, chemistry, and practices for maintaining soil health...",
                duration: "70 minutes",
                order: 1,
                slug: "soil-health",
                questions: [
                  {
                    id: "1100001",
                    lessonId: "110001",
                    question: "Which practice helps build soil organic matter?",
                    answer: "Cover cropping",
                    options: ["Deep tillage", "Bare fallowing", "Cover cropping", "Synthetic fertilization"],
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
    id: "12",
    name: "Faculty of Design and Creative Art",
    description: "Explore visual communication, product design, and creative expression across media.",
    icon: "pencil",
    slug: "design-creative-art",
    departments: [
      {
        id: "1201",
        facultyId: "12",
        name: "Department of Digital Design",
        description: "Study the creation of digital content for web, mobile, and interactive media.",
        slug: "digital-design",
        courses: [
          {
            id: "12001",
            departmentId: "1201",
            name: "User Experience Design",
            instructor: "Dr. Don Norman",
            description: "Learn to create digital products that are useful, usable, and enjoyable.",
            image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1264&q=80",
            difficulty: "Intermediate",
            duration: "10 weeks",
            slug: "ux-design",
            lessons: [
              {
                id: "120001",
                courseId: "12001",
                title: "User Research Methods",
                description: "Understanding how to gather insights about users' needs and behaviors.",
                content: "This lesson covers interviews, surveys, usability testing, and other research techniques...",
                duration: "65 minutes",
                order: 1,
                slug: "user-research",
                questions: [
                  {
                    id: "1200001",
                    lessonId: "120001",
                    question: "Which research method involves observing users interacting with a product in their natural environment?",
                    answer: "Contextual inquiry",
                    options: ["A/B testing", "Contextual inquiry", "Card sorting", "Heuristic evaluation"],
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
    id: "13",
    name: "Faculty of Architecture and Urban Planning",
    description: "Study the design and planning of buildings, communities, and cities.",
    icon: "landmark",
    slug: "architecture-urban-planning",
    departments: [
      {
        id: "1301",
        facultyId: "13",
        name: "Department of Sustainable Design",
        description: "Study architectural and urban design practices that minimize environmental impact.",
        slug: "sustainable-design",
        courses: [
          {
            id: "13001",
            departmentId: "1301",
            name: "Green Building Principles",
            instructor: "Dr. William McDonough",
            description: "Learn to design buildings that conserve resources and improve human well-being.",
            image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
            difficulty: "Advanced",
            duration: "14 weeks",
            slug: "green-building",
            lessons: [
              {
                id: "130001",
                courseId: "13001",
                title: "Energy Efficiency Strategies",
                description: "Understanding how to reduce building energy consumption through design.",
                content: "This lesson covers passive solar design, insulation, efficient HVAC systems, and other strategies...",
                duration: "75 minutes",
                order: 1,
                slug: "energy-efficiency",
                questions: [
                  {
                    id: "1300001",
                    lessonId: "130001",
                    question: "Which orientation maximizes solar gain in the Northern Hemisphere?",
                    answer: "South-facing windows",
                    options: ["North-facing windows", "East-facing windows", "South-facing windows", "West-facing windows"],
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
    id: "14",
    name: "Faculty of Language and Communication",
    description: "Study the structure, acquisition, and use of language across contexts.",
    icon: "globe",
    slug: "language-communication",
    departments: [
      {
        id: "1401",
        facultyId: "14",
        name: "Department of Linguistics",
        description: "Study the scientific analysis of language form, meaning, and context.",
        slug: "linguistics",
        courses: [
          {
            id: "14001",
            departmentId: "1401",
            name: "Introduction to Phonetics and Phonology",
            instructor: "Dr. Noam Chomsky",
            description: "Learn about the sounds of human language and how they pattern in different languages.",
            image: "https://images.unsplash.com/photo-1546953304-5d96f43c2e94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1229&q=80",
            difficulty: "Intermediate",
            duration: "10 weeks",
            slug: "phonetics-phonology",
            lessons: [
              {
                id: "140001",
                courseId: "14001",
                title: "The International Phonetic Alphabet",
                description: "Understanding the system for representing sounds of spoken language.",
                content: "This lesson covers the IPA symbols, their articulation, and how to transcribe speech...",
                duration: "60 minutes",
                order: 1,
                slug: "ipa",
                questions: [
                  {
                    id: "1400001",
                    lessonId: "140001",
                    question: "Which type of sound is produced with the vocal cords vibrating?",
                    answer: "Voiced sound",
                    options: ["Voiceless sound", "Voiced sound", "Nasal sound", "Fricative sound"],
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
    id: "15",
    name: "Faculty of Theology and Religious Studies",
    description: "Study religious traditions, texts, practices, and institutions from various perspectives.",
    icon: "book-open",
    slug: "theology-religious-studies",
    departments: [
      {
        id: "1501",
        facultyId: "15",
        name: "Department of Comparative Religion",
        description: "Study different religious traditions with a focus on their similarities and differences.",
        slug: "comparative-religion",
        courses: [
          {
            id: "15001",
            departmentId: "1501",
            name: "World Religions: Eastern Traditions",
            instructor: "Dr. Huston Smith",
            description: "Explore the history, beliefs, and practices of Hinduism, Buddhism, Confucianism, and Taoism.",
            image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            difficulty: "Beginner",
            duration: "12 weeks",
            slug: "eastern-religions",
            lessons: [
              {
                id: "150001",
                courseId: "15001",
                title: "Buddhism: The Four Noble Truths",
                description: "Understanding the core teachings of Buddhism about suffering and liberation.",
                content: "This lesson explores the Buddha's central insights about the nature of suffering and the path to its cessation...",
                duration: "65 minutes",
                order: 1,
                slug: "four-noble-truths",
                questions: [
                  {
                    id: "1500001",
                    lessonId: "150001",
                    question: "Which Noble Truth states that suffering can be ended by eliminating desire?",
                    answer: "Third Noble Truth",
                    options: ["First Noble Truth", "Second Noble Truth", "Third Noble Truth", "Fourth Noble Truth"],
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
