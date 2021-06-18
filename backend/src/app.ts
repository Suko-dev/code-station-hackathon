import { app } from "./server";

const port = process.env.PORT || 8080;
app.listen(port, async () => {
  console.log(`Servidor rodando na porta ${port}`);
});
