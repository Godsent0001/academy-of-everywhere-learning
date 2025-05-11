
import { Faculty } from "@/types";
import { scienceFaculty } from "./science";
import { engineeringFaculty } from "./engineering";
import { computerScienceFaculty } from "./computer-science";

// Export all faculties combined in a single array
export const faculties: Faculty[] = [
  scienceFaculty,
  engineeringFaculty,
  computerScienceFaculty
];

// Re-export individual faculties for direct access if needed
export { scienceFaculty, engineeringFaculty, computerScienceFaculty };
