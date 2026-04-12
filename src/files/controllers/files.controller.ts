// files.controller.ts
import { Controller, Post, UploadedFile, UseInterceptors, Get, Param, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FilesService } from '../services/files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './static/uploads',
      filename: (req, file, cb) => {
        const fileExtension = file.mimetype.split('/')[1];
        const fileName = `${Date.now()}.${fileExtension}`; // Evita duplicados
        cb(null, fileName);
      }
    })
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return { fileName: file.filename };
  }

  @Get(':name')
  findFile(@Param('name') name: string, @Res() res) {
    const path = this.filesService.getStaticFilePath(name);
    res.sendFile(path);
  }
}