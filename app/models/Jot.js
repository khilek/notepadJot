import { generateId } from "../utils/GenerateId.js";


export class Jot {
  constructor(data) {
    this.id = generateId()
    this.name = data.name
    this.body = data.body

  }

}