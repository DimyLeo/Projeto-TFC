import * as express from 'express';
import leaderboardRoutes from './routes/leaderboardRoutes';
import loginRoutes from './routes/loginRoutes';
import matchesRoutes from './routes/matchesRoutes';
import teamRoutes from './routes/teamRoutes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    this.app.use('/login', loginRoutes);
    this.app.use('/teams', teamRoutes);
    this.app.use('/matches', matchesRoutes);
    this.app.use('/leaderboard', leaderboardRoutes);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export default App;
