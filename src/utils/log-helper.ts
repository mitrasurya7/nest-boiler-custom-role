import {
  Log,
  ProtectedControllerLog,
  ProtectedControllerLogForJunction,
  ProtectedControllerLogWithEntityId,
  ProtectedControllerLogWithEntityName,
  ServiceLog,
  ServiceLogWithEntityId,
  UnprotectedControllerLog,
} from './types/log-message.type';

interface InputVisitor {
  visitLogInput(input: LogInput): string;
  visitUnprotectedControllerLogInput(
    input: UnprotectedControllerLogInput,
  ): string;
  visitProtectedControllerLogInput(input: ProtectedControllerLogInput): string;
  visitProtectedControllerLogWithEntityIdInput(
    input: ProtectedControllerLogWithEntityIdInput,
  ): string;
  visitProtectedControllerLogWithEntityNameInput(
    input: ProtectedControllerLogWithEntityNameInput,
  ): string;
  visitProtectedControllerLogForJunctionInput(
    input: ProtectedControllerLogForJunctionInput,
  ): string;
  visitProtectedControllerLogForJunctionInput(
    input: ProtectedControllerLogForJunctionInput,
  ): string;
  visitServiceLogInput(input: ServiceLogInput): string;
  visitServiceLogWithEntityIdInput(input: ServiceLogWithEntityIdInput): string;
}

abstract class Input {
  abstract accept(visitor: InputVisitor): void;
}

export class LogInput extends Input {
  constructor(public value: Log) {
    super();
  }
  accept(visitor: InputVisitor) {
    return visitor.visitLogInput(this);
  }
}

export class UnprotectedControllerLogInput extends Input {
  constructor(public value: UnprotectedControllerLog) {
    super();
  }
  accept(visitor: InputVisitor) {
    return visitor.visitUnprotectedControllerLogInput(this);
  }
}

export class ProtectedControllerLogInput extends Input {
  constructor(public value: ProtectedControllerLog) {
    super();
  }
  accept(visitor: InputVisitor) {
    return visitor.visitProtectedControllerLogInput(this);
  }
}

export class ProtectedControllerLogWithEntityIdInput extends Input {
  constructor(public value: ProtectedControllerLogWithEntityId) {
    super();
  }
  accept(visitor: InputVisitor) {
    return visitor.visitProtectedControllerLogWithEntityIdInput(this);
  }
}

export class ProtectedControllerLogWithEntityNameInput extends Input {
  constructor(public value: ProtectedControllerLogWithEntityName) {
    super();
  }
  accept(visitor: InputVisitor) {
    return visitor.visitProtectedControllerLogWithEntityNameInput(this);
  }
}

export class ProtectedControllerLogForJunctionInput extends Input {
  constructor(public value: ProtectedControllerLogForJunction) {
    super();
  }
  accept(visitor: InputVisitor) {
    return visitor.visitProtectedControllerLogForJunctionInput(this);
  }
}

export class ServiceLogInput extends Input {
  constructor(public value: ServiceLog) {
    super();
  }
  accept(visitor: InputVisitor) {
    return visitor.visitServiceLogInput(this);
  }
}

export class ServiceLogWithEntityIdInput extends Input {
  constructor(public value: ServiceLogWithEntityId) {
    super();
  }
  accept(visitor: InputVisitor) {
    return visitor.visitServiceLogWithEntityIdInput(this);
  }
}

export class LoggerProcessor implements InputVisitor {
  visitLogInput(input: LogInput): string {
    return `REQUEST_ID=${input.value.requestId} MESSAGE=${input.value.message}`;
  }
  visitUnprotectedControllerLogInput(
    input: UnprotectedControllerLogInput,
  ): string {
    return `REQUEST_ID=${input.value.requestId} MESSAGE=${input.value.message}`;
  }
  visitProtectedControllerLogInput(input: ProtectedControllerLogInput): string {
    return `REQUEST_ID=${input.value.requestId} USER_ID=${input.value.userId} MESSAGE=${input.value.message}`;
  }
  visitProtectedControllerLogWithEntityIdInput(
    input: ProtectedControllerLogWithEntityIdInput,
  ): string {
    return `REQUEST_ID=${input.value.requestId} USER_ID=${input.value.userId} ENTITY_ID=${input.value.entityId} MESSAGE=${input.value.message}`;
  }
  visitProtectedControllerLogWithEntityNameInput(
    input: ProtectedControllerLogWithEntityNameInput,
  ): string {
    return `REQUEST_ID=${input.value.requestId} USER_ID=${input.value.userId} ENTITY_NAME=${input.value.entityName} MESSAGE=${input.value.message}`;
  }
  visitProtectedControllerLogForJunctionInput(
    input: ProtectedControllerLogForJunctionInput,
  ): string {
    return `REQUEST_ID=${input.value.requestId} USER_ID=${input.value.userId} ${input.value.firstEntityName}=${input.value.firstEntityId} ${input.value.secondEntityName}=${input.value.secondEntityId} MESSAGE=${input.value.message}`;
  }
  visitServiceLogInput(input: ServiceLogInput): string {
    return `REQUEST_ID=${input.value.requestId} MESSAGE=${input.value.message}`;
  }
  visitServiceLogWithEntityIdInput(input: ServiceLogWithEntityIdInput): string {
    return `REQUEST_ID=${input.value.requestId} ENTITY_ID=${input.value.entityId} MESSAGE=${input.value.message}`;
  }
}
