<template>
  <tr>
    <td v-for="field in fields" v-bind:key="field">
      <input
        v-if="editing && getType(field) !== 'ref' && getType(field) !== 'link'"
        class="mdl-textfield__input"
        v-bind:id="field"
        v-model="data[field]"
        v-bind:type="getType(field)"
      >

      <select
        v-if="editing && getType(field) == 'ref'"
        v-bind:id="field"
        v-model="data[field]"
      >
        <option
          v-for="refVal in getRefVals(field)"
          v-bind:key="refVal.id"
          v-bind:value="refVal.id"
        >
          {{ getRefTitle(refVal.id, field) }}
        </option>
        <!-- class="mdl-textfield__input" -->
      </select>

      <a v-if="getType(field) == 'link'" v-bind:href="data[field]">See tasks for project</a>
      
      <span v-if="!editing && getType(field) != 'ref' && getType(field) !== 'link'">
        {{ data[field] }}
      </span>

      <span v-if="!editing && getType(field) == 'ref'">
        {{ getRefTitle(data[field], field) }}
      </span>
    </td>

    <td v-if="editable">
      <!-- TODO replace text with pen icon -->
      <!-- TODO implement -->
      <a v-if="!editing" href="#" v-on:click="startEditing">
        <span class="material-icons">edit</span>
      </a>

      <a v-if="editing" href="#" v-on:click="stopEditing">
        <span class="material-icons">save</span>
      </a>

      <a v-if="removable" href="#" v-on:click="removeElement">
        <span class="material-icons">delete</span>
      </a>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'EditableListTemplate',
  data() {
    return {
      editing: this.startWithEditing,
      getType(field) {
        const fieldType = this.dataModel[field]
        switch (fieldType) {
          case 'String':
            return 'text'
          case 'Date':
            return 'date'
          case 'Money':
            return 'number'
          case 'Link':
            return 'link'
          default:
            if (typeof(fieldType) == 'object') {
              // reference
              if (fieldType.kind == 'Reference') {
                return 'ref'
              }
            }
            return 'text'
        }
      },
      getRefVals(field) {
        if (this.getType(field) !== 'ref') {
          throw 'Can not get ref vals from non-reference'
        }
        return this.dataModel[field].refCollection
      },
      getRefTitle(id, field) {
        const refVals = this.getRefVals(field)
        const refVal = refVals.find(refVal => refVal.id == id)
        if (refVal) {
          return refVal.name // we could pass refTitleFieldName in param
        } else {
          return ''
        }
      }
    }
  },
  props: {
    data: Object,
    dataModel: Object, // dictionary with fields and types (types: ['String', 'Money', 'Date', 'Number'])
    editable: Boolean,
    removable: Boolean,
    startWithEditing: Boolean,
    upsert: Function,
    remove: Function
  },
  computed: {
    fields() {
      return Object.keys(this.dataModel)
    }
  },
  methods: {
    startEditing() {
      this.editing = true
    },
    stopEditing() {
      this.upsert(this.data)
      this.editing = false
    },
    removeElement() {
      const sure = confirm(
                              'Are you sure you want to delete element with id: '
                              + this.data.id
                            )
      if (sure) {
        this.remove(this.data)
      }
    }
  }
}
</script>

<style scoped>

  td {
    width: 15vw;
    text-align: center;
  }

  a {
    margin: 9px;
  }
</style>
