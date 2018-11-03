import { meanAveragePrecision } from '../../src/metrics/meanAveragePrecision';
import { createLabeledBox, createPredictedBox } from '../utils';
import { loadJson } from '../env';

describe('meanAveragePrecision', () => {

  describe('single input', () => {

    it('mAP === 1.0, single class', () => {

      const classLabel = 0

      const gt = [
        createLabeledBox(0, 0, 10, 10, classLabel),
        createLabeledBox(10, 10, 10, 10, classLabel)
      ]
      const det = [
        createPredictedBox(0, 0, 10, 10, classLabel),
        createPredictedBox(10, 10, 10, 10, classLabel)
      ]

      const inputs = [
        { groundTruth: gt, predictions: det }
      ]

      const { meanAveragePrec, averagePrecisionsByClass } = meanAveragePrecision(inputs, 0.5)

      expect(meanAveragePrec).toEqual(1)
      expect(averagePrecisionsByClass.length).toEqual(1)
      expect(averagePrecisionsByClass[0].classLabel).toEqual(classLabel)
      expect(averagePrecisionsByClass[0].averagePrec).toEqual(1)
    })

    it('mAP === 1.0, two classes', () => {

      const classLabel1 = 0
      const classLabel2 = 1

      const gt = [
        createLabeledBox(0, 0, 10, 10, classLabel1),
        createLabeledBox(10, 10, 10, 10, classLabel2)
      ]
      const det = [
        createPredictedBox(0, 0, 10, 10, classLabel1),
        createPredictedBox(10, 10, 10, 10, classLabel2)
      ]

      const inputs = [
        { groundTruth: gt, predictions: det }
      ]

      const { meanAveragePrec, averagePrecisionsByClass } = meanAveragePrecision(inputs, 0.5)

      expect(meanAveragePrec).toEqual(1)
      expect(averagePrecisionsByClass.length).toEqual(2)
      expect(averagePrecisionsByClass[0].classLabel).toEqual(classLabel1)
      expect(averagePrecisionsByClass[0].averagePrec).toEqual(1)
      expect(averagePrecisionsByClass[1].classLabel).toEqual(classLabel2)
      expect(averagePrecisionsByClass[1].averagePrec).toEqual(1)
    })

    it('mAP !== 1.0, single class', () => {

      const classLabel = 0

      const gt = [
        createLabeledBox(0, 0, 10, 10, classLabel),
        createLabeledBox(10, 10, 10, 10, classLabel)
      ]
      const det = [
        createPredictedBox(0, 0, 10, 10, classLabel),
        createPredictedBox(20, 20, 10, 10, classLabel)
      ]

      const inputs = [
        { groundTruth: gt, predictions: det }
      ]

      const { meanAveragePrec, averagePrecisionsByClass } = meanAveragePrecision(inputs, 0.5)

      expect(meanAveragePrec).toBeLessThan(1)
      expect(averagePrecisionsByClass.length).toEqual(1)
      expect(averagePrecisionsByClass[0].classLabel).toEqual(classLabel)
      expect(averagePrecisionsByClass[0].averagePrec).toEqual(meanAveragePrec)
    })

    it('mAP !== 1.0, two classes', () => {

      const classLabel1 = 0
      const classLabel2 = 1

      const gt = [
        createLabeledBox(0, 0, 10, 10, classLabel1),
        createLabeledBox(10, 10, 10, 10, classLabel2)
      ]
      const det = [
        createPredictedBox(0, 0, 10, 10, classLabel1),
        createPredictedBox(20, 20, 10, 10, classLabel2)
      ]

      const inputs = [
        { groundTruth: gt, predictions: det }
      ]

      const { meanAveragePrec, averagePrecisionsByClass } = meanAveragePrecision(inputs, 0.5)

      expect(meanAveragePrec).toBeLessThan(1)
      expect(averagePrecisionsByClass.length).toEqual(2)
      expect(averagePrecisionsByClass[0].classLabel).toEqual(classLabel1)
      expect(averagePrecisionsByClass[0].averagePrec).toEqual(1)
      expect(averagePrecisionsByClass[1].classLabel).toEqual(classLabel2)
      expect(averagePrecisionsByClass[1].averagePrec).toEqual(0)
    })

  })

  describe('multiple boxes', () => {

    let boxesJson: any[]

    beforeAll(async () => {
      boxesJson = (await loadJson<any>('test/boxes.json')).map(
        ({ groundTruth, predictions }: any) => ({
          groundTruth: groundTruth.map(({ x, y, width, height, label }: any) => createLabeledBox(x, y, width, height, label)),
          predictions: predictions.map(({ x, y, width, height, label, score, classScore }: any) => createPredictedBox(x, y, width, height, label, score, classScore))
        })
      )
    })

    it('computes correct mAP and class APs', () => {

      const { meanAveragePrec, averagePrecisionsByClass } = meanAveragePrecision(boxesJson, 0.5, 0.5)

      expect(averagePrecisionsByClass.length).toEqual(20)
      const sorted = averagePrecisionsByClass.sort((p1, p2) => p1.classLabel - p2.classLabel)

      const expectedAps = [
        0.45, 0, 0.82, 0.27, 0, 0.42, 0, 0.55, 0, 0.27,
        1, 1, 0, 1, 0.27, 1, 0.27, 0.64, 0.36, 1
      ]

      expectedAps.forEach((ap, i) => {
        expect(sorted[i].averagePrec).toBeCloseTo(ap, 2)
      })

      expect(meanAveragePrec).toBeCloseTo(0.47, 2)
    })

  })

})