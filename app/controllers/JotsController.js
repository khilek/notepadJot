import { AppState } from "../AppState.js";
import { jotsService } from "../services/JotsService.js";
import { getFormData } from "../utils/FormHandler.js";
import { setHTML } from "../utils/Writer.js";

export class JotsController {
  constructor() {
    console.log('Writing');

    AppState.on('jots', this.drawJots)
    AppState.on('activeJot', this.drawActiveJot)

    // this.drawActiveJot()
    jotsService.loadJots()
  }



  drawJots() {
    const jots = AppState.jots
    let jotsContent = ''
    jots.forEach(jot => jotsContent += jot.jotListTemplate)
    setHTML('jot-lists', jotsContent)
  }


  drawActiveJot() {
    const jot = AppState.activeJot

    if (jot == null) {
      setHTML('active-jot', '')
    }
    else {
      setHTML('active-jot', AppState.activeJot.activeJotTemplate)
    }
  }


  createJot() {
    try {
      event.preventDefault()
      console.log('Creating Jot');
      const form = event.target
      const jotFormData = getFormData(form)
      console.log('Data', jotFormData)
      jotsService.createJot(jotFormData)

      /**@ts-ignore */
      form.reset()
    } catch (error) {
      console.log('[Creating Jot', error)
      window.alert(error.message)
    }
  }




  setActiveJot(jotId) {
    console.log('Setting Active Jot with ID', jotId);
    jotsService.setActiveJot(jotId)
  }



  updateJot() {
    const textAreaElem = event.target
    console.log('blurred text area', textAreaElem);

    /**@ts-ignore */
    const textContentFromTextArea = textAreaElem.value
    console.log('Text Content', textContentFromTextArea);

    jotsService.updateJot(textContentFromTextArea)
  }

  destroyJot() {
    const wantsToDestroy = window.confirm('ARE YOU POSITIVE THAT YOU WANT TO DELETE YOUR HARD WORK?')
    console.log('Do they want to destroy report?', wantsToDestroy);

    if (wantsToDestroy == false) {
      return
    }
    console.log('destroying Jot')

    jotsService.destroyJot()
  }

}