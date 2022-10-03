<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h2>${{ rate }}/hr</h2>

    <div>
      <!-- <span v-for="area in areas" :key="area">{{ area }}</span> -->
      <base-badge
        v-for="area in areas"
        :key="area"
        :type="area"
        :title="area"
      ></base-badge>
    </div>

    <div class="actions">
      <base-button link :to="coachContactLink" mode="outline"
        >Contact Coach</base-button
      >
      <!-- <router-link :to="coachContactLink">Contact Coach</router-link> -->

      <base-button link :to="coachDetailsLink">View Details</base-button>
      <!-- <router-link :to="coachDetailsLink">View Details</router-link> -->
    </div>
  </li>
</template>

<script>
export default {
  props: ['id', 'firstName', 'lastName', 'rate', 'areas'],
  computed: {
    fullName() {
      return this.firstName + ' ' + this.lastName;
    },
    coachContactLink() {
      // return "/coaches/"+this.id+"/contact";
      return this.$route.path + '/' + this.id + '/contact';
      // return this.$route.path + '/' + this.id + '/c';
    },
    coachDetailsLink() {
      // return "/coaches/"+this.id;
      return this.$route.path + '/' + this.id;
    },
  },
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
