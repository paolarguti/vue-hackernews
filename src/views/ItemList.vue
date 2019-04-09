<template>
  <div class="item-list">
    <item
      v-for="item in displayItems"
      :key="item.id"
      :item="item">
    </item>
  </div>
</template>

<script>
  import item from '../components/Item.vue'

  export default {
    data () {
      return {
        displayItems: window.items
      }
    },

    components: {
      item
    },
  }
</script>
