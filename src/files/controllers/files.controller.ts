import { Controller, Post, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('files')
export class FilesController {
  
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './static/uploads', 
      filename: (req, file, callback) => {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
        callback(null, `${uniqueName}${extname(file.originalname)}`);
      }
    }),
    fileFilter: (req, file, callback) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png|pdf)$/)) {
        return callback(new BadRequestException('Solo se admiten imágenes o PDFs'), false);
      }
      callback(null, true);
    }
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      url: `http://localhost:3000/static/uploads/${file.filename}`
    };
  }
}