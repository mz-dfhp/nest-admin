import { Controller, Post } from '@nestjs/common';
import { UploadService } from './upload.service';
import { Public } from 'src/auth/auth.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Public()
  @Post('file')
  uploadFile() {
    return this.uploadService.uploadFile();
  }
}
