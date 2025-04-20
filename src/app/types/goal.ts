// src/app/types/goal.ts

export type GoalInput = {
    uid: string;
    name: string;
    description: string;
    price: number;
  };
  
  // Meta ya creada (con id):
  export interface Goal extends GoalInput {
    id: string;
  }
  