module.exports = (mongoose, config) => {
  const database = mongoose.connection;
  mongoose.Promise = Promise;

  mongoose.connect(
    config.database,
    {
      promiseLibrary: global.Promise,
      useNewUrlParser: true
    }
  );

  database.on("error", error =>
    console.log(`Connection to SquadManager database failed: ${error}`)
  );
  database.on("connected", () =>
    console.log("Connected to SquadManager database")
  );
  database.on("disconnected", () =>
    console.log("Disconnected from SquadManager database")
  );

  process.on("SIGINT", () => {
    database.close(() => {
      console.log("SquadManager terminated, connection closed");
      process.exit(0);
    });
  });
};
