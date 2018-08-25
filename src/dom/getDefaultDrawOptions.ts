import { DrawOptions } from './types';

export function getDefaultDrawOptions(options: any = {}): DrawOptions {
  return Object.assign(
    {},
    {
      boxColor: 'blue',
      textColor: 'red',
      lineWidth: 2,
      fontSize: 20,
      fontStyle: 'Georgia',
      withScore: true,
      withClassName: true
    },
    options
  )
}