<template>
    <div>
      <form @submit.prevent="submitForm">
      <div class="form-control">
        <label for="email">Enter Email</label>
        <input type="email" id="email" v-model.trim="email" />
      </div>
      <div class="form-control">
        <label for="message">Enter Your Message</label>
        <textarea rows="5" id="message" v-model.trim="message"></textarea>
      </div>
      <p class="errors" v-if="!formIsValid">
        Please fill up the mail and message box
      </p>
      <div class="actions">
        <base-button>Send Message</base-button>
      </div>
    </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        message: '',
        formIsValid: true,
      };
    },
    methods: {
      submitForm() {
        //   alert()
        this.formIsValid = true;
  
        if (
          this.email === '' ||
          !this.email.includes('@') ||
          this.message === ''
        ) {
          this.formIsValid = false;
          return;
        }
        this.$store.dispatch('requests/contactCoach', {
          email: this.email,
          message: this.message,
          coachId: this.$route.params.id,
        });
        this.$router.replace('/coaches');
        // this.$router.push('/coaches');
      },
    },
  };
  </script>
  
  <style scoped>
  form {
    margin: 1rem;
    border: 1px solid #ccc;
    border-radius: 12px;
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
  
  .errors {
    font-weight: bold;
    color: red;
  }
  
  .actions {
    text-align: center;
  }
  </style>
  