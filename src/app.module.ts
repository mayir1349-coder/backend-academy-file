import { Module } from '@nestjs/common'; // Esto arregla el error TS2552
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FilesModule } from './files/files.module'; // Importamos tu lógica de archivos

@Module({
  imports: [
    
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
      serveRoot: '/static', 
    }),
    
    FilesModule,
  ],
})
export class AppModule {}