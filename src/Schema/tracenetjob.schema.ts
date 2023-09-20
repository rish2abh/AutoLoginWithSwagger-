import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TracenetjobDocument = HydratedDocument<Tracenetjob>;

export enum Status {
    PENDING = 'pending',
    PROCESSING = 'processing',
    VALIDATION_FAILED = 'validationFailed',
    LOGIN_FAILED = 'loginFailed',
    COMPLETED = 'completed',
}


@Schema({timestamps:true})
export class Tracenetjob {

  @Prop()
  tracenetuserid: string;

  @Prop()
  jobid: string;

  @Prop()
  jobflowertype: string;

  @Prop()
  jobpath: string;

  @Prop()
  jobdatetime: string;

  @Prop()
  consoleuserid: string;

  @Prop({enum: [...Object.values(Status)] })
  status: string;

  @Prop()
  elapsedtime:string;

  @Prop()
  error:object;

  @Prop()
  total:number;

  @Prop()
  success:number;
  
  @Prop()
  failed:number;

  @Prop()
  pending:number;
}

export const TracenetjobSchema = SchemaFactory.createForClass(Tracenetjob);