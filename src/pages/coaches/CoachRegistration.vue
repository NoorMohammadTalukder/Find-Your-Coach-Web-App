<template>
  <section>
    <base-card>
      <h1>Register as a Coach...</h1>
      <coach-form></coach-form>
    </base-card>
  </section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';
export default {
  components: {
    CoachForm,
  },
};
</script>

<style scoped>
h1{
    color: rgb(73, 7, 196);
}
</style>