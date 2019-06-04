<template>
  <div>
    <h2 class="centered">Tasks {{ project ? " - " + project : ""}}</h2>

    <div class="cards mdl-grid">

      <Card
        id="taskslength"
        :value="tasksLength"
        label="Number of tasks"
        icon="list"
        color="#1A8FE2"
        suffix="tasks"/>

    </div>

    <EditableListTemplate
      v-bind:elements="elements"
      v-bind:dataModel="dataModel"
      v-bind:addable="true"
      v-bind:editable="true"
      v-bind:removable="true"
      v-bind:upsert="state.upsertTask.bind(state)"
      v-bind:remove="state.removeTask.bind(state)"
    />

  </div>
</template>

<script>
import EditableListTemplate from '../EditableListTemplate'
import Card from '../Card'
import State from '../../modules/state'
import Utils from '../../modules/utils'

export default {
  name: 'Tasks',

  data() {
    return {
      state: State,
    }
  },

  computed: {
    project() {
      return this.$route.params.project
    },
    tasksLength() {
      return this.elements.length
    },
    elements() {
      let tasks = Utils.dictToListWithIds(this.state.tasks)
      console.log(this.$route)
      if (this.$route.params.project) {
        // Filtering tasks (only for some user)
        const projectObj = Utils.dictToListWithIds(this.state.projects)
          .find(
            (project) => project.name ==  this.$route.params.project
          )
        if (projectObj) {
          tasks = tasks.filter(task => task.project == projectObj.id)
        }
      }
      return tasks
    },
    dataModel() {
      return {
        project: {
          kind: 'Reference',
          refCollection: Utils.dictToListWithIds(this.state.projects)
        },
        title: 'String',
        // currency: 'Currency',
        description: 'String',
        deadline: 'Date'
      }
    },
  },

  components: {
    EditableListTemplate,
    Card
  }
}
</script>

<style scoped>
  .cards {
    margin: auto;
  }

  h2 {
    margin: 20px;
  }
</style>
