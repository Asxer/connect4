<template>
  <div class="column">
    <div class="cell">
      <i v-if="canAddChip" @click="makeStep(columnIndex)" class="arrow-down"></i>
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
import { mapMutations } from 'vuex'
import { GettersType, MutationType } from '~/store'
import { Column } from '~/types'
import { PlayerColor } from "~/enums/player-color.enum";
import PointComponent from '~/components/PointComponent.vue'

@Component({
  components: { PointComponent },
  methods: mapMutations({ makeStep: MutationType.MAKE_STEP }),
})
export default class ColumnComponent extends Vue {
  @Prop() columnIndex!: number;
  @Prop() column!: Column;

  get canAddChip () {
    return !this.column.isFull && !this.winnerColor
  }

  get winnerColor (): PlayerColor | null {
    return this.$store.getters[GettersType.GET_WINNER]
  }
}
</script>

<style scoped>

</style>
