const express = require('express');
const app = express();
const axios = require('axios');
const Nasa = require('./Stars');

const api_key = 'ul7dvrR0z6OSbJB1DMnnnElyeLyncp4dWsNY7bFM';

//localhost:5000/getmovie?title=MovieTitle
app.get('/getstar', (req, res) => {
  console.log(req.query.title)
  var title = req.query.search == '' ? 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY' : req.query.search;
  const querystr = `https://api.nasa.gov/planetary/apod?api_key=${api_key}&date=${req.query.title}`;
  console.log(querystr)
  try{
  axios
    .get(querystr)
    .then(response => {
      const nasa = new Nasa({
        image: response.data.url,
        title: response.data.title,
        date: response.data.date,
        explanation: response.data.explanation,
      });
      if (!nasa.title) {
        res.status(200).json('Not found');
        return;
      }
      nasa
        .save()
        .then(response => {
          res.status(200).json(response);
        })
        .catch(error => {
          res.status(400).json(error);
        });
    })
    .catch(error => {
      console.log(error)
      res.status(400).json(error);
    });
  }catch(e){}
});


//localhost:5000/getallmovies
app.get('/getallstar', (req, res) => {
  Nasa.find({})
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

//localhost:5000/deletemovie?title=MovieTitle
app.get('/deletestar', (req, res) => {
  Nasa.deleteOne({ title: req.query.title })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

app.listen(5000, () => {
  console.log('server listening on port 5000');
});
