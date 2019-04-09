<template>
  <ul>
    <li>
      <a :href="item.url">{{ item.title }}</a>({{ item.score }}) by {{ item.author }} {{ item.url }}
    </li>
  </ul>
</template>

<script>
  export default {
    props: [ 'item' ],
  }
</script>
