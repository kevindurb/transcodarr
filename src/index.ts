import bodyParser from 'body-parser';
import express from 'express';

const app = express();
app.use(bodyParser.json());

app.listen(process.env.PORT, () =>
	console.log(`API Listening at http://localhost:${process.env.PORT}`),
);
