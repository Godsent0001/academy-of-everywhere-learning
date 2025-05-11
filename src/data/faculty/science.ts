
import { Faculty } from "@/types";

export const scienceFaculty: Faculty = {
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
};
