import 'reflect-metadata';
import {createConnection} from 'typeorm';
import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import {Routes} from './routes';
import {User} from './entity/User';
import {Game} from './entity/Game';
import {Location} from './entity/Location';
import {Role} from './entity/Role';

createConnection()
  .then(async connection => {
    const gameRespository = connection.getRepository(Game);
    const locationRepository = connection.getRepository(Location);
    const roleRepository = connection.getRepository(Role);
    // create express app
    const app = express();

    // call middleware
    app.use(cors());
    app.use(bodyParser.json());

    app.get('/hello', (_req, res) => {
      res.json('Hello, world!');
    });

    app.post('/locations', async (req, res, next) => {
      try {
        const {name} = req.body;

        if (!name) {
          return next({code: 404, message: 'name is required'});
        }

        const location = locationRepository.create({name});
        await locationRepository.save(location);
        res.json(location);
      } catch (err) {
        next(err);
      }
    });

    app.get('/locations', async (_req, res, next) => {
      try {
        const locations = await locationRepository.find({relations: ['roles']});
        res.json(locations);
      } catch (err) {
        next(err);
      }
    });

    app.get('/location/:id/roles', async (req, resp, next) => {
      try {
        const locationId = parseInt(req.params.id, 10);
        const roles = await roleRepository.find({
          location: {id: locationId},
        });

        resp.json(roles);
      } catch (err) {
        next(err);
      }
    });

    app.post('/location/:id/roles', async (req, resp, next) => {
      try {
        const location = await locationRepository.findOne(req.params.id);
        if (!location) {
          return next({code: 404, message: 'location does not exist'});
        }

        const {name} = req.body;
        if (!name) {
          return next({code: 400, message: 'name is required'});
        }
        const role = roleRepository.create({location, name});
        await roleRepository.save(role);
        resp.json(role);
      } catch (err) {
        next(err);
      }
    });

    app.get('/games', async (_req, res) => {
      const games = await gameRespository.find();
      res.json(games);
    });

    app.post('/games', async (_req, res, next) => {
      try {
        const location = await locationRepository
          .createQueryBuilder('location')
          .orderBy('RANDOM()')
          .getOne();

        if (!location) {
          next({code: 400, message: 'no locations found'});
        }
        const game = gameRespository.create({location});
        await gameRespository.save(game);
        res.json(game);
      } catch (err) {
        next(err);
      }
    });

    app.use((err, _req, res, next) => {
      if (!err) {
        next();
      } else {
        res.status(404).json({error: err.message}); // TODO - handle codes properly
      }
    });

    // start express server
    app.listen(3000, () => {
      console.log('Server started on port 3000!');
    });
  })
  .catch(error => console.log(error));
