
import { Faculty } from "@/types";

export const engineeringFaculty: Faculty = {
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
};
