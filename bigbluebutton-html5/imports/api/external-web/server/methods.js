import { Meteor } from 'meteor/meteor';
import startWatchingExternalWeb from './methods/startWatchingExternalWeb';
import stopWatchingExternalWeb from './methods/stopWatchingExternalWeb';
import emitExternalWebEvent from './methods/emitExternalWebEvent';
import initializeExternalWeb from './methods/initializeExternalWeb';

Meteor.methods({
  startWatchingExternalWeb,
  stopWatchingExternalWeb,
  emitExternalWebEvent,
  initializeExternalWeb
});
