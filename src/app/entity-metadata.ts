import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';

const weatherMetadata: EntityMetadataMap = {};
const pluralNames = {};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata: weatherMetadata,
  pluralNames,
};
