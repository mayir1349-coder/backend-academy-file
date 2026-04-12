import { Injectable, BadRequestException } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
  

  getStaticFilePath(fileName: string) {
  
    const path = join(__dirname, '../../../static/uploads', fileName);

    
    if (!existsSync(path)) {
      throw new BadRequestException(`No se encontró el archivo: ${fileName}`);
    }

    return path;
  }
}