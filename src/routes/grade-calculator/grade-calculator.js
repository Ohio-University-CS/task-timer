// This is just a file to hold functions for unit testing

const STARTING_ROWS = 3;
let gradeData =  Array.from({ length: STARTING_ROWS }, () => ({
        assignmentName: '',
        score: '',
        weight: ''
    })
);

let targetGrade = '';
let showCalculation = '';
let showError = false;
let calculationResult = '';


export function calculate(gradeData, targetGrade)
{
    showCalculation = false;
    showError = true;

    if (!targetGrade)
    {
        calculationResult = "Error: please make sure all boxes are filled.";
        return calculationResult;
    }

    if (isNaN(targetGrade))
    {
        calculationResult = "Error: ensure target grade is a number.";
        return calculationResult;
    }

    let summation = 0;
    let remainingWeight = 100;

    for (let i = 0; i < gradeData.length; i++)
    {

        if (!gradeData[i].assignmentName || !gradeData[i].score || !gradeData[i].weight)
        {
            calculationResult = "Error: please make sure all boxes are filled.";
            return calculationResult;
        }

        if (isNaN(gradeData[i].score) || isNaN(gradeData[i].weight))
        {
            calculationResult = "Error: ensure grade or weight boxes are numbers.";
            return calculationResult;
        }

        summation += (Number(gradeData[i].score) * Number(gradeData[i].weight) / 100);
        remainingWeight -= Number(gradeData[i].weight);
    }

    showCalculation = true;
    showError = false;

    if (remainingWeight <= 0)
    {
        calculationResult = "Final Grade: " + summation;
        return calculationResult;
    }

    let needed = (targetGrade - summation) / remainingWeight * 100;
    needed = needed.toFixed(1);

    if (needed <= 0)
    {
        calculationResult = "A final grade of " + targetGrade + " is attainable regardless of how you score on the remaining " + remainingWeight + "% of tasks."
        return calculationResult;
    }

    calculationResult = "You need a grade of " + needed + " on the remaining " + remainingWeight + "% of tasks to ensure a final grade of " + targetGrade + "%";
    return calculationResult;

}