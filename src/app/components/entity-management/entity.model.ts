export class EntityModel {
    name: string;
    entityCode: string;
    description: string;
    enableFlag: boolean;
    parent: string;
    processingStatus: string;
    entityId: string;

    constructor(name: string, entityCode: string, description: string, enableFlag: boolean,parent: string ) {
      this.name = name;
      this.entityCode = entityCode;
      this.description = description;
      this.enableFlag = enableFlag;
      this.description = description;
    }
  
  }

  