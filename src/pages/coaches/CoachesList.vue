<template>
  <section>
    <coach-filter @change-filter="setFilters"></coach-filter>
  </section>

  <section>
    <base-card>
      <div class="controls">
        <base-button :mode="outline" @click="loadCoaches">Refresh</base-button>
        <!-- <button>Refresh</button> -->
        <base-button v-if="!isCoach && !isLoading" link to="/register">Register as Coach</base-button>
        <!-- <router-link to="/register">Register as Coach</router-link> -->
      </div>

      <div  v-if="isLoading">
        <base-spinner></base-spinner>
      </div>

      <ul v-else-if="hasCoaches">
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
import CoachFilter from '../../components/coaches/CoachFilter.vue';


// import BaseCard from '../../components/ui/BaseCard.vue'
export default {
  components: { CoachItem, BaseButton, CoachFilter,  },

  data() {
    return {
      isLoading:false,
    // Loading:true,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    filteredCoaches() {
      // console.log(this.$store.getters["coaches/coaches"]);
      const coaches = this.$store.getters['coaches/coaches'];
      return coaches.filter((coach) => {
        if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes('backend')) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes('career')) {
          return true;
        }
        return false;
      });
    },

    hasCoaches() {
      return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
    },
    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    },
  },
  created(){
    this.loadCoaches();
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async loadCoaches(){
      this.isLoading=true;
      // console.log("1->"+ this.isLoading)
      await this.$store.dispatch('coaches/loadCoaches');
      this.isLoading=false;
      // console.log("2->"+ this.isLoading)
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
