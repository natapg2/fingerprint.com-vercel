import { jest } from '@jest/globals'

global.___loader = {
  enqueue: jest.fn(),
}
