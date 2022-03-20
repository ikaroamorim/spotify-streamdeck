import {
   jest,
   expect,
   describe,
   test,
   beforeEach
} from '@jest/globals'

import fs from 'fs'
import fsPromises from 'fs/promises'
import path, { join, dirname, extname } from 'path'


import { Service } from '../../../server/service.js'

import TestUtil from '../_util/testUtil.js'

import config from '../../../server/config.js'
const { dir: { publicDirectory } } = config

describe('#Services - test suite for service functions', () => {
   beforeEach(() => {
      jest.restoreAllMocks()
      jest.clearAllMocks()
   })

   test('createFileStream()  - Should return  a stream for a given file ', async () => {
      const fileName = '/index.html'
      const mockFileStream = TestUtil.generateReadableStream(['data'])

      const createReadStream = jest
         .spyOn(fs, fs.createReadStream.name)
         .mockReturnValue(mockFileStream)

      const service = new Service()
      const serviceReturn = service.createFileStream(fileName)

      expect(createReadStream).toBeCalledWith(fileName)
      expect(serviceReturn).toStrictEqual(mockFileStream)

   })

   test('getFileInfo() - Should return name and type of a file', async () => {
      const fileName = 'index.html'
      const expectedType = '.html'
      const expectedFullFilePath = `${publicDirectory}\\${fileName}`


      const usefsPromises = jest
         .spyOn(fsPromises, fsPromises.access.name)
         .mockResolvedValue()

      const service = new Service()
      const serviceReturn = await service.getFileInfo(fileName)

      expect(serviceReturn)
         .toStrictEqual({
            name: expectedFullFilePath,
            type: expectedType
         })


   })

   test('getFileStream()  - Should return a type and a stream for a given file ', async () => {
      const mockFileStream = TestUtil.generateReadableStream(['data'])
      const fileName = 'index.html'
      const expectedFullFilePath = `${publicDirectory}\\${fileName}`

      const fileInfo = {
         type: '.html',
         name: expectedFullFilePath
      }

      const service = new Service()

      jest.spyOn(service, service.getFileInfo.name).mockResolvedValue(fileInfo)

      jest.spyOn(service, service.createFileStream.name).mockReturnValue(mockFileStream)

      const serviceReturn = await service.getFileStream(fileName)

      const expectedResult = {
         type: fileInfo.type,
         stream: mockFileStream
      }

      expect(serviceReturn).toStrictEqual(expectedResult)

      expect(service.createFileStream).toHaveBeenCalledWith(
         fileInfo.name
      )

      expect(service.getFileInfo).toHaveBeenCalledWith(fileName)

   })


})