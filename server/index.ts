import express, { Request, Response, NextFunction } from 'express';
import expressStaticGzip from 'express-static-gzip';
import path from 'path';
import router from './routes/routes';
const app = express();
const PORT = 3000;

const serveIndex = (req: Request, res: Response) => {
  res.status(200).sendFile(path.join(__dirname, '..', 'public', 'index.html'))
}

const invalidRoute = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).send('404: file not found.');
}

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occured.' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj);
  res.status(errorObj.status).json(errorObj.message.err)
}

app.use(express.json());
app.use('/dist', expressStaticGzip(path.join(__dirname, '..', 'dist'), {}));
app.get('/', serveIndex)
app.use('/puzzle', router)
app.use(invalidRoute) //catch all.
app.use(errorHandler) //handles errors.

app.listen(PORT, ()=>{
  console.log('Server listening on port ', PORT);
})