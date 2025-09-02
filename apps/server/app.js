import express from 'express';
import cors from 'cors';

const app = express();

// middleware setup 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors());


export default app;