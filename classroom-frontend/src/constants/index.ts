import { Subject } from "@/types";

export const DEPARTMENTS = ["CS", "Maths", "English"];

export const DEPARTMENTS_OPTIONS = DEPARTMENTS.map((dept) => ({
  value: dept,
  label: dept,
}));

export const MOCK_SUBJECTS: Subject[] = [
  {
    id: 1,
    name: "Introduction to Computer Science",
    code: "CS101",
    department: "Computer Science",
    description:
      "Fundamentals of programming, algorithms, and computational thinking for beginners.",
  },
  {
    id: 2,
    name: "Calculus I",
    code: "MATH101",
    department: "Mathematics",
    description:
      "Study of limits, derivatives, and integrals with applications to real-world problems.",
  },
  {
    id: 3,
    name: "General Physics",
    code: "PHY101",
    department: "Physics",
    description:
      "Mechanics, motion, forces, and energy principles covering classical physics concepts.",
  },
];
