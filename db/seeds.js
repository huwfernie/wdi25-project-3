const mongoose = require('mongoose');
const { dbURI } = require('../config/environment');
mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

const User = require('../models/user');
const Track = require('../models/track');
const Sprint = require('../models/sprint');

User.collection.drop();

User
  .create([{
    username: 'Muge',
    email: 'm@m.com',
    password: 'm',
    passwordConfirmation: 'm',
    image: 'https://avatars0.githubusercontent.com/u/12150252?v=3&s=460'

  },{
    username: 'Huw',
    email: 'h@h.com',
    password: 'p',
    passwordConfirmation: 'p',
    image: 'https://lh6.googleusercontent.com/-Z05Md_BYdMQ/AAAAAAAAAAI/AAAAAAAAAzQ/tqRHm3qXopw/s0-c-k-no-ns/photo.jpg'

  },{
    username: 'Krisz',
    email: 'k@k.com',
    password: 'p',
    passwordConfirmation: 'p',
    image: 'https://avatars0.githubusercontent.com/u/23665636?v=3&s=460'
  },{
    username: 'Tom',
    email: 't@t.com',
    password: 'p',
    passwordConfirmation: 'p',
    image: 'https://avatars1.githubusercontent.com/u/22148681?v=3&s=460'

  }])
  .then((users) => {
    console.log(`${users.length} users created`);
    return Track
      .create([{
        name: 'Tower Buckingham Run',
        start: {
          name: 'Tower of London',
          lat: '51.508113',
          lng: '-0.075958',
          img: 'http://www.buckinghampalace.co.uk/assets/images/bp1.jpg'
        },
        finish: {
          name: 'Buckingham',
          lat: '51.501366',
          lng: '-0.141887',
          img: 'https://media1.britannica.com/eb-media/45/18545-004-FFFBAE09.jpg'
        },
        distance: '3.1 miles',
        attemptedBy: [],
        favedBy: []
      }]);
  })
  .then((track) => {
    console.log(`${track.length} tracks created`);
    return Sprint
      .create([{
        start: {
          time: 'Sat Mar 26 2017 10:34:12 GMT+0000 (GMT)',
          img: 'http://www.kobinazrul.towerhamlets.sch.uk/files/slideshows/728/5829d830b4528.jpg'
        },
        finish: {
          time: 'Sat Mar 26 2017 12:15:12 GMT+0000 (GMT)',
          img: 'http://i.dailymail.co.uk/i/pix/2014/04/06/article-2598044-1CE188AF00000578-133_634x386.jpg'
        },
        createdBy: ''
      }]);
  })
  .then((sprint) => console.log(`${sprint.length} sprints created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
