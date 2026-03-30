import { describe, it, expect } from "vitest"
import { calculate } from '../src/routes/grade-calculator/grade-calculator.js'

describe('grade-calculator.calculate', () => {

  it('ensures all boxes are filled', () => {

    let data = [
      { assignmentName: 'Homework', score: '100', weight: '20' },
      { assignmentName: 'Midterm', score: '85', weight: '40' },
      { assignmentName: 'Lab', score: '93', weight: '15' }
    ];

    expect(calculate(data, "90")).toBe("You need a grade of 88.2 on the remaining 25% of tasks to ensure a final grade of 90%");

    data = [
      { assignmentName: '', score: '', weight: '' },
      { assignmentName: '', score: '', weight: '' },
      { assignmentName: '', score: '', weight: '' }
    ];

    expect(calculate(data, "90")).toBe("Error: please make sure all boxes are filled.");

    data = [
      { assignmentName: '', score: '100', weight: '' },
      { assignmentName: 'Exam', score: '', weight: '40' },
      { assignmentName: 'Lab', score: '', weight: '' }
    ]

    expect(calculate(data, "90")).toBe("Error: please make sure all boxes are filled.");

  })

  it ('ensures all boxes are the correct data type', () => {
    let data = [
      { assignmentName: 'Homework', score: '100', weight: '20' },
      { assignmentName: 'Midterm', score: '85', weight: '40' },
      { assignmentName: 'Lab', score: '93', weight: '15' }
    ];

    expect(calculate(data, "90")).toBe("You need a grade of 88.2 on the remaining 25% of tasks to ensure a final grade of 90%");

    data = [
    { assignmentName: 'Homework', score: 'hello', weight: '20' },
      { assignmentName: 'Midterm', score: 'string', weight: '40' },
      { assignmentName: 'Lab', score: '93', weight: 'hello' }
    ]

    expect(calculate(data, "90")).toBe("Error: ensure grade or weight boxes are numbers.");
  })

  it('calculates final grade properly', () => {
    const data = [
      { assignmentName: 'Homework', score: '100', weight: '20' },
      { assignmentName: 'Midterm', score: '85', weight: '40' },
      { assignmentName: 'Lab', score: '93', weight: '15' }
    ];

    expect(calculate(data, "90")).toBe("You need a grade of 88.2 on the remaining 25% of tasks to ensure a final grade of 90%");
    expect(calculate(data, "80")).toBe("You need a grade of 48.2 on the remaining 25% of tasks to ensure a final grade of 80%");
    expect(calculate(data, "60")).toBe("A final grade of 60 is attainable regardless of how you score on the remaining 25% of tasks.");
  })

  it('ensures final weight is a number', () => {
    const data = [
      { assignmentName: 'Homework', score: '100', weight: '20' },
      { assignmentName: 'Midterm', score: '85', weight: '40' },
      { assignmentName: 'Lab', score: '93', weight: '15' }
    ];

    expect(calculate(data, "90")).toBe("You need a grade of 88.2 on the remaining 25% of tasks to ensure a final grade of 90%");
    expect(calculate(data, "76.5")).toBe("You need a grade of 34.2 on the remaining 25% of tasks to ensure a final grade of 76.5%");
    expect(calculate(data, "hello")).toBe("Error: ensure target grade is a number.");
  })

  it('ensures final weight is calculated correctly', () => {
    let data = [
      { assignmentName: 'Homework', score: '100', weight: '20' },
      { assignmentName: 'Midterm', score: '85', weight: '40' },
      { assignmentName: 'Lab', score: '93', weight: '15' },
      { assignmentName: 'Final', score: '80', weight: '25' }
    ];

    expect(calculate(data, "90")).toBe("Final Grade: 87.95");

    data = [{ assignmentName: 'Homework', score: '100', weight: '100' }];

    expect(calculate(data, "90")).toBe("Final Grade: 100");
  })

})