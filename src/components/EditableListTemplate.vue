<template>
  <div>
    <table class="mdl-data-table mdl-shadow--2dp centered">
      <thead>
        <tr>
          <th v-for="field in fields" v-bind:key="field">
            {{ Utils.capitalizeFirst(field) }}
          </th>
          <th v-if="editable"></th>
        </tr>
      </thead>
      
      <tbody>
        <EditableListElement
          v-for="element in elements"
          v-bind:key="element.id"
          v-bind:data="element"
          v-bind:dataModel="dataModel"
          v-bind:editable="editable"
          v-bind:removable="removable"
          v-bind:startWithEditing="element.id == idOfEditingElement"
          v-bind:upsert="upsert"
          v-bind:remove="remove"
        />
      </tbody>
      
    </table>


    <div class="add-button-container">
      <button
        v-if="addable"
        v-on:click="addNew"
        type="button"
        class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored mdl-color--green-300">
        <span class="material-icons">add</span>
      </button>
    </div>

  </div>
</template>

<script>
import EditableListElement from './EditableListElement'
import Utils from '../modules/utils'

export default {
  name: 'EditableListTemplate',
  props: {
    elements: Array,
    dataModel: Object, // dictionary with fields and types (types: ['String', 'Money', 'Date', 'Number'])
    addable: Boolean,
    editable: Boolean,
    removable: Boolean,
    upsert: Function,
    remove: Function
  },
  data() {
    return {
      idOfEditingElement: null,
      Utils
    }
  },
  components: {
    EditableListElement
  },
  computed: {
    fields() {
      return Object.keys(this.dataModel)
    }
  },
  methods: {
    addNew() {
      const newEl = this.upsert({})
      this.idOfEditingElement = newEl.id
    }
  }
}
</script>

<style scoped>
  th {
    text-align: center;
  }

  .add-button-container {
    position: fixed;
    right: 100px;
    bottom: 100px;
  }
</style>
