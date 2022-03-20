import fs from 'fs'
import { join, dirname, extname } from 'path'
import fsPromises from 'fs/promises'

import config from './config.js'
const { dir: { publicDirectory } } = config

export class Service {
   createFileStream(filename) {
      return fs.createReadStream(filename)
   }

   async getFileInfo(file) {
      // file = home/index.html
      const fullFilePath = join(publicDirectory, file)
      const fileType = extname(fullFilePath)

      //check if exists, if it doesn't throw a error
      await fsPromises.access(fullFilePath)

      return {
         type: fileType,
         name: fullFilePath
      }
   }

   async getFileStream(file) {
      const {
         name,
         type
      } = await this.getFileInfo(file)
      return {
         stream: this.createFileStream(name),
         type
      }
   }
}