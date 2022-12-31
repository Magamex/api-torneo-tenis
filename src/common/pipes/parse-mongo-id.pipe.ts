import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { BadRequestException } from '@nestjs/common/exceptions';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {

    transform(value: any, metadata: ArgumentMetadata) {
    
        if(!isValidObjectId(value)){
            throw new BadRequestException(`Invalid MongoId: ${value}`)
        }

        return value;
    }
}
