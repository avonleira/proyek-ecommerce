import { FileValidator } from '@nestjs/common';

export declare type FileTypeValidatorOptions = {
  regex: RegExp;
};

export class RegexFileTypeValidator extends FileValidator<FileTypeValidatorOptions> {
  buildErrorMessage(): string {
    return "Invalid file type!";
  }
  isValid(file: Express.Multer.File): boolean {
    if (file.mimetype)
      return file[0].mimetype.match(this.validationOptions.regex)
    else 
      return true;
  }
}