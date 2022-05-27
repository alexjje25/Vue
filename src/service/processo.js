function myEnv() {
  let response = process.env.NODE_ENV;
  if (response == "development") return "DEV";
  else return "PROD";
}

export { myEnv };
