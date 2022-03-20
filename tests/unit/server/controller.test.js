import {
   jest,
   expect,
   describe,
   test,
   beforeEach
} from '@jest/globals'

import TestUtil from '../_util/testUtil.js'
import { Controller } from '../../../server/controller.js'
import { Service } from '../../../server/service.js'

import config from '../../../server/config.js'
const {
   pages,
} = config


describe('#Controller - test controler for the return', () => {

   beforeEach(() => {
      jest.restoreAllMocks()
      jest.clearAllMocks()
   })

   test(`#getFileStream() - should return a fileStream`, async () => {
      const controller = new Controller();
      const mockFileStream = TestUtil.generateReadableStream(['data'])
      const expectedType = '.html'

      const jestMock = jest
         .spyOn(
            Service.prototype,
            Service.prototype.getFileStream.name)
         .mockResolvedValue({
            stream: mockFileStream,
            type: expectedType
         })

      const controllerReturn = await controller.getFileStream(pages.homeHTML)

      expect(jestMock).toBeCalledWith(pages.homeHTML)
      expect(controllerReturn).toStrictEqual({
         stream: mockFileStream,
         type: expectedType
      })
   })
})