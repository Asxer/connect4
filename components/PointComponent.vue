<template>
  <div class="point" :class="`point-${point.color}`"></div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Point } from '~/types'

@Component({})
export default class PointComponent extends Vue {
  @Prop() pointIndex!: number;
  @Prop() point!: Point;
}
</script>

<style scoped>

</style>
