<template>
  <div>
    <h2 class="centered">Projects</h2>
    <EditableListTemplate
      v-bind:elements="elements"
      v-bind:dataModel="dataModel"
      v-bind:addable="true"
      v-bind:editable="true"
      v-bind:removable="true"
      v-bind:upsert="state.upsertProject.bind(state)"
      v-bind:remove="state.removeProject.bind(state)"
    />

  </div>
</template>

<script>
import EditableListTemplate from '../EditableListTemplate'
import State from '../../modules/state'
import Utils from '../../modules/utils'

export default {
  name: 'Projects',

  data() {
    return {
      dataModel: {
        name: 'String',
        description: 'String',
        category: 'String',
        tasks: 'Link',
      },
      state: State,
    }
  },

  computed: {
    elements() {
      let list = Utils.dictToListWithIds(this.state.projects)
      return list.map(el => {
        el.tasks = `/#/tasks/${el.name}`
        return el
      })
    }
  },

  components: {
    EditableListTemplate
  }
}
</script>

<style scoped>
  h2 {
    margin: 20px;
  }
</style>
