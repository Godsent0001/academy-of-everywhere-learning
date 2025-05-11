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
                slug
