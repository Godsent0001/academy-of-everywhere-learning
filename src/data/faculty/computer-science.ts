
import { Faculty } from "@/types";

export const computerScienceFaculty: Faculty = {
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
              slug: "supervised-learning",
              questions: [
                {
                  id: "300003",
                  question: "Which of the following is NOT a type of supervised learning algorithm?",
                  answer: "k-means clustering",
                  options: ["Linear regression", "Decision trees", "k-means clustering", "Support vector machines"],
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
