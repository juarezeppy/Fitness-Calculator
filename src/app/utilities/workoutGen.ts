/*
* Workout Generate Must Do The Following
* 1. Target All Muscle Groups.      Example: Leg workouts should target the calves, glutes, and quads. Don't skip any muscles
* 2. Meet a difficulty constraint.  Example: Barbell squats are "difficult" and take a lot of energy to complete
* 3. Meet a time constraint.        Example: Calve 3x10 calf raises can be completed in 5 minutes or less
* 4. Enter Cardio at the beginning or at the end, but never in the middle of the workout
* */


import { Workout }                       from './workout';


export class WorkOutGen {
    // Question choices
    private bodyShape:                  string[];
    private goals:                      string[];
    private bodyType:                   string[];
    private physicalDisabilities:       string[];
    private numDays:                    number;

    // Array of possible leg workouts
    private listOfLegExercisesHard:     string[];
    private listOfLegExercisesMedium:   string[];
    private listOfLegExercisesEasy:     string[];

    // Array of possible cardio workouts (i.e. treadmill)
    private listOfCardioExercises:      string[];

    private workout: Workout


    constructor() {
        this.workout = new Workout;

        this.listOfLegExercisesHard = [];
        this.listOfLegExercisesHard.push('Barbell Back Squats');
        this.listOfLegExercisesHard.push('Barbell Front Squats');

        this.listOfLegExercisesMedium = [];
        this.listOfLegExercisesMedium.push('Leg Curl (Machine)');
        this.listOfLegExercisesMedium.push('Dumbell Lunges');


        this.listOfLegExercisesEasy = [];
        this.listOfLegExercisesEasy.push('Calf Raises');
        this.listOfLegExercisesEasy.push('Leg Extension');

        this.listOfCardioExercises = [];
        this.listOfCardioExercises.push('10 Minute Teadmill Run');
        this.listOfCardioExercises.push('12 Minute Cycle Machine');
    }

    generateWorkout() {
        let index = Math.floor( Math.random() * this.listOfLegExercisesHard.length);
        console.log(index);
        this.workout.hard = this.listOfLegExercisesHard[index];

        index = Math.floor( Math.random() * this.listOfLegExercisesMedium.length);
        console.log(index);
        this.workout.medium = this.listOfLegExercisesMedium[index];

        index = Math.floor( Math.random() * this.listOfLegExercisesEasy.length);
        console.log(index);
        this.workout.easy = this.listOfLegExercisesEasy[index];

        index = Math.floor( Math.random() * this.listOfCardioExercises.length);
        console.log(index);
        this.workout.cardio = this.listOfCardioExercises[index];

        console.log(this.workout);
    }

}
