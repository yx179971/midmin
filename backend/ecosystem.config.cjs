module.exports = {
  apps: [
    // {
    //   name: "nuxt",
    //   port: "3000",
    //   exec_mode: "cluster",
    //   instances: "max",
    //   env: {
    //     NODE_ENV: "production",
    //   },
    //   script: "./.output/server/index.mjs",
    //   cwd: "/www/nuxt"
    // },
    {
      name: "server",
      port: "7001",
      exec_mode: "cluster",
      instances: "max",
      env: {
        NODE_ENV: "production",
      },
      script: "./bootstrap.js",
      cwd: "/www",
    },
  ],
};
