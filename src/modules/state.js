import Vue from 'vue'
import _ from 'lodash'
import Utils from './utils'
import Blockchain from './blockchain'

let State = {
  // Fields
  projects: {},
  tasks: {},
  syncStatus: 'Synced',

  // Methods
  async loadStateFromBlockchain() {
    console.log('Loading state from blockchain')
    const projects = await Blockchain.getProjects()
    const tasks = await Blockchain.getTasks()
    if (projects) {
      Vue.set(this, 'projects', projects)
    }
    if (tasks) {
      Vue.set(this, 'tasks', tasks)
    }
  },

  async updateStateToBlockchain({
    updateProjects=false,
    updateTasks=false
  }) {
    console.log(
      `Updating blockchain state with projects: ${updateProjects}, with tasks: ${updateTasks}`)
    try {
      if (updateProjects) {
        this.syncStatus = 'Syncing projects'
        this.updatingStateInBlockchain = true;
        await Blockchain.saveProjects(this.projects)
      }
      if (updateTasks) {
        this.syncStatus = 'Syncing tasks'
        this.updatingStateInBlockchain = true;
        await Blockchain.saveTasks(this.tasks)
      }
      this.syncStatus = 'Synced'
    } catch (e) {
      console.error(e)
      this.syncStatus = 'Syncing failed'
    }
  },

  upsertProject(project) {
    let res = this.defaultUpsert(project, 'projects', 'Project')
    this.updateStateToBlockchain({ updateProjects: true })
    return res
  },

  removeProject(project) {
    this.defaultRemove(project, 'projects', 'Project')
    this.updateStateToBlockchain({ updateProjects: true })
  },

  upsertTask(task) {
    let res = this.defaultUpsert(task, 'tasks', 'Task')
    this.updateStateToBlockchain({ updateTasks: true })
    return res
  },

  removeTask(task) {
    this.defaultRemove(task, 'tasks', 'Task')
    this.updateStateToBlockchain({ updateTasks: true })
  },

  defaultUpsert(el, collectionName, entityName) {
    console.log(`Updating ${entityName}`)
    console.log(el)
    if (!el.id) {
      el.id = Utils.generateId()
    }
    const newEl = _.clone(el)
    Vue.set(this[collectionName], el.id, newEl)
    return newEl
  },

  defaultRemove(el, collectionName, entityName) {
    if (!el.id) {
      throw new Error(`${entityName} without id can not be removed`)
    }
    console.log(`Removing ${entityName}`)
    console.log(el)
    let newElems = _.clone(this[collectionName])
    delete newElems[el.id]
    Vue.set(this, collectionName, newElems)
  }
}

export default State