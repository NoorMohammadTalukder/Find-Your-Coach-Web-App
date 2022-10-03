<template>
  <section>
    <base-card>
      <h1>Register as a Coach...</h1>
      <coach-form @save-data="saveData"></coach-form>
    </base-card>
  </section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';
export default {
  components: {
    CoachForm,
  },
 
  methods:{
      saveData(data){
          this.$store.dispatch('coaches/registerCoach',data);
          this.$router.replace('/coaches')
      }
  }
};
</script>

<style scoped>
h1{
    color: rgb(73, 7, 196);
}
</style>