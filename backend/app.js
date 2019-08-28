const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const check_auth = require('./check_auth');

const app = express();

mongoose //YnwLdH8guBV9EOam
  .connect(
    //"mongodb://ladder:YnwLdH8guBV9EOam@cluster0-shard-00-00-cvuiq.mongodb.net:27017,cluster0-shard-00-01-cvuiq.mongodb.net:27017,cluster0-shard-00-02-cvuiq.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"
    "mongodb://localhost:27017/myapp"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(error => {
    console.log(error);
  });

app.use(express.json());

const Player = require('./models/player');
const Match = require('./models/match');


app.get((req, res, next) =>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
})

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Ladder Table
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
// Squash Data
app.get('/api/table/squash', (req, res, next) => {
  const squashData = [];
  Player.find().then(documents => {
    for (let i = 0; i < documents.length; i++) {
      squashData.push({
        id: documents[i]["_id"],
        rank: null,
        username: documents[i]["name"],
        points: documents[i]["squash_score"],
        category: documents[i]["category"]
      });
    }
    squashData.sort(predicateBy("points"));

    for (let i = 0; i < squashData.length; i++) {
      squashData[i].rank = i + 1;
    }
    res.status(200).json(squashData);
  });
});
// Table Tennis Data
app.get('/api/table/tt', (req, res, next) => {
  const ttData = [];
  Player.find().then(documents => {
    for (let i = 0; i < documents.length; i++) {
      ttData.push({
        id: documents[i]["_id"],
        rank: null,
        username: documents[i]["name"],
        points: documents[i]["tt_score"],
        category: documents[i]["category"]
      });
    }
    ttData.sort(predicateBy("points"));

    for (let i = 0; i < ttData.length; i++) {
      ttData[i].rank = i + 1;
    }
    res.status(200).json(ttData);
  });
});
// Lawn Tennis Data
app.get('/api/table/tennis', (req, res, next) => {
  const tennisData = [];
  Player.find().then(documents => {
    for (let i = 0; i < documents.length; i++) {
      tennisData.push({
        id: documents[i]["_id"],
        rank: null,
        username: documents[i]["name"],
        points: documents[i]["tennis_score"],
        category: documents[i]["category"]
      });
    }
    tennisData.sort(predicateBy("points"));

    for (let i = 0; i < tennisData.length; i++) {
      tennisData[i].rank = i + 1;
    }
    res.status(200).json(tennisData);
  });
});
// Badminton Data
app.get('/api/table/badminton', (req, res, next) => {

  const badmintonData = [];
  Player.find().then(documents => {
    for (let i = 0; i < documents.length; i++) {
      badmintonData.push({id: documents[i]['_id'], rank: null, username: documents[i]['name'], points: documents[i]['baddy_score'], category: documents[i]['category']});
    }
    badmintonData.sort(predicateBy("points"));

    for (let i = 0; i < badmintonData.length; i++) {
      badmintonData[i].rank = i + 1;
    }
    res.status(200).json(badmintonData);
  });
});

// Add a challenge
app.post('/api/addMatch', (req, res, next) => {
  const match = new Match({
    p1_id: req.body.p1_id,
    p1_name: req.body.p1_name,
    p2_id: req.body.p2_id,
    p2_name: req.body.p2_name,
    sport: req.body.sport,
    message: req.body.message,
    date: req.body.date,
    time: req.body.time,
    set_score: "",
    match_score: "",
    winner_1: false,
    winner_2: false,
    confirm_1: false,
    confirm_2: false,
    report_secy: false
  });
  match.save().then(() => {
    console.log('Done');
  }).catch((error) => {
    console.log(error);
  });
});



// Display Challenges
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

// Display Confirmations
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

// User signup and login

app.post('/api/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const player = new Player({
        name: req.body.name,
        roll: req.body.roll,
        hostel: req.body.hostel,
        gender: req.body.gender,
        category: req.body.category,
        preferred: req.body.preferred,
        contact: req.body.contact,
        password: hash
      });
      player.save()
        .then(result => {
          res.status(201).json({
            result: result
          });
        })
          .catch(err => {
            res.status(500).json({
              error: err
            });
          });
    });
});

app.post("/api/login", (req, res, next) => {
  let fetchedPlayer;
  Player.findOne({roll: req.body.roll})
    .then(player => {
      if (!player) {
        return res.status(401).json({
          messgae: 'Auth failed!'
        });
      }
      fetchedPlayer = player;
      return bcrypt.compare(req.body.password, player.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          messgae: "Auth failed!"
        });
      }
      const token = jwt.sign(
        { roll: fetchedPlayer.roll, playerId: fetchedPlayer._id },
        "harsh_is_god_he_is_invincible",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token
      })
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = app;
