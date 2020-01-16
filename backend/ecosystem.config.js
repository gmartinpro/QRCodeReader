module.exports = {
  apps: [
    {
      name: "API",
      script: "npm",
      args: "run prod",
      instances: 1,
      autorestart: true,
      env: {
        ENV: "dev",
        SECRETJWT: "secret",
      },
    },
  ],
};
