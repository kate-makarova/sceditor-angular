import { OnInit } from '@angular/core';
import { Observable } from "rxjs";
import * as i0 from "@angular/core";
export declare class SceditorComponent implements OnInit {
    id: string;
    format: string;
    toolbar: string;
    height: string | number;
    content: Observable<string | null>;
    private scripts;
    private scriptService;
    constructor();
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SceditorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SceditorComponent, "app-sceditor", never, { "id": { "alias": "id"; "required": false; }; "format": { "alias": "format"; "required": false; }; "toolbar": { "alias": "toolbar"; "required": false; }; "height": { "alias": "height"; "required": false; }; "content": { "alias": "content"; "required": false; }; }, {}, never, never, true, never>;
}
