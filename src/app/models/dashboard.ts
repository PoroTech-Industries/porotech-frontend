import { Type } from "@angular/core";

export interface Widget {
    id: number;
    content: Type<any>;
    rows?: number;
    columns?: number;
}