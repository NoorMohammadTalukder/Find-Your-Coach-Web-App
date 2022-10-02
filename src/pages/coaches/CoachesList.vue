<template>
  <section>Filter</section>

  <section>
    <base-card>
      <div class="controls">
        <base-button :mode="outline">Refresh</base-button>
        <!-- <button>Refresh</button> -->
        <base-button link to="/register">Register as Coach</base-button>
        <!-- <router-link to="/register">Register as Coach</router-link> -->
      </div>

      <ul v-if="hasCoaches">
        <!-- <li v-for="coach in filteredCoaches" :key="coach.id">
                {{ coach.firstName }}
              </li> -->
        <coach-item
          v-for="coach in filteredCoaches"
          :key="coach.id"
          :id="coach.id"
          :first-name="coach.firstName"
          :last-name="coach.lastName"
          :rate="coach.hourlyRate"
          :areas="coach.areas"
        ></coach-item>
      </ul>
      <h3 v-else>No Coaches Found...</h3>
    </base-card>
  </section>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';
import BaseButton from '../../components/ui/BaseButton.vue';
// import BaseCard from '../../components/ui/BaseCard.vue'
export default {
  components: { CoachItem, BaseButton },
  computed: {
    filteredCoaches() {
      // console.log(this.$store.getters["coaches/coaches"]);
      return this.$store.getters['coaches/coaches'];
    },

    hasCoaches() {
      return this.$store.getters['coaches/hasCoaches'];
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
