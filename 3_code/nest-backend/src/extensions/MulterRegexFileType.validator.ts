import { FileValidator, InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs';

export declare type FileTypeValidatorOptions = {
  regex: RegExp;
};

export class RegexFileTypeValidator extends FileValidator<FileTypeValidatorOptions> {
  buildErrorMessage(file): string {
    if (file instanceof Array) {
      file.filter(o => !o.mimetype.match(this.validationOptions.regex)).forEach(f => fs.unlink(f.path, (err) => new InternalServerErrorException(err)))
    } else {
      fs.unlink(file.path, (err) => new InternalServerErrorException(err))
    }
    return "Invalid file type!";
  }
  isValid(file: Express.Multer.File): boolean {
    if (file instanceof Array) {
      return file.filter(o => !o.mimetype.match(this.validationOptions.regex)).length <= 0
    } else if (file.mimetype) 
      return file.mimetype.match(this.validationOptions.regex) ? true : false
    else 
      return true;
  }
}