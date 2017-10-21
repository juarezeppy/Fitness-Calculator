// src/index.ts
import * as functions                       from 'firebase-functions'
import * as admin                           from 'firebase-admin'
import * as LiftSums                        from './LiftSums';
import * as LiftSumsUnverifiedBench         from './LiftSumsUnverified/bench';
import * as LiftSumsUnverifiedSquat         from './LiftSumsUnverified/squat';
import * as LiftSumsUnverifiedFrontSquat    from './LiftSumsUnverified/frontsquat';
import * as LiftSumsUnverifiedDeadlift      from './LiftSumsUnverified/deadlift';
import * as LiftSumsUnverifiedClean         from './LiftSumsUnverified/clean';
import * as LiftSumsUnverifiedPowerClean    from './LiftSumsUnverified/powerClean';
import * as HealthSumsUnverifiedBMI         from './healthSumsUnverified/bmi';
import * as HealthSumsUnverifiedBMR         from './healthSumsUnverified/bmr';
import * as HealthSumsUnverifiedTDEE        from './healthSumsUnverified/tdee';

admin.initializeApp(functions.config().firebase)

export const liftSums                       = LiftSums.listener;

// NOTE: These functions / listeners are time and are not to scale.
// I decided to leave it as is due to readability and from having over 2 dozen files, one for each function
// When the time comes I would break down the for loop to a more scalable solution as a create additional files

export const liftSumsUnverifiedBench        = LiftSumsUnverifiedBench.listener;
export const liftSumsUnverifiedSquat        = LiftSumsUnverifiedSquat.listener;
export const liftSumsUnverifiedFrontSquat   = LiftSumsUnverifiedFrontSquat.listener;
export const liftSumsUnverifiedDeadlift     = LiftSumsUnverifiedDeadlift.listener;
export const liftSumsUnverifiedClean        = LiftSumsUnverifiedClean.listener;
export const liftSumsUnverifiedPowerClean   = LiftSumsUnverifiedPowerClean.listener;

export const healthSumsUnverifiedBMI        = HealthSumsUnverifiedBMI.listener;
export const healthSumsUnverifiedBMR        = HealthSumsUnverifiedBMR.listener;
export const healthSumsUnverifiedTDEE       = HealthSumsUnverifiedTDEE.listener;
