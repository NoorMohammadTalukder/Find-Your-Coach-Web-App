<template>
 <div>
  <base-dialog :show="isError" title="An error occured" @close="handleError">
    <p>{{error}}</p>
  </base-dialog>
  <!-- <base-dialog v-if="isError" >
    <p>{{error}}</p>
  </base-dialog> -->
  <section>
    <coach-filter @change-filter="setFilters"></coach-filter>
  </section>

  <section>
    <base-card>
      <div class="controls">
        <base-button :mode="outline" @click="loadCoaches(true)">Refresh</base-button>
        <base-button link to="/auth?redirect=register" v-if="!isLoggedIn">Login as Coach</base-button>
        <!-- <button>Refresh</button> -->
        <base-button v-if="isLoggedIn && !isCoach && !isLoading" link to="/register"
          >Register as Coach</base-button
        >
        <!-- <router-link to="/register">Register as Coach</router-link> -->
      </div>

      <div v-if="isLoading">
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
 </div>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';
import BaseButton from '../../components/ui/BaseButton.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';
import BaseDialog from '../../components/ui/BaseDialog.vue';

// import BaseCard from '../../components/ui/BaseCard.vue'
export default {
  components: { CoachItem, BaseButton, CoachFilter, BaseDialog },

  data() {
    return {
      isLoading: false,
      // Loading:true,
      error: null,
      isError:false,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    isLoggedIn(){
      return this.$store.getters.isAuthenticated;
    },
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
  created() {
    this.loadCoaches();
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async loadCoaches(refresh=false) {
      this.isLoading = true;
      try {
        // console.log("1->"+ this.isLoading)
        await this.$store.dispatch('coaches/loadCoaches',{forceRefresh:refresh});
      } catch (error) {
        this.error = error.message || 'Something went wrong';
        this.isError=true;
      }

      this.isLoading = false;
      // console.log("2->"+ this.isLoading)
    },
    handleError(){
      this.error=null;
      this.isError=false;
    }
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
