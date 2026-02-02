import App from "./app";
import TodoRoutes from "./routes/todo.routes";
import "dotenv/config";

import { BookRoutes } from "./routes/bookRoutes";
import { UserRoutes } from "./routes/userRoutes";

const app = new App([new TodoRoutes(), new BookRoutes(), new UserRoutes()]);
app.startServer();
