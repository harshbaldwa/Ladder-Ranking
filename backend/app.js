const express = require('express');

const app = express();

const Challenge = require('./models/challenge');

function predicateBy(prop) {
  return (a, b) => {
    if (a[prop] > b[prop]) {
      return -1;
    } else if (a[prop] < b[prop]) {
      return 1;
    }
    return 0;
  };
}

app.get((req, res, next) =>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
})

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get('/api/challenges', (req, res, next) => {
  const challenges = [
    {
      challengerId: 'augubcieh',
      challengeId: 'gosdifhiho',
      challengerName: 'Harshvardhan Baldwa',
      sport: 'Squash',
      time: '9:30 A.M.',
      date: '10/10/2019',
      message: 'It would be fun!'
    },
    {
      challengerId: 'alsdapsdasd',
      challengeId: 'asdjaskdlk',
      challengerName: 'Amal Sebastian',
      sport: 'Squash',
      time: '10:30 A.M.',
      date: '10/10/2019',
      message: 'See you at the court'
    },
  ];
  res.status(200).json(challenges);
});

app.get('/api/confirmations', (req, res, next) => {
  const confirmations = [{
      challengerId: 'augubcieh',
      challengeId: 'gosdifhiho',
      challengerName: 'Harshvardhan Baldwa',
      sport: 'Squash',
      setScore: '11-5;11-6;11-3;11-9;11-7',
      matchScore: '5-0'
    },
    {
      challengerId: 'alsdapsdasd',
      challengeId: 'asdjaskdlk',
      challengerName: 'Amal Sebastian',
      sport: 'Squash',
      setScore: '11-5;11-6;11-3;11-9;11-7',
      matchScore: '5-0'
    },
  ];
  res.status(200).json(confirmations);
});

app.get('/api/table/squash', (req, res, next) => {
  const squashData = [
    { id: 'kasljdlaj', rank: null, username: 'Jin-Yang', points: 1200, category: 'Inter IIT Team' },
    { id: 'kasljdlaj', rank: null, username: 'Gavin Belson', points: 1100, category: 'Inter IIT Camp' },
    { id: 'kasljdlaj', rank: null, username: 'Richard Hendricks', points: 1000, category: 'Intermediate' },
    { id: 'kasljdlaj', rank: null, username: 'Jared Dunn', points: 900, category: 'NSO' },
    { id: 'kasljdlaj', rank: null, username: 'Erlich Bachman', points: 800, category: 'Beginner' },
    { id: 'kasljdlaj', rank: null, username: 'Russ Hanneman', points: 1500, category: 'Beginner' },
    { id: 'kasljdlaj', rank: null, username: 'Jin-Yang', points: 700, category: 'Inter IIT Team' },
    { id: 'kasljdlaj', rank: null, username: 'Gavin Belson', points: 600, category: 'Inter IIT Camp' },
    { id: 'kasljdlaj', rank: null, username: 'Richard Hendricks', points: 500, category: 'Intermediate' },
    { id: 'kasljdlaj', rank: null, username: 'Jared Dunn', points: 400, category: 'NSO' },
    { id: 'kasljdlaj', rank: null, username: 'Erlich Bachman', points: 300, category: 'Beginner' },
    { id: 'kasljdlaj', rank: null, username: 'Russ Hanneman', points: 200, category: 'Beginner' },
  ];

  squashData.sort(predicateBy('points'));

  for (let i = 0; i < squashData.length; i++) {
    squashData[i].rank = i + 1;
  }
  res.status(200).json(squashData);
});

app.get('/api/table/tt', (req, res, next) => {
  const ttData = [
    { id: 'kasljdlaj', rank: null, username: 'Jin-Yang', points: 100, category: 'Inter IIT Team' },
    { id: 'kasljdlaj', rank: null, username: 'Gavin Belson', points: 1200, category: 'Inter IIT Camp' },
    { id: 'kasljdlaj', rank: null, username: 'Richard Hendricks', points: 379, category: 'Intermediate' },
    { id: 'kasljdlaj', rank: null, username: 'Jared Dunn', points: 234, category: 'NSO' },
    { id: 'kasljdlaj', rank: null, username: 'Erlich Bachman', points: 456, category: 'Beginner' },
    { id: 'kasljdlaj', rank: null, username: 'Russ Hanneman', points: 123, category: 'Beginner' },
  ];

  ttData.sort(predicateBy('points'));

  for (let i = 0; i < ttData.length; i++) {
    ttData[i].rank = i + 1;
  }
  res.status(200).json(ttData);
});

app.get('/api/table/tennis', (req, res, next) => {
  const tennisData = [
    { id: 'kasljdlaj', rank: null, username: 'Jin-Yang', points: 1200, category: 'Inter IIT Team' },
    { id: 'kasljdlaj', rank: null, username: 'Gavin Belson', points: 1100, category: 'Inter IIT Camp' },
    { id: 'kasljdlaj', rank: null, username: 'Richard Hendricks', points: 1000, category: 'Intermediate' },
    { id: 'kasljdlaj', rank: null, username: 'Jared Dunn', points: 900, category: 'NSO' },
    { id: 'kasljdlaj', rank: null, username: 'Erlich Bachman', points: 800, category: 'Beginner' },
    { id: 'kasljdlaj', rank: null, username: 'Russ Hanneman', points: 1500, category: 'Beginner' },
  ];

  tennisData.sort(predicateBy('points'));

  for (let i = 0; i < tennisData.length; i++) {
    tennisData[i].rank = i + 1;
  }
  res.status(200).json(tennisData);
});

app.get('/api/table/badminton', (req, res, next) => {
  const badmintonData = [
    { id: 'kasljdlaj', rank: null, username: 'Jin-Yang', points: 100, category: 'Inter IIT Team' },
    { id: 'kasljdlaj', rank: null, username: 'Gavin Belson', points: 1200, category: 'Inter IIT Camp' },
    { id: 'kasljdlaj', rank: null, username: 'Richard Hendricks', points: 379, category: 'Intermediate' },
    { id: 'kasljdlaj', rank: null, username: 'Jared Dunn', points: 234, category: 'NSO' },
    { id: 'kasljdlaj', rank: null, username: 'Erlich Bachman', points: 456, category: 'Beginner' },
    { id: 'kasljdlaj', rank: null, username: 'Russ Hanneman', points: 123, category: 'Beginner' },
  ];

  badmintonData.sort(predicateBy('points'));

  for (let i = 0; i < badmintonData.length; i++) {
    badmintonData[i].rank = i + 1;
  }
  res.status(200).json(badmintonData);
});

app.post('/api/postChallenge', (req, res, next) => {
  const challenge = new Challenge({
    challengeId: req.body.challengeId ,
    challengerId: req.body.challengerId ,
    sport: req.body.sport ,
    message: req.body.message ,
    time: req.body.time ,
    date: req.body.date
  });
  console.log(challenge);
  res.status(201).json({
    message: 'Challenge Addded Successfully'
  });
});

module.exports = app;
