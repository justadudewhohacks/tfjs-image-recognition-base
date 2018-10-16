import * as tf from '@tensorflow/tfjs-core';

import { NetInput } from './NetInput';

export type TMediaElement = HTMLImageElement | HTMLVideoElement | HTMLCanvasElement

export type TResolvedNetInput = TMediaElement | tf.Tensor3D | tf.Tensor4D

export type TNetInputArg = string | TResolvedNetInput

export type TNetInput = TNetInputArg | Array<TNetInputArg> | NetInput | tf.Tensor4D

export type DrawBoxOptions = {
  lineWidth?: number
  color?: string
}

export type DrawTextOptions = {
  lineWidth?: number
  fontSize?: number
  fontStyle?: string
  textColor?: string
}

export type DrawDetectionOptions = {
  lineWidth?: number
  fontSize?: number
  fontStyle?: string
  textColor?: string
  boxColor?: string,
  withScore?: boolean,
  withClassName?: boolean
}

export type DrawOptions = {
  lineWidth: number
  fontSize: number
  fontStyle: string
  textColor: string
  boxColor: string,
  withScore: boolean,
  withClassName: boolean
}