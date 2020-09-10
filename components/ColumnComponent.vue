<template>
  <div class="column">
    <div class="cell">
      <button v-if="canAddChip" @click="makeStep(columnIndex)">V</button>
    </div>

    <div v-for="(point, index) in column.points"
         :key="index"
         class="cell">
      <point-component
        :point-index="index"
        :point="point"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { mapMutations, mapGetters } from 'vuex'
import { GettersType, MutationType } from '~/store'
import { Column } from '~/types'
import PointComponent from '~/components/PointComponent.vue'

@Component({
  components: { PointComponent },
  methods: mapMutations({ makeStep: MutationType.MAKE_STEP }),
  computed: mapGetters({ winnerColor: GettersType.GET_WINNER })
})
export default class ColumnComponent extends Vue {
  @Prop() columnIndex!: number;
  @Prop() column!: Column;

  get canAddChip () {
    return !this.column.isFull && !this.winnerColor
  }
}
</script>

<style scoped>

</style>
