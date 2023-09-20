import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TracenetauthDocument = HydratedDocument<Tracenetauth>;

@Schema({ timestamps: true })
export class Tracenetauth {

    @Prop()
    username: string;

    @Prop()
    sessionprop: object;

    @Prop()
    lastlogin: Date;

    @Prop()
    sessiontimeout: Date;

    @Prop()
    sessionduration: Date;

    @Prop()
    password: string;
}

export const TracenetauthSchema = SchemaFactory.createForClass(Tracenetauth);