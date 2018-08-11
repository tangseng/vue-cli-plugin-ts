<template>
  <div class="demo">
    <img src="@/assets/logo.png"/>
    <div class="bg-img">{{demo || message}}</div>
    
    <portal-target name="ts"></portal-target>
    <portal to="ts">{{message}}</portal>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('demo')
import Mix from '@/mixins'
const { FetchCreaterMix } = Mix

export default {
  name: 'demo',

  meta: {
    title: 'ts demo'
  },

  mixins: [
    FetchCreaterMix('ts')
  ],

  data() {
    return {
      message: '---demo---'
    }
  },

  computed: {
    ...mapState(['demo'])
  },

  methods: {
    ...mapActions({
      'doYYY': 'yyy'
    }),
    
    tsColumns() {
      return []
    },

    tsFetchList() {
      return new Promise(resolve => {
        setTimeout(_ => {
          const data = []
          resolve({
            data,
            total: data.length
          })
        }, 3000)
      })
    }
  },

  created() {
    this.doYYY()
  }
}
</script>

<style scoped lang="postcss">
@import '@/styles/var.pcss';

.demo {
  color: red;

  & span {
    color: var(--color);
  }

  & .bg-img {
    width: 200px;
    height: 200px;
    background: url(@/assets/logo.png);
  }
}
</style>