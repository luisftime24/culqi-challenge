// store/session.ts

import { defineStore } from 'pinia';

export const useSessionStore = defineStore('session', {
  state: () => ({
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') ?? '') : '',
  }),
  actions: {
    login(user: any) {
      console.log(user)
      this.isLoggedIn = true;
      localStorage.setItem('isLoggedIn', 'true');

      this.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    logout() {
      this.isLoggedIn = false;
      localStorage.removeItem('isLoggedIn');

      this.user = null;
      localStorage.removeItem('user');
    },
  },
});
