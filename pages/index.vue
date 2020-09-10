<template>
  <main>
    <header class="header">
      <template v-if="winnerColor">
        <h3 class="header-winner">Winner</h3>
        <div class="cell">
          <div class="point" :class="`point-${winnerColor}`"></div>
        </div>
      </template>

      <template v-else>
        <h3 class="header-player">Current player</h3>
        <div class="cell">
          <div class="point" :class="`point-${currentPlayerColor}`"></div>
        </div>
      </template>
    </header>

    <div class="field">
      <column-component
        v-for="(column, index) in field"
        :column-index="index"
        :column="column"
        :key="index"
      ></column-component>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapGetters, mapState } from 'vuex'
import { GettersType } from '~/store';
import ColumnComponent from '~/components/ColumnComponent.vue'

@Component({
  components: { ColumnComponent },
  computed: {
    ...mapState([ 'field', 'currentPlayerColor', 'winnerColor' ]),
    ...mapGetters({ winnerColor: GettersType.GET_WINNER })
  }
})
export default class Index extends Vue {}
</script>
