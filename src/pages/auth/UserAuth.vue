<template>
  <div>
    <base-dialog :show="isError" title="An error occured" @close="handleError">{{error}}</base-dialog>
    <base-dialog :show="isLoading" title="Authenticating..." fixed>
      <p>Authenticating ... ... ...</p>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">Email</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" />
        </div>
        <p v-if="!formIsvalid">Enter valid email or password</p>
        <base-button>{{ submitButtonCaption }}</base-button>
        <base-button type="button" mode="flat" @click="switchAuthMode">{{
          switchModeButtonCaption
        }}</base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      formIsvalid: true,
      mode: 'login',
      isLoading: false,
      isError: false,
      error: null,
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === 'login') {
        return 'Login';
      } else {
        return 'Signup';
      }
    },
    switchModeButtonCaption() {
      if (this.mode === 'login') {
        return 'Signup instead';
      } else {
        return 'Login instead';
      }
    },
  },
  methods: {
    async submitForm() {
      this.formIsvalid = true;
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.password.length < 3
      ) {
        this.formIsvalid = false;
        return;
      }

      this.isLoading = true;

      try {
        if (this.mode === 'login') {
            await this.$store.dispatch('login', {
            email: this.email,
            password: this.password,
          });
        } else {
          await this.$store.dispatch('signup', {
            email: this.email,
            password: this.password,
          });
         
        }
        const redirectUrl='/'+(this.$route.query.redirect || 'coaches');
        this.$router.replace(redirectUrl);
        // this.$router.replace('/coaches');
      } catch (err) {
        this.error = err.message || 'Failed to authenticate,try later';
        this.isError=true;
      }

      this.isLoading = false;
    },
    switchAuthMode() {
      if (this.mode === 'login') {
        this.mode = 'signup';
      } else {
        this.mode = 'login';
      }
    },
    handleError(){
        this.error=null;
        this.isError=false;
    }
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  /* border: 1px solid #ccc;
  border-radius: 12px; */
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
