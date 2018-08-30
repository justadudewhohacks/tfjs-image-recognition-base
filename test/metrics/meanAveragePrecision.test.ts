import { meanAveragePrecision } from '../../src/metrics/meanAveragePrecision';
import { createLabeledBox } from '../utils';

describe('meanAveragePrecision', () => {

  describe('single input', () => {

    it('mAP === 1.0, single class', () => {

      const classLabel = 0

      const gt = [
        createLabeledBox(0, 0, 10, 10, classLabel),
        createLabeledBox(10, 10, 10, 10, classLabel)
      ]
      const det = [
        createLabeledBox(0, 0, 10, 10, classLabel),
        createLabeledBox(10, 10, 10, 10, classLabel)
      ]

      const inputs = [
        { groundTruth: gt, predictions: det }
      ]

      const { meanAveragePrec, averagePrecisionsByClass } = meanAveragePrecision(inputs, 0.5)

      expect(meanAveragePrec).toEqual(1)
      expect(averagePrecisionsByClass.length).toEqual(1)
      expect(averagePrecisionsByClass[0].classLabel).toEqual(classLabel)
      expect(averagePrecisionsByClass[0].averagePrecision).toEqual(1)
    })

    it('mAP === 1.0, two classes', () => {

      const classLabel1 = 0
      const classLabel2 = 1

      const gt = [
        createLabeledBox(0, 0, 10, 10, classLabel1),
        createLabeledBox(10, 10, 10, 10, classLabel2)
      ]
      const det = [
        createLabeledBox(0, 0, 10, 10, classLabel1),
        createLabeledBox(10, 10, 10, 10, classLabel2)
      ]

      const inputs = [
        { groundTruth: gt, predictions: det }
      ]

      const { meanAveragePrec, averagePrecisionsByClass } = meanAveragePrecision(inputs, 0.5)

      expect(meanAveragePrec).toEqual(1)
      expect(averagePrecisionsByClass.length).toEqual(2)
      expect(averagePrecisionsByClass[0].classLabel).toEqual(classLabel1)
      expect(averagePrecisionsByClass[0].averagePrecision).toEqual(1)
      expect(averagePrecisionsByClass[1].classLabel).toEqual(classLabel2)
      expect(averagePrecisionsByClass[1].averagePrecision).toEqual(1)
    })

    it('mAP !== 1.0, single class', () => {

      const classLabel = 0

      const gt = [
        createLabeledBox(0, 0, 10, 10, classLabel),
        createLabeledBox(10, 10, 10, 10, classLabel)
      ]
      const det = [
        createLabeledBox(0, 0, 10, 10, classLabel),
        createLabeledBox(20, 20, 10, 10, classLabel)
      ]

      const inputs = [
        { groundTruth: gt, predictions: det }
      ]

      const { meanAveragePrec, averagePrecisionsByClass } = meanAveragePrecision(inputs, 0.5)

      expect(meanAveragePrec).toBeLessThan(1)
      expect(averagePrecisionsByClass.length).toEqual(1)
      expect(averagePrecisionsByClass[0].classLabel).toEqual(classLabel)
      expect(averagePrecisionsByClass[0].averagePrecision).toEqual(meanAveragePrec)
    })

    it('mAP !== 1.0, two classes', () => {

      const classLabel1 = 0
      const classLabel2 = 1

      const gt = [
        createLabeledBox(0, 0, 10, 10, classLabel1),
        createLabeledBox(10, 10, 10, 10, classLabel2)
      ]
      const det = [
        createLabeledBox(0, 0, 10, 10, classLabel1),
        createLabeledBox(20, 20, 10, 10, classLabel2)
      ]

      const inputs = [
        { groundTruth: gt, predictions: det }
      ]

      const { meanAveragePrec, averagePrecisionsByClass } = meanAveragePrecision(inputs, 0.5)

      expect(meanAveragePrec).toBeLessThan(1)
      expect(averagePrecisionsByClass.length).toEqual(2)
      expect(averagePrecisionsByClass[0].classLabel).toEqual(classLabel1)
      expect(averagePrecisionsByClass[0].averagePrecision).toEqual(1)
      expect(averagePrecisionsByClass[1].classLabel).toEqual(classLabel2)
      expect(averagePrecisionsByClass[1].averagePrecision).toEqual(0)
    })

  })

})