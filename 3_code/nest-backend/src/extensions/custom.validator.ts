import {registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';

//Match
export function Match(property: string, validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [property],
            validator: MatchConstraint,
        });
    };
}

@ValidatorConstraint({name: 'Match'})
export class MatchConstraint implements ValidatorConstraintInterface {

    validate(value: any, args: ValidationArguments) {
      const [relatedPropertyName] = args.constraints;
      const relatedValue = (args.object as any)[relatedPropertyName];
      return value === relatedValue;
    }

    defaultMessage(args: ValidationArguments) { 
      return args.property + " must match " + args.constraints[0]; 
    }
}

//MatchIfExist
export function MatchIfExist(property: string, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
      registerDecorator({
          target: object.constructor,
          propertyName,
          options: validationOptions,
          constraints: [property],
          validator: MatchIfExistConstraint,
      });
  };
}

@ValidatorConstraint({name: 'MatchIfExist'})
export class MatchIfExistConstraint implements ValidatorConstraintInterface {

  validate(value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    if(!relatedValue)
      return true
    return value === relatedValue;
  }

  defaultMessage(args: ValidationArguments) { 
    return args.property + " must match " + args.constraints[0]; 
  }
}

//String or number
export function IsNumberOrStringNumber(property?: any, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
      registerDecorator({
          target: object.constructor,
          propertyName,
          options: validationOptions,
          constraints: [property],
          validator: IsNumberOrStringNumberConstraint,
      });
  };
}

@ValidatorConstraint({ name: 'IsNumberOrStringNumber'})
export class IsNumberOrStringNumberConstraint implements ValidatorConstraintInterface {
  validate(text: any, args: ValidationArguments) {
    return !isNaN(text)
  }

  defaultMessage(args: ValidationArguments) {
    return '($value) must be number or string number';
  }
}


