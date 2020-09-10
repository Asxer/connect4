<template>
  <main>
    <h1>Connect four</h1>
    <h3>Current player: {{ currentPlayerColor }}</h3>
    <h3>Winner: {{ winnerColor }}</h3>
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
