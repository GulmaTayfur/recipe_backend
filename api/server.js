const express = require("express");
const cors = require("cors");
const recipteRouter = require("./routes/recipeRoutes");

const app = express();

// cors hatalarını önleyen middleware(oto headerlar ekler)
app.use(cors());
// bodydeki json verilerini js verilerini çevirme
app.use(express.json());
// server'a tarif ile alakalı routerları tanıttık
app.use(recipteRouter);

// dinlenilecek portu belirle
app.listen(4001, () => {
  console.log("Server 4001 portu dinleme başladı");
});
