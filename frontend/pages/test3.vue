<template>
  <div>
    <h1>Welcome to My App</h1>
    <p>You are logged in as {{ user.role }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        role: "admin", // replace this with your logic to get the user role
      },
    };
  },
  // dynamic layout based on the user role
  layout: (context) => {
    console.log(context, "context");
    const userRole = "admin";
    return userRole === "admin" ? "admin" : "Nav";
  },
};
</script>