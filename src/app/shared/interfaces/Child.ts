import { Kindergarden } from "./Kindergarden";

export interface Child {
    id: string;
    name: string;
    birthDate: string,
    kindergardenId: number
    registrationDate: Date;

}

  export interface ChildResponse {
    registrationDate: Date;
    id: string;
    name: string;
    birthDate: string,
    kindergarden: Kindergarden,
    kindergardenId: number
  }