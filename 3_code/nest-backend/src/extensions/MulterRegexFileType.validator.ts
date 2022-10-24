import { FileValidator } from '@nestjs/common';

export declare type FileTypeValidatorOptions = {
  fileType: RegExp;
};

export class RegexFileTypeValidator extends FileValidator<FileTypeValidatorOptions> {
  buildErrorMessage(): string {
    return "Validation failed (expected type is image)";
  }
  isValid(file: Express.Multer.File): boolean {
    if (file.mimetype)
      return file[0].mimetype.match(this.validationOptions.fileType)
    else 
      return true;
  }
}