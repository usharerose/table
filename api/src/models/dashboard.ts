import { Entity, Column } from 'typeorm';
import { BaseModel } from './base';

@Entity()
export default class Dashboard extends BaseModel {
  @Column('character varying', {
    nullable: false,
    primary: false,
    name: 'name',
  })
  name: string;

  @Column('jsonb', { name: 'content' })
  content: Record<string, any>;

  @Column('boolean', {
    default: false,
    name: 'is_removed',
  })
  is_removed: boolean;

  @Column('boolean', {
    default: false,
    name: 'is_preset',
  })
  is_preset: boolean;

  @Column('character varying', {
    nullable: false,
    default: '',
    name: 'group',
  })
  group: string;
}