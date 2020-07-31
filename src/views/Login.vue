<template>
  <div class="login">
    <v-container>
      <v-row>
        <v-col class="mx-auto" :cols="4" md="3">
          <v-img alt="company logo" src="../assets/logo.png" />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="mx-auto" md="6">
          <v-img alt="company logo" src="../assets/schriftzug.png" />
        </v-col>
      </v-row>
      <v-spacer class="py-2"></v-spacer>
      <v-row>
        <v-col class="mx-auto" :cols="12" md="6">
          <v-card outlined class="mx-auto">
            <v-card-text>
              <v-form>
                <v-text-field
                  label="email"
                  v-model="email"
                  name="email"
                  prepend-icon="mdi-mail"
                  type="text"
                ></v-text-field>

                <v-text-field
                  id="password"
                  label="Password"
                  v-model="password"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn depressed color="primary" @click="loginUser()"
                >Login</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    loginUser() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          (user) => {
            console.log(user);
            this.$router.replace("/");
          },
          (err) => {
            console.log(err.message);
          }
        );
    },
  },
};
</script>
