import { EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from "rxjs";
import * as i0 from "@angular/core";
export declare class SceditorComponent implements OnInit, OnChanges {
    id: string;
    mode: string;
    format: string;
    toolbar: string;
    height: string | number;
    content: Observable<string | null>;
    private scripts;
    private scriptService;
    emitter: EventEmitter<boolean>;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SceditorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SceditorComponent, "app-sceditor", never, { "id": { "alias": "id"; "required": false; }; "mode": { "alias": "mode"; "required": false; }; "format": { "alias": "format"; "required": false; }; "toolbar": { "alias": "toolbar"; "required": false; }; "height": { "alias": "height"; "required": false; }; "content": { "alias": "content"; "required": false; }; }, { "emitter": "sceditor_initialized"; }, never, never, true, never>;
}
