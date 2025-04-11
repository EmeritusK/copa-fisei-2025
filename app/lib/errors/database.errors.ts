export class DatabaseError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'DatabaseError';
    }
}

export class NoDataError extends DatabaseError {
    constructor(entity: string) {
        super(`No se encontraron registros de ${entity}`);
        this.name = 'NoDataError';
    }
}



export class RecordNotFoundError extends DatabaseError {
    constructor(entity: string, id: string) {
        super(`${entity} con ID ${id} no encontrado`);
        this.name = 'RecordNotFoundError';
    }
}

export class DuplicateEntryError extends DatabaseError {
    constructor(field: string, value: string) {
        super(`Ya existe un registro con ${field} = ${value}`);
        this.name = 'DuplicateEntryError';
    }
}

export class ConstraintViolationError extends DatabaseError {
    constructor(constraint: string) {
        super(`Violación de restricción: ${constraint}`);
        this.name = 'ConstraintViolationError';
    }
}