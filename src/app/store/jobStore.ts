import create from "zustand";

interface Job {
  id: number;
  slug: string;
  title: string;
  type: string;
  locationType: string;
  location: string;
  description: string;
  salary: number;
  companyName: string;
  applicationEmail: string;
  applicationUrl: string;
  approved: boolean;
}

interface JobStore {
  jobs: Job[];
  setJobs: (newJobs: Job[]) => void;
}

const useJobStore = create<JobStore>((set) => ({
  jobs: [],
  setJobs: (newJobs) => set({ jobs: newJobs }),
}));

export default useJobStore;
