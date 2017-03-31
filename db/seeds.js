const mongoose = require('mongoose');
const { dbURI } = require('../config/environment');
mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

const User = require('../models/user');
const Track = require('../models/track');
const Sprint = require('../models/sprint');

User.collection.drop();
Track.collection.drop();
Sprint.collection.drop();

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
  },{
    username: 'a',
    email: 'a@a.com',
    password: 'a',
    passwordConfirmation: 'a',
    image: 'https://avatars1.githubusercontent.com/u/22148681?v=3&s=460'
  }])
  .then((users) => {
    console.log(`${users.length} users created`);
    return Track
      .create([{
        name: 'Tower of London - Tower Bridge',
        start: {
          name: 'Tower of London',
          lat: '51.50735350177636',
          lng: '-0.076121',
          img: 'https://media1.britannica.com/eb-media/45/18545-004-FFFBAE09.jpg'
        },
        finish: {
          name: 'Tower Bridge',
          lat: '51.505778',
          lng: '-0.075982',
          img: 'http://blog.museumoflondon.org.uk/wp-content/uploads/2014/07/Tower-Bridge-raised-blog.jpg'
        },
        distance: 0.3
      },{
        name: 'Big Ben - St Paul',
        start: {
          name: 'Big Ben',
          lat: '51.500901999999996',
          lng: '-0.120697',
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdNNyNazMS_xoR0Mp9vww_DkabDlMEQVbBCzSQ4hDSVOVwfDiu'
        },
        finish: {
          name: 'St Paul',
          lat: '51.513563',
          lng: '-0.0984799861907959',
          img: 'http://www.astoft2.co.uk/london/P1030970-transf-wandyellred-cln-u1-h540-u0.3t5-q60-selnonblue-varyr0div.jpg'
        },
        distance: 3.1
      },{
        name: 'London Eye - Battersea',
        start: {
          name: 'London Eye',
          lat: '51.503226',
          lng: '-0.118532',
          img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/London-Eye-2009.JPG/1200px-London-Eye-2009.JPG'
        },
        finish: {
          name: 'Battersea',
          lat: '51.482719',
          lng: '-0.144839',
          img: 'https://static.dezeen.com/uploads/2011/12/dezeen_Farrells-Battersea-Power-Station_1.jpg'
        },
        distance: 2.4
      },{
        name: 'Trafalgar Square - Royal Albert Hall',
        start: {
          name: 'Trafalgar Square',
          lat: '51.508078',
          lng: '-0.12808',
          img: 'http://cdn.ltstatic.com/2006/April/GK587344_942long.jpg'
        },
        finish: {
          name: 'Royal Albert Hall',
          lat: '51.50118281543877',
          lng: '-0.177498',
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8DSxyJ9jZb9Z4bjnizsTK8-BS4-UmxOsYNiCmgqpEKFXXmKeA'
        },
        distance: 2.4
      },{
        name: 'Thames Riverfront - White Lodge',
        start: {
          name: 'Thames Riverfront',
          lat: '51.457558',
          lng: '-0.306973',
          img: 'http://i.dailymail.co.uk/i/pix/2013/03/29/article-2301345-026F165A00000578-337_636x421.jpg'
        },
        finish: {
          name: 'Richmond Park White Lodge',
          lat: '51.445375',
          lng: '-0.265327',
          img: 'http://i.telegraph.co.uk/multimedia/archive/02677/PD70036571_ADHYR8_2677198b.jpg'
        },
        distance: 2.6
      },{
        name: 'Tower of London - London Eye',
        start: {
          name: 'Tower of London',
          lat: '51.50735350177636',
          lng: '-0.076121',
          img: 'https://media1.britannica.com/eb-media/45/18545-004-FFFBAE09.jpg'
        },
        finish: {
          name: 'London Eye',
          lat: '51.503226',
          lng: '-0.118532',
          img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/London-Eye-2009.JPG/1200px-London-Eye-2009.JPG'
        },
        distance: 2.6
      },{
        name: 'Albert Memorial - Regents Park',
        start: {
          name: 'Albert Memorial',
          lat: '51.50225139237363',
          lng: '-0.177712',
          img: 'https://wanderingfeast.files.wordpress.com/2013/08/image17.jpg'
        },
        finish: {
          name: 'Regents Park',
          lat: '51.513563',
          lng: '-0.0984799861907959',
          img: 'http://www.astoft2.co.uk/london/P1030970-transf-wandyellred-cln-u1-h540-u0.3t5-q60-selnonblue-varyr0div.jpg'
        },
        distance: 3.7
      },{
        name: 'Camden Town - Parliament Hill',
        start: {
          name: 'Cyberdog',
          lat: '51.542234',
          lng: '-0.147167',
          img: 'https://ablognso.files.wordpress.com/2012/05/cyberdog.jpg'
        },
        finish: {
          name: 'Parliament Hill',
          lat: '51.559683',
          lng: '-0.159645',
          img: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Flickr_-_Duncan~_-_London_from_Parliament_Hill.jpg'
        },
        distance: 2.1
      }])
      .then((tracks) => {
        console.log(`${tracks.length} tracks created`);
        return Sprint
          .create([{
            start: {
              time: new Date(2017,2,26,10,34,12),
              img: 'http://www.kobinazrul.towerhamlets.sch.uk/files/slideshows/728/5829d830b4528.jpg'
            },
            finish: {
              time: new Date(2017,2,26,12,15,12),
              img: 'http://i.dailymail.co.uk/i/pix/2014/04/06/article-2598044-1CE188AF00000578-133_634x386.jpg'
            },
            track: tracks[2],
            createdBy: users[2]
          }]);
      });
  })
  .then((sprint) => console.log(`${sprint.length} sprints created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
