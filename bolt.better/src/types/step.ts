//What wiil the type of the step like the run command like npm or the create file or folder

export enum StepType {
    CreateFile,
    CreateFolder,
    EditFile,
    DeleteFile,
    RunScript
  }
  
  export interface Step {
    id: number;
    title: string;
    description: string;
    type: StepType;
    status: 'pending' | 'in-progress' | 'completed';
    code?: string;
    path?: string;
  }
  
  //Code and path  are optional bcz it is not required in the run script 