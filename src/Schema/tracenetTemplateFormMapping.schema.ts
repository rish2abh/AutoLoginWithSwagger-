import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TracenetTemplateFormMappingDocument = HydratedDocument<TracenetTemplateFormMapping>;

@Schema({ timestamps: true })
export class TracenetTemplateFormMapping {

    @Prop()
    templatename: string;

    @Prop()
    templateid: object;

    @Prop()
    sourcecoloum: number;

    @Prop()
    destinationcoloum: number;


}

export const TracenetTemplateFormMappingSchema = SchemaFactory.createForClass(TracenetTemplateFormMapping);