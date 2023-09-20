import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AddExcelDocument = HydratedDocument<excelTemplate>;

@Schema({ timestamps: true })
export class excelTemplate {

    @Prop()
    name: string;

    @Prop()
    urlLimit: string;

    @Prop()
    path: string;

    @Prop({default : true})
    isActive: boolean;

    @Prop({default : true})
    isShow: boolean;

    @Prop()
    key: string;
}

export const ExcelTemplateSchema = SchemaFactory.createForClass(excelTemplate);