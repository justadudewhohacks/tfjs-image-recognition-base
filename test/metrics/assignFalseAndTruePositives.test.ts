import { BoundingBox } from '../../src/classes/BoundingBox';
import { Rect } from '../../src/classes/Rect';
import { assignFalseAndTruePositives } from '../../src/metrics/assignFalseAndTruePositives';

describe('assignFalseAndTruePositives', () => {

  describe('single ground truth box', () => {

    it('true positive, exact overlap', () => {

      const gt = [
        new Rect(0, 0, 10, 10)
      ].map(rect => rect.toBoundingBox())
      const det = [
        new Rect(0, 0, 10, 10)
      ].map(rect => rect.toBoundingBox())

      const { truePositives, falsePositives } = assignFalseAndTruePositives(gt, det, 0.5)
      expect(truePositives.length).toEqual(1)
      expect(falsePositives.length).toEqual(0)

    })

    it('true positive, iou > iouThreshold', () => {

      const gt = [
        new Rect(0, 0, 10, 10)
      ].map(rect => rect.toBoundingBox())
      const det = [
        new Rect(1, 1, 10, 10)
      ].map(rect => rect.toBoundingBox())

      const { truePositives, falsePositives } = assignFalseAndTruePositives(gt, det, 0.5)
      expect(truePositives.length).toEqual(1)
      expect(falsePositives.length).toEqual(0)

    })

    it('false positive, no overlap', () => {

      const gt = [
        new Rect(0, 0, 10, 10)
      ].map(rect => rect.toBoundingBox())
      const det = [
        new Rect(10, 10, 10, 10)
      ].map(rect => rect.toBoundingBox())

      const { truePositives, falsePositives } = assignFalseAndTruePositives(gt, det, 0.5)
      expect(truePositives.length).toEqual(0)
      expect(falsePositives.length).toEqual(1)

    })

    it('false positive, iou < iouThreshold', () => {

      const gt = [
        new Rect(0, 0, 10, 10)
      ].map(rect => rect.toBoundingBox())
      const det = [
        new Rect(9, 9, 10, 10)
      ].map(rect => rect.toBoundingBox())

      const { truePositives, falsePositives } = assignFalseAndTruePositives(gt, det, 0.5)
      expect(truePositives.length).toEqual(0)
      expect(falsePositives.length).toEqual(1)

    })

    it('false positive, no ground truth', () => {

      const gt: BoundingBox[] = []
      const det = [
        new Rect(0, 0, 10, 10)
      ].map(rect => rect.toBoundingBox())

      const { truePositives, falsePositives } = assignFalseAndTruePositives(gt, det, 0.5)
      expect(truePositives.length).toEqual(0)
      expect(falsePositives.length).toEqual(1)

    })

    it('none, no predicted box', () => {

      const gt = [
        new Rect(0, 0, 10, 10)
      ].map(rect => rect.toBoundingBox())
      const det: BoundingBox[] = []

      const { truePositives, falsePositives } = assignFalseAndTruePositives(gt, det, 0.5)
      expect(truePositives.length).toEqual(0)
      expect(falsePositives.length).toEqual(0)

    })

    it('none, no ground truth and no predicted box', () => {

      const gt: BoundingBox[] = []
      const det: BoundingBox[] = []

      const { truePositives, falsePositives } = assignFalseAndTruePositives(gt, det, 0.5)
      expect(truePositives.length).toEqual(0)
      expect(falsePositives.length).toEqual(0)

    })

    it('true positive with highest iou', () => {

      const gt = [
        new Rect(0, 0, 10, 10)
      ].map(rect => rect.toBoundingBox())
      const det = [
        new Rect(2, 2, 10, 10),
        new Rect(4, 4, 10, 10),
        new Rect(1, 1, 10, 10),
        new Rect(3, 3, 10, 10)
      ].map(rect => rect.toBoundingBox())

      const { truePositives, falsePositives } = assignFalseAndTruePositives(gt, det, 0.5)
      expect(truePositives.length).toEqual(1)
      expect(truePositives).toEqual([det[2]])
      expect(falsePositives.length).toEqual(3)

    })

  })

  describe('multiple ground truth box', () => {

    it('true positives', () => {

      const gt = [
        new Rect(0, 0, 10, 10),
        new Rect(10, 10, 10, 10)
      ].map(rect => rect.toBoundingBox())
      const det = [
        new Rect(0, 0, 10, 10),
        new Rect(10, 10, 10, 10)
      ].map(rect => rect.toBoundingBox())

      const { truePositives, falsePositives } = assignFalseAndTruePositives(gt, det, 0.5)
      expect(truePositives.length).toEqual(2)
      expect(falsePositives.length).toEqual(0)

    })

    it('true positives, iou >= iouThreshold', () => {

      const gt = [
        new Rect(0, 0, 10, 10),
        new Rect(10, 10, 10, 10)
      ].map(rect => rect.toBoundingBox())
      const det = [
        new Rect(1, 1, 10, 10),
        new Rect(11, 11, 10, 10)
      ].map(rect => rect.toBoundingBox())

      const { truePositives, falsePositives } = assignFalseAndTruePositives(gt, det, 0.5)
      expect(truePositives.length).toEqual(2)
      expect(falsePositives.length).toEqual(0)

    })

    it('false positives', () => {

      const gt = [
        new Rect(0, 0, 10, 10),
        new Rect(10, 10, 10, 10)
      ].map(rect => rect.toBoundingBox())
      const det = [
        new Rect(20, 20, 10, 10),
        new Rect(30, 30, 10, 10)
      ].map(rect => rect.toBoundingBox())

      const { truePositives, falsePositives } = assignFalseAndTruePositives(gt, det, 0.5)
      expect(truePositives.length).toEqual(0)
      expect(falsePositives.length).toEqual(2)

    })

    it('true positives and false negatives', () => {

      const gt = [
        new Rect(0, 0, 10, 10),
        new Rect(10, 10, 10, 10)
      ].map(rect => rect.toBoundingBox())
      const det = [
        new Rect(0, 0, 10, 10),
        new Rect(10, 10, 10, 10),
        new Rect(20, 20, 10, 10),
        new Rect(30, 30, 10, 10)
      ].map(rect => rect.toBoundingBox())

      const { truePositives, falsePositives } = assignFalseAndTruePositives(gt, det, 0.5)
      expect(truePositives.length).toEqual(2)
      expect(falsePositives.length).toEqual(2)

    })

    it('predicted box assigned to ground truth with second highest iou if ground truth with highest iou already assigned', () => {

      const gt = [
        new Rect(0, 0, 10, 10),
        new Rect(2, 2, 10, 10)
      ].map(rect => rect.toBoundingBox())
      const det = [
        new Rect(0, 0, 10, 10),
        new Rect(1, 1, 10, 10)
      ].map(rect => rect.toBoundingBox())

      const { truePositives, falsePositives } = assignFalseAndTruePositives(gt, det, 0.5)
      expect(truePositives.length).toEqual(2)
      expect(falsePositives.length).toEqual(0)

    })

  })

})