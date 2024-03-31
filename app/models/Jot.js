import { generateId } from "../utils/GenerateId.js";


export class Jot {
  constructor(data) {
    this.id = generateId()
    this.name = data.name
    this.body = data.body || ''
    this.color = data.color
    this.createdAt = data.createdAt == undefined ? new Date() : new Date(data.createdAt)
    this.lastUpdated = data.lastUpdated == undefined ? new Date() : new Date(data.lastUpdated)
  }


  get jotListTemplate() {
    return `
    <div onclick="app.JotsController.setActiveJot('${this.id}')" class="col-12 selectable" role="button">
      <div class="col-12 d-flex justify-content-around">
        <p>${this.name}</p>
        <p>${this.color}</p>
        <p>${this.CreatedDateAndTime}</p>
        <p>${this.LastUpdatedDateAndTime}</p>
      </div>
    </div>
  `
  }


  get activeJotTemplate() {
    return `
    <div>

      <label for="jot-body">Jot Body</label>
      <textarea onblur="app.JotsController.updateJot()" name="body" id="jot-body" cols="40" rows="10">${this.body}</textarea>
      <div class="text-end">
      <button onclick="app.JotsController.destroyJot()" type="button">
        Delete ${this.name} Jot
      </button>
    </div>
  </div>
    `
  }

  // get CreatedDate() {
  //   return this.createdAt.toLocaleDateString()
  // }

  // get CreatedTime() {
  //   return this.createdAt.toLocaleTimeString()
  // }

  get CreatedDateAndTime() {
    return this.createdAt.toLocaleString()
  }

  get LastUpdatedDateAndTime() {
    return this.lastUpdated.toLocaleString()
  }


}