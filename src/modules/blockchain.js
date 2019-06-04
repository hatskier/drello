import blockstack from 'blockstack'

const FILENAMES = {
  tasks: 'drello_tasks.json',
  projects: 'projects_.json'
}

const appConfig = new blockstack.AppConfig(['store_write', 'publish_data'])
const userSession = new blockstack.UserSession({appConfig})

async function saveObjectToFile(obj, filename, opts={ encrypt: true }) {
  await userSession.putFile(filename, JSON.stringify(obj), opts)
}

async function readObjFromFile(filename, opts={ decrypt: true }) {
  console.log('Reading the file: ' + filename)
  const content = await userSession.getFile(filename, opts)
  try {
    console.log('Got content: ' + content)
    return JSON.parse(content)
  } catch (e) {
    console.error(e)
    return null
  }
}

export default {
  pendingAuth: false,

  getUserSession() {
    return userSession
  },

  getUserName() {
    return userSession.loadUserData().username
  },

  isUserSignedIn() {
    return userSession.isUserSignedIn()
  },

  async checkAuth() {
    if (userSession.isSignInPending()) {
      try {
        this.pendingAuth = true
        await userSession.handlePendingSignIn()
      } catch (e) {
        console.error(e)
      } finally {
        this.pendingAuth = false
      }
    }
  },

  signIn() {
    userSession.redirectToSignIn()
  },

  signOut() {
    userSession.signUserOut()
    location.reload()
  },

  async getProjects() {
    return await readObjFromFile(FILENAMES.projects)
  },

  async getTasks() {
    return await readObjFromFile(FILENAMES.tasks)
  },

  async saveProjects(projects) {
    await saveObjectToFile(projects, FILENAMES.projects)
  },

  async saveTasks(tasks) {
    await saveObjectToFile(tasks, FILENAMES.tasks)
  },
}