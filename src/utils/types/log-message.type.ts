export type Log = {
  requestId: string;
  message: string;
};

export type UnprotectedControllerLog = Log;

export type ProtectedControllerLog = Log & {
  userId: string;
};

export type ProtectedControllerLogWithEntityName = ProtectedControllerLog & {
  entityName: string;
};

export type ProtectedControllerLogWithEntityId = ProtectedControllerLog & {
  entityId: string | string[] | number | number[];
};

export type ProtectedControllerLogForJunction = ProtectedControllerLog & {
  firstEntityId: string | string[] | number | number[];
  firstEntityName: string;
  secondEntityId: string | string[] | number | number[];
  secondEntityName: string;
};

export type ServiceLog = Log;

export type ServiceLogWithEntityId = ServiceLog & {
  entityId: string | string[] | number | number[];
};
