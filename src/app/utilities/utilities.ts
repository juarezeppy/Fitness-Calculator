/* *
* This file contains utility functions used throughout components
* */

export function getAgeGroup(age): string {
    if (age < 18) {
        console.log('ageGroup1');
        return 'ageGroup1';
    } else if (age < 24) {
        console.log('ageGroup2');
        return 'ageGroup2'
    } else if (age < 40) {
        console.log('ageGroup3');
        return 'ageGroup3'
    } else if (age < 50) {
        console.log('ageGroup4');
        return 'ageGroup4'
    } else if (age < 60) {
        console.log('ageGroup5');
        return 'ageGroup5'
    } else if (age < 66) {
        console.log('ageGroup6');
        return 'ageGroup6'
    } else if (age < 71) {
        console.log('ageGroup7');
        return 'ageGroup7'
    }

    console.log('ageGroup8')
    return 'ageGroup8';
}

export function getWeightGroupMen(weight): string {
    if (weight < 56.001) {
        console.log('weightGroup1');
        return 'weightGroup1';
    } else if (weight < 62.001) {
        console.log('weightGroup2');
        return 'weightGroup2'
    } else if (weight < 69.001) {
        console.log('weightGroup3');
        return 'weightGroup3'
    } else if (weight < 77.001) {
        console.log('weightGroup4');
        return 'weightGroup4'
    } else if (weight < 85.001) {
        console.log('weightGroup5');
        return 'weightGroup5'
    } else if (weight < 94.001) {
        console.log('weightGroup6');
        return 'weightGroup6'
    } else if (weight < 105.001) {
        console.log('weightGroup7');
        return 'weightGroup7'
    }

    console.log('weightGroup8')
    return 'weightGroup8';
}

export function getWeightGroupWomen(weight): string {
    if (weight < 48.001) {
        console.log('weightGroup1');
        return 'weightGroup1';
    } else if (weight < 53.001) {
        console.log('weightGroup2');
        return 'weightGroup2'
    } else if (weight < 58.001) {
        console.log('weightGroup3');
        return 'weightGroup3'
    } else if (weight < 63.001) {
        console.log('weightGroup4');
        return 'weightGroup4'
    } else if (weight < 69.001) {
        console.log('weightGroup5');
        return 'weightGroup5'
    } else if (weight < 75.001) {
        console.log('weightGroup6');
        return 'weightGroup6'
    } else if (weight < 90.001) {
        console.log('weightGroup7');
        return 'weightGroup7'
    }

    console.log('weightGroup8')
    return 'weightGroup8';
}

export function getHeightGroup(height): string {
    if (height < 57) {
        console.log('heightGroup1');
        return 'heightGroup1';
    } else if (height <= 60) {
        console.log('heightGroup2');
        return 'heightGroup2'
    } else if (height <= 63) {
        console.log('heightGroup3');
        return 'heightGroup3'
    } else if (height <= 66) {
        console.log('heightGroup4');
        return 'heightGroup4'
    } else if (height <= 69) {
        console.log('heightGroup5');
        return 'heightGroup5'
    } else if (height <= 72) {
        console.log('heightGroup6');
        return 'heightGroup6'
    } else if (height <= 75) {
        console.log('heightGroup7');
        return 'heightGroup7'
    } else if (height <= 78) {
        console.log('heightGroup8');
        return 'heightGroup8'
    } else if (height <= 81) {
        console.log('heightGroup9');
        return 'heightGroup9'
    }

    console.log('heightGroup10')
    return 'heightGroup10';
}

export function brzyckiOneRM(weight, reps): number {
    return weight / (1.0278 - (0.0278 * reps));
}

export  function getEndValue(gender, liftType): number {

    if (gender === 'female') {
        switch (liftType) {
            case 'bench': {
                return 10;
            }
            case 'squat': {
                return 10;
            }
            case 'frontSquat': {
                return 10;
            }
            case 'deadlift': {
                return 10;
            }
            case 'powerClean': {
                return 10;
            }
            case 'clean': {
                return 10;
            }
            case 'bmi': {
                return 2;
            }
            case 'bmr': {
                return 100;
            }
            case 'tdee': {
                return 100;
            }
        }
    } else {
        switch (liftType) {
            case 'bench': {
                return 10;
            }
            case 'squat': {
                return 10;
            }
            case 'frontSquat': {
                return 10;
            }
            case 'deadlift': {
                return 10;
            }
            case 'powerClean': {
                return 10;
            }
            case 'clean': {
                return 10;
            }
            case 'bmi': {
                return 2;
            }
            case 'bmr': {
                return 100;
            }
            case 'tdee': {
                return 100;
            }
        }
    }
}

export function setChartHealthPath(type, age, height, heightType, gender): string {
    console.log(age, height, heightType, gender);
    const in2cmConv = 2.54;
    const ageGroup: string = getAgeGroup(age);
    let formHeight = height;
    let heightGroup:   string;       // !!!! REMOVE WEIGHT CATEGORIES BECAUSE IT MAKES NO SENSE FOR BMI!

    if (heightType === 'cm') {      // <!-- convert to inches
        formHeight = height / in2cmConv;
    }

    heightGroup = getHeightGroup(formHeight);

    const path: string = type + '/'
        + gender + '/'
        + ageGroup + '/'
        + heightGroup;
    console.log(path);

    return path;
}

