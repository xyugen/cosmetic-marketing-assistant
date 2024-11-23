// Define your models here.

export interface Model {
  id: string;
  label: string;
  apiIdentifier: string;
  description: string;
}

export const models: Array<Model> = [
  {
    id: "llama-3.1-70b-versatile",
    label: "Llama 3.1",
    apiIdentifier: "llama-3.1-70b-versatile",
    description: "Designed to handle a wide range of tasks effectively.",
  },
  {
    id: "mixtral-8x7b-32768",
    label: "Mixtral 8x7b",
    apiIdentifier: "mixtral-8x7b-32768",
    description:
      "Efficient at generating text and providing information on a wide range of topics.",
  },
] as const;

export const DEFAULT_MODEL_NAME = "llama-3.1-70b-versatile";
