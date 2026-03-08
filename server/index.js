import dotenv from "dotenv";
import app from "./app.js";
import { connectedDb } from "./db/index.js";

dotenv.config();

connectedDb()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Started listening to PORT: ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log("Something went wrong!", err));
