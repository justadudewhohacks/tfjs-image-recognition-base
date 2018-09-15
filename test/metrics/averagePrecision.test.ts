import { averagePrecision } from '../../src/metrics/averagePrecision';
import { createLabeledBox, createPredictedBox } from '../utils';

describe('averagePrecision', () => {

  it('ap === 1.0, single input', () => {

    const gt = [
      createLabeledBox(0, 0, 10, 10),
      createLabeledBox(10, 10, 10, 10)
    ]
    const det = [
      createPredictedBox(0, 0, 10, 10),
      createPredictedBox(10, 10, 10, 10)
    ]

    const inputs = [
      { groundTruth: gt, predictions: det }
    ]

    const { averagePrec } = averagePrecision(inputs, 0.5)
    expect(averagePrec).toEqual(1)

  })

  it('ap === 1.0, multiple inputs', () => {

    const gt = [
      createLabeledBox(0, 0, 10, 10),
      createLabeledBox(10, 10, 10, 10)
    ]
    const det = [
      createPredictedBox(0, 0, 10, 10),
      createPredictedBox(10, 10, 10, 10)
    ]

    const inputs = [
      { groundTruth: gt, predictions: det },
      { groundTruth: gt, predictions: det }
    ]

    const { averagePrec } = averagePrecision(inputs, 0.5)
    expect(averagePrec).toEqual(1)

  })

  it('ap !== 1.0, single input', () => {

    const gt = [
      createLabeledBox(0, 0, 10, 10),
      createLabeledBox(10, 10, 10, 10)
    ]
    const det = [
      createPredictedBox(0, 0, 10, 10),
      createPredictedBox(20, 20, 10, 10)
    ]

    const inputs = [
      { groundTruth: gt, predictions: det }
    ]

    const { averagePrec } = averagePrecision(inputs, 0.5)
    expect(averagePrec).toBeLessThan(1)

  })

  it('ap !== 1.0, multiple inputs', () => {

    const gt = [
      createLabeledBox(0, 0, 10, 10),
      createLabeledBox(10, 10, 10, 10)
    ]
    const det = [
      createPredictedBox(0, 0, 10, 10),
      createPredictedBox(20, 20, 10, 10)
    ]

    const inputs = [
      { groundTruth: gt, predictions: det },
      { groundTruth: gt, predictions: det }
    ]

    const { averagePrec } = averagePrecision(inputs, 0.5)
    expect(averagePrec).toBeLessThan(1)

  })

  it('ap === 0, single input', () => {

    const gt = [
      createLabeledBox(0, 0, 10, 10),
      createLabeledBox(10, 10, 10, 10)
    ]
    const det = [
      createPredictedBox(20, 20, 10, 10),
      createPredictedBox(30, 30, 10, 10)
    ]

    const inputs = [
      { groundTruth: gt, predictions: det }
    ]

    const { averagePrec } = averagePrecision(inputs, 0.5)
    expect(averagePrec).toEqual(0)

  })

  it('ap === 0, multiple inputs', () => {

    const gt = [
      createLabeledBox(0, 0, 10, 10),
      createLabeledBox(10, 10, 10, 10)
    ]
    const det = [
      createPredictedBox(20, 20, 10, 10),
      createPredictedBox(30, 30, 10, 10)
    ]

    const inputs = [
      { groundTruth: gt, predictions: det },
      { groundTruth: gt, predictions: det }
    ]

    const { averagePrec } = averagePrecision(inputs, 0.5)
    expect(averagePrec).toEqual(0)

  })

})