import { Rect } from '../../src/classes/Rect';
import { averagePrecision } from '../../src/metrics/averagePrecision';

describe('averagePrecision', () => {

  it('ap === 1.0, single input', () => {

    const gt = [
      new Rect(0, 0, 10, 10),
      new Rect(10, 10, 10, 10)
    ]
    const det = [
      new Rect(0, 0, 10, 10),
      new Rect(10, 10, 10, 10)
    ]

    const inputs = [
      { groundTruth: gt, predictions: det }
    ]

    const ap = averagePrecision(inputs, 0.5)
    expect(ap).toEqual(1)

  })

  it('ap === 1.0, multiple inputs', () => {

    const gt = [
      new Rect(0, 0, 10, 10),
      new Rect(10, 10, 10, 10)
    ]
    const det = [
      new Rect(0, 0, 10, 10),
      new Rect(10, 10, 10, 10)
    ]

    const inputs = [
      { groundTruth: gt, predictions: det },
      { groundTruth: gt, predictions: det }
    ]

    const ap = averagePrecision(inputs, 0.5)
    expect(ap).toEqual(1)

  })

  it('ap !== 1.0, single input', () => {

    const gt = [
      new Rect(0, 0, 10, 10),
      new Rect(10, 10, 10, 10)
    ]
    const det = [
      new Rect(0, 0, 10, 10),
      new Rect(20, 20, 10, 10)
    ]

    const inputs = [
      { groundTruth: gt, predictions: det }
    ]

    const ap = averagePrecision(inputs, 0.5)
    expect(ap).toBeLessThan(1)

  })

  it('ap !== 1.0, multiple inputs', () => {

    const gt = [
      new Rect(0, 0, 10, 10),
      new Rect(10, 10, 10, 10)
    ]
    const det = [
      new Rect(0, 0, 10, 10),
      new Rect(20, 20, 10, 10)
    ]

    const inputs = [
      { groundTruth: gt, predictions: det },
      { groundTruth: gt, predictions: det }
    ]

    const ap = averagePrecision(inputs, 0.5)
    expect(ap).toBeLessThan(1)

  })

  it('ap === 0, single input', () => {

    const gt = [
      new Rect(0, 0, 10, 10),
      new Rect(10, 10, 10, 10)
    ]
    const det = [
      new Rect(20, 20, 10, 10),
      new Rect(30, 30, 10, 10)
    ]

    const inputs = [
      { groundTruth: gt, predictions: det }
    ]

    const ap = averagePrecision(inputs, 0.5)
    expect(ap).toEqual(0)

  })

  it('ap === 0, multiple inputs', () => {

    const gt = [
      new Rect(0, 0, 10, 10),
      new Rect(10, 10, 10, 10)
    ]
    const det = [
      new Rect(20, 20, 10, 10),
      new Rect(30, 30, 10, 10)
    ]

    const inputs = [
      { groundTruth: gt, predictions: det },
      { groundTruth: gt, predictions: det }
    ]

    const ap = averagePrecision(inputs, 0.5)
    expect(ap).toEqual(0)

  })

})