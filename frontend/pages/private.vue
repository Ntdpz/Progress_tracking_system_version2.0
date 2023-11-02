<template>
    <div>
      <h1>THiS IS PRIVATE</h1>
  
      <nuxt-link to="/">Go to Home</nuxt-link>
    </div>
  </template>
    
    <script>
  export default {
    middleware: "auth",
  };
  </script>