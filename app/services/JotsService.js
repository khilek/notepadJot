import { AppState } from "../AppState.js";
import { Jot } from "../models/Jot.js";
import { loadState, saveState } from "../utils/Store.js";

class JotsService {




  createJot(jotFormData) {
    const newJot = new Jot(jotFormData)
    console.log('New Jot', newJot)
    AppState.jots.push(newJot)
    console.log('Jots in AppState', AppState.jots)
    this.saveJots()
  }


  /**
   * Description
   * @param {string} jotId
   * @returns {any}
   */
  setActiveJot(jotId) {
    const foundJot = AppState.jots.find(jot => jot.id == jotId)

    console.log('Set Active Jot', jotId);


    this.saveJots()

    AppState.activeJot = foundJot
  }


  updateJot(newJotBody) {
    const jot = AppState.activeJot

    jot.body = newJotBody
    jot.lastUpdated = new Date()
    console.log('Did Active Jot Change?', jot);
    console.log('Did correct Jot in array change?', AppState.jots);

    this.saveJots()
  }



  saveJots() {
    saveState('jots', AppState.jots)
  }

  loadJots() {
    const jotsFromLocalStorage = loadState('jots', [Jot])
    AppState.jots = jotsFromLocalStorage
  }

  destroyJot() {
    const jotId = AppState.activeJot.id
    console.log('jot id', jotId)

    AppState.activeJot = null

    const indexOfJotToRemove = AppState.jots.findIndex(jot => jot.id == jotId)

    if (indexOfJotToRemove == -1) {
      console.error('Index is wrong')
      return
    }

    AppState.jots.splice(indexOfJotToRemove, 1)

    this.saveJots()

  }

}



export const jotsService = new JotsService()