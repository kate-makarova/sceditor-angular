import * as i0 from '@angular/core';
import { EventEmitter, Component, Input, Output, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

class ScriptService {
    scripts = {};
    constructor(scriptStore) {
        scriptStore.forEach((script) => {
            this.scripts[script.name] = {
                loaded: false,
                src: script.src
            };
        });
    }
    async load(...scripts) {
        const promises = [];
        for (const script of scripts) {
            await this.loadScript(script);
        }
        return Promise.all(promises);
    }
    loadScript(name) {
        return new Promise((resolve, reject) => {
            // resolve if already loaded
            if (this.scripts[name].loaded) {
                resolve({ script: name, loaded: true, status: 'Already Loaded' });
            }
            else {
                // load script
                const script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = this.scripts[name].src;
                script.onload = () => {
                    this.scripts[name].loaded = true;
                    console.log(`${name} Loaded.`);
                    resolve({ script: name, loaded: true, status: 'Loaded' });
                };
                script.onerror = (error) => resolve({ script: name, loaded: false, status: 'Loaded' });
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        });
    }
}

class SceditorComponent {
    id = '';
    mode = 'default';
    format = 'xhtml';
    toolbar = 'bold,italic,underline,strike,subscript,superscript|' +
        'left,center,right,justify|' +
        'font,size,color|' +
        'removeformat|' +
        'cut,copy,paste|' +
        'pastetext,bulletlist,orderedlist,table,code,quote|' +
        'horizontalrule|' +
        'image,link,unlink|' +
        'emoticon|' +
        'source';
    height = 100;
    content = of(null);
    scripts = [];
    scriptService = null;
    emitter = new EventEmitter();
    ngOnInit() {
        let format_script = 'https://cdn.jsdelivr.net/npm/sceditor@3/minified/formats/xhtml.min.js';
        if (this.format == 'bbcode') {
            format_script = 'https://cdn.jsdelivr.net/npm/sceditor@3/minified/formats/bbcode.min.js';
        }
        this.scripts = [
            { name: 'main', src: 'https://cdn.jsdelivr.net/combine/npm/sceditor@latest/minified/sceditor.min.js,npm/sceditor@latest/minified/icons/monocons.min.js' },
            { name: 'format', src: format_script }
        ];
        this.scriptService = new ScriptService(this.scripts);
        let style = '/content-default.min.css';
        if (this.mode == 'dark') {
            style = '/content-dark.min.css';
        }
        this.scriptService.load('main', 'format').then(() => {
            const textarea = document.getElementById(this.id);
            // @ts-ignore
            sceditor.create(textarea, {
                icons: 'monocons',
                format: this.format,
                toolbar: this.toolbar,
                style: style,
                height: this.height,
                emoticonsRoot: 'https://www.sceditor.com/',
            });
            this.emitter.emit(true);
        });
    }
    ngOnChanges(changes) {
        if (changes['content']) {
            this.content.subscribe((content) => {
                if (content == null) {
                    return;
                }
                const textarea = document.getElementById(this.id);
                // @ts-ignore
                sceditor.instance(textarea).val(content);
            });
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.3", ngImport: i0, type: SceditorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.1.3", type: SceditorComponent, isStandalone: true, selector: "app-sceditor", inputs: { id: "id", mode: "mode", format: "format", toolbar: "toolbar", height: "height", content: "content" }, outputs: { emitter: "sceditor_initialized" }, usesOnChanges: true, ngImport: i0, template: "<textarea [id]=\"id\"></textarea>", styles: [""], dependencies: [{ kind: "ngmodule", type: ReactiveFormsModule }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.3", ngImport: i0, type: SceditorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-sceditor', imports: [
                        ReactiveFormsModule
                    ], template: "<textarea [id]=\"id\"></textarea>" }]
        }], propDecorators: { id: [{
                type: Input,
                args: ['id']
            }], mode: [{
                type: Input,
                args: ['mode']
            }], format: [{
                type: Input,
                args: ['format']
            }], toolbar: [{
                type: Input,
                args: ['toolbar']
            }], height: [{
                type: Input,
                args: ['height']
            }], content: [{
                type: Input,
                args: ['content']
            }], emitter: [{
                type: Output,
                args: ['sceditor_initialized']
            }] } });

class SCEditorModule {
    static getValue(id) {
        const textarea = document.getElementById(id);
        // @ts-ignore
        return sceditor.instance(textarea).val();
    }
    static setValue(id, value) {
        const textarea = document.getElementById(id);
        // @ts-ignore
        return sceditor.instance(textarea).val('');
    }
    static setCSS(id, css) {
        const textarea = document.getElementById(id);
        // @ts-ignore
        return sceditor.instance(textarea).css(css);
    }
    static setOnKeyUp(id, callback) {
        const textarea = document.getElementById(id);
        // @ts-ignore
        sceditor.instance(textarea).keyup(callback);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.3", ngImport: i0, type: SCEditorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.1.3", ngImport: i0, type: SCEditorModule, imports: [CommonModule,
            SceditorComponent], exports: [SceditorComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.1.3", ngImport: i0, type: SCEditorModule, imports: [CommonModule,
            SceditorComponent] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.3", ngImport: i0, type: SCEditorModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [],
                    imports: [
                        CommonModule,
                        SceditorComponent
                    ],
                    exports: [
                        SceditorComponent
                    ]
                }]
        }] });

/*
 * Public API Surface of sceditor-angular
 */

/**
 * Generated bundle index. Do not edit.
 */

export { SCEditorModule, SceditorComponent, ScriptService };
//# sourceMappingURL=sceditor-angular.mjs.map
