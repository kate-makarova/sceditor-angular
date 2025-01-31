import * as i0 from '@angular/core';
import { Component, Input, NgModule } from '@angular/core';
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
    format = 'xhtml';
    toolbar = 'bold,italic,underline,strike,subscript,superscript|' +
        'left,center,right,justify|' +
        'font,size,color|' +
        'removeformat|' +
        'cut,copy,paste|' +
        'pastetext,bulletlist,orderedlist,table,code,quote|' +
        'horizontalrule|' +
        'image,link,unlink|' +
        'emoticon';
    height = 100;
    content = of(null);
    scripts = [];
    scriptService = null;
    ngOnInit() {
        let format_script = 'https://cdn.jsdelivr.net/npm/sceditor@3/minified/formats/xhtml.min.js';
        if (this.format == 'bbcode') {
            format_script = 'https://cdn.jsdelivr.net/npm/sceditor@3/minified/formats/bbcode.min.js';
        }
        this.scripts = [
            { name: 'main', src: 'https://cdn.jsdelivr.net/npm/sceditor@3/minified/sceditor.min.js' },
            { name: 'format', src: format_script }
        ];
        this.scriptService = new ScriptService(this.scripts);
        this.scriptService.load('main', 'format').then(() => {
            const textarea = document.getElementById(this.id);
            // @ts-ignore
            sceditor.create(textarea, {
                format: this.format,
                toolbar: this.toolbar,
                style: 'https://cdn.jsdelivr.net/npm/sceditor@3/minified/themes/content/default.min.css',
                height: this.height,
                emoticonsRoot: 'https://www.sceditor.com/',
            });
        });
    }
    ngOnChanges(changes) {
        if (changes['content']) {
            this.content.subscribe((content) => {
                if (content == null) {
                    return;
                }
                const textarea = document.getElementById(this.id);
                //   const valueWithLineBreaks = content.replace(/\n/g, "\r\n");
                // @ts-ignore
                return sceditor.instance(textarea).val(valueWithLineBreaks);
            });
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.3", ngImport: i0, type: SceditorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.1.3", type: SceditorComponent, isStandalone: true, selector: "app-sceditor", inputs: { id: "id", format: "format", toolbar: "toolbar", height: "height", content: "content" }, usesOnChanges: true, ngImport: i0, template: "<textarea [id]=\"id\"></textarea>", styles: [".sceditor-button div,div.sceditor-grip{background-repeat:no-repeat;height:16px;width:16px}.sceditor-button-youtube div{background-position:0 0}.sceditor-button-link div{background-position:0 -16px}.sceditor-button-unlink div{background-position:0 -32px}.sceditor-button-underline div{background-position:0 -48px}.sceditor-button-time div{background-position:0 -64px}.sceditor-button-table div{background-position:0 -80px}.sceditor-button-superscript div{background-position:0 -96px}.sceditor-button-subscript div{background-position:0 -112px}.sceditor-button-strike div{background-position:0 -128px}.sceditor-button-source div{background-position:0 -144px}.sceditor-button-size div{background-position:0 -160px}.sceditor-button-rtl div{background-position:0 -176px}.sceditor-button-right div{background-position:0 -192px}.sceditor-button-removeformat div{background-position:0 -208px}.sceditor-button-quote div{background-position:0 -224px}.sceditor-button-print div{background-position:0 -240px}.sceditor-button-pastetext div{background-position:0 -256px}.sceditor-button-paste div{background-position:0 -272px}.sceditor-button-outdent div{background-position:0 -288px}.sceditor-button-orderedlist div{background-position:0 -304px}.sceditor-button-maximize div{background-position:0 -320px}.sceditor-button-ltr div{background-position:0 -336px}.sceditor-button-left div{background-position:0 -352px}.sceditor-button-justify div{background-position:0 -368px}.sceditor-button-italic div{background-position:0 -384px}.sceditor-button-indent div{background-position:0 -400px}.sceditor-button-image div{background-position:0 -416px}.sceditor-button-horizontalrule div{background-position:0 -432px}.sceditor-button-format div{background-position:0 -448px}.sceditor-button-font div{background-position:0 -464px}.sceditor-button-emoticon div{background-position:0 -480px}.sceditor-button-email div{background-position:0 -496px}.sceditor-button-date div{background-position:0 -512px}.sceditor-button-cut div{background-position:0 -528px}.sceditor-button-copy div{background-position:0 -544px}.sceditor-button-color div{background-position:0 -560px}.sceditor-button-code div{background-position:0 -576px}.sceditor-button-center div{background-position:0 -592px}.sceditor-button-bulletlist div{background-position:0 -608px}.sceditor-button-bold div{background-position:0 -624px}div.sceditor-grip{background-position:0 -640px}.rtl div.sceditor-grip{background-position:0 -650px}.sceditor-container{-webkit-box-orient:vertical;-webkit-box-direction:normal;background:#fff;background-clip:padding-box;border:1px solid #d9d9d9;border-radius:4px;color:#333;display:-ms-flexbox;display:-webkit-box;display:flex;-ms-flex-direction:column;flex-direction:column;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;font-size:13px;font-weight:700;height:250px;line-height:1;position:relative}.sceditor-container *,.sceditor-container :after,.sceditor-container :before{-webkit-box-sizing:content-box;box-sizing:content-box}.sceditor-container,.sceditor-container div,div.sceditor-dropdown,div.sceditor-dropdown div{margin:0;padding:0;z-index:3}.sceditor-container iframe,.sceditor-container textarea{-webkit-box-flex:1;background:#fff;border:0;color:#111;display:block;-ms-flex:1 1 0%;flex:1 1 0%;font-family:Verdana,Arial,Helvetica,sans-serif;font-size:14px;height:auto!important;line-height:1.25;margin:5px;min-height:1px;outline:none;padding:0;resize:none;width:auto!important;width:calc(100% - 10px)!important}.sceditor-container textarea{margin:7px 5px}div.sceditor-dnd-cover{background:#fff3;border:5px dashed #aaa;color:#aaa;font-size:2em;inset:0;position:absolute;text-align:center;z-index:200}div.sceditor-dnd-cover p{pointer-events:none;position:relative;top:45%}div.sceditor-resize-cover{background:#000;height:100%;left:0;opacity:.3;position:absolute;top:0;width:100%;z-index:10}div.sceditor-grip{bottom:0;cursor:pointer;height:10px;line-height:0;overflow:hidden;position:absolute;right:0;width:10px;z-index:3}div.sceditor-grip.has-icon{background-image:none}.sceditor-maximize{background-clip:padding-box;border-radius:0;height:100%!important;left:0;position:fixed;top:0;width:100%!important;z-index:2000}body.sceditor-maximize,html.sceditor-maximize{height:100%;margin:0;overflow:hidden;padding:0;width:100%}.sceditor-maximize div.sceditor-grip{display:none}.sceditor-maximize div.sceditor-toolbar{background-clip:padding-box;border-radius:0}div.sceditor-dropdown{background:#fff;background-clip:padding-box;border:1px solid #ccc;border-radius:2px;-webkit-box-shadow:1px 2px 4px rgba(0,0,0,.2);box-shadow:1px 2px 4px #0003;font-size:15px;font-weight:400;padding:10px;position:absolute;z-index:4000}div.sceditor-dropdown *,div.sceditor-dropdown :after,div.sceditor-dropdown :before{-webkit-box-sizing:border-box;box-sizing:border-box}div.sceditor-dropdown a,div.sceditor-dropdown a:link{color:#333}div.sceditor-dropdown form{margin:0}div.sceditor-dropdown label{color:#3c3c3c;display:block;font-weight:700;padding:4px 0}div.sceditor-dropdown input,div.sceditor-dropdown textarea{background-clip:padding-box;border:1px solid #ccc;border-radius:1px;border-top-color:#888;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;margin:0 0 .75em;outline:0;padding:4px}div.sceditor-dropdown textarea{padding:6px}div.sceditor-dropdown input:focus,div.sceditor-dropdown textarea:focus{border-color:#666 #aaa #aaa;-webkit-box-shadow:inset 0 1px 5px rgba(0,0,0,.1);box-shadow:inset 0 1px 5px #0000001a}div.sceditor-dropdown .button{background:#ececec;background-clip:padding-box;border:1px solid #ccc;border-radius:2px;color:#444;cursor:pointer;font-weight:700;margin:.3em 0 0;padding:6px 12px}div.sceditor-dropdown .button:hover{background:#f3f3f3;-webkit-box-shadow:0 1px 1px rgba(0,0,0,.15);box-shadow:0 1px 1px #00000026}div.sceditor-font-picker,div.sceditor-fontsize-picker,div.sceditor-format{padding:6px 0}div.sceditor-color-picker{padding:4px}div.sceditor-emoticons,div.sceditor-more-emoticons{padding:0}.sceditor-pastetext textarea{border:1px solid #bbb;width:20em}.sceditor-emoticons img,.sceditor-more-emoticons img{cursor:pointer;margin:2px;padding:0}.sceditor-more{border-top:1px solid #bbb;cursor:pointer;display:block;font-weight:700;padding:6px 0;text-align:center}.sceditor-dropdown a:hover{background:#eee}.sceditor-font-option,.sceditor-fontsize-option,.sceditor-format a{color:#222;cursor:pointer;display:block;padding:7px 10px;text-decoration:none}.sceditor-fontsize-option{padding:7px 13px}.sceditor-color-column{float:left}.sceditor-color-option{border:2px solid #fff;display:block;height:18px;overflow:hidden;width:18px}.sceditor-color-option:hover{border:1px solid #aaa}div.sceditor-toolbar{-ms-flex-negative:0;background:#f7f7f7;background-clip:padding-box;border-bottom:1px solid silver;border-radius:3px 3px 0 0;flex-shrink:0;line-height:0;overflow:hidden;padding:3px 5px 2px;text-align:left;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}div.sceditor-group{background:#ddd;border-bottom:1px solid #aaa;display:inline-block;margin:1px 5px 1px 0;padding:1px}.sceditor-button,div.sceditor-group{background-clip:padding-box;border-radius:3px}.sceditor-button{cursor:pointer;float:left;height:20px;padding:3px 5px;width:16px}.sceditor-button.active,.sceditor-button:active,.sceditor-button:hover{background:#fff;-webkit-box-shadow:inset 1px 1px 0 rgba(0,0,0,.3),inset -1px 0 rgba(0,0,0,.3),inset 0 -1px 0 rgba(0,0,0,.2);box-shadow:inset 1px 1px #0000004d,inset -1px 0 #0000004d,inset 0 -1px #0003}.sceditor-button:active{background:#fff;-webkit-box-shadow:inset 1px 1px 0 rgba(0,0,0,.3),inset -1px 0 rgba(0,0,0,.3),inset 0 -1px 0 rgba(0,0,0,.2),inset 0 0 8px rgba(0,0,0,.3);box-shadow:inset 1px 1px #0000004d,inset -1px 0 #0000004d,inset 0 -1px #0003,inset 0 0 8px #0000004d}.sceditor-button.disabled:hover{background:inherit;-webkit-box-shadow:none;box-shadow:none;cursor:default}.sceditor-button,.sceditor-button div{display:block}.sceditor-button svg{fill:#111;display:inline-block;height:16px;line-height:1;margin:2px 0;pointer-events:none;text-decoration:none;width:16px}.sceditor-button.disabled svg{fill:#888}.sceditor-button div{color:transparent;display:inline-block;font-size:0;line-height:0;margin:2px 0;overflow:hidden;padding:0}.sceditor-button.has-icon div{display:none}.sceditor-button.disabled div{opacity:.3}.sceditor-button.text,.sceditor-button.text div,.sceditor-button.text-icon,.sceditor-button.text-icon div,.text .sceditor-button,.text .sceditor-button div,.text-icon .sceditor-button,.text-icon .sceditor-button div{color:inherit;display:inline-block;font-size:1em;line-height:16px;text-indent:0;width:auto}.sceditor-button.has-icon div,.sceditor-button.text div,.text .sceditor-button div,.text-icon .sceditor-button.has-icon div{background:none;padding:0 2px}.sceditor-button.text svg,.text .sceditor-button svg{display:none}.sceditor-button.text-icon div,.text-icon .sceditor-button div{padding:0 2px 0 20px}.rtl div.sceditor-toolbar{text-align:right}.rtl .sceditor-button{float:right}.rtl div.sceditor-grip{left:0;right:auto}body,code:before,html,p,table{font-family:Verdana,Arial,Helvetica,sans-serif;font-size:14px;line-height:1.25;margin:0;overflow:visible;padding:0}body.placeholder:before{content:attr(placeholder);font-style:italic}code{direction:ltr;display:block;margin:.25em 0;padding:1em;text-align:left;white-space:pre}blockquote{border-left:.3em solid #f4e59f;margin:.25em 0;padding:.5em .5em .5em .75em}body,code:before,html,p,table{color:#111;font-family:Verdana,Arial,Helvetica,sans-serif;font-size:14px;line-height:1.25;margin:0;overflow:visible;padding:0}html{height:100%}.ios{-webkit-overflow-scrolling:touch;overflow:auto}.ios body{overflow:auto;position:relative}body{word-wrap:break-word;min-height:100%}body.placeholder:before{color:#555;content:attr(placeholder);font-style:italic}ol,ul{margin-bottom:0;margin-top:0;padding-bottom:0;padding-top:0}table,td{border:1px dotted #000;empty-cells:show}table td{min-width:5px}code{background:#f1f1f1;direction:ltr;display:block;margin:.25em 0;padding:1em;text-align:left;white-space:pre}blockquote{background:#fff7d9;border-left:.3em solid #f4e59f;margin:.25em 0;padding:.5em .5em .5em .75em}blockquote cite{border-bottom:1px solid #f4e59f;display:block;font-size:1em;font-weight:700;margin:0 -.5em .25em -.75em;padding:0 .5em .15em .75em}h1,h2,h3,h4,h5,h6{margin:0;padding:0}div,p{min-height:1.25em}\n/*! SCEditor | (C) 2011-2016, Sam Clarke | sceditor.com/license */\n/*! SCEditor | (C) 2011-2013, Sam Clarke | sceditor.com/license */\n"], dependencies: [{ kind: "ngmodule", type: ReactiveFormsModule }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.3", ngImport: i0, type: SceditorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-sceditor', imports: [
                        ReactiveFormsModule
                    ], template: "<textarea [id]=\"id\"></textarea>", styles: [".sceditor-button div,div.sceditor-grip{background-repeat:no-repeat;height:16px;width:16px}.sceditor-button-youtube div{background-position:0 0}.sceditor-button-link div{background-position:0 -16px}.sceditor-button-unlink div{background-position:0 -32px}.sceditor-button-underline div{background-position:0 -48px}.sceditor-button-time div{background-position:0 -64px}.sceditor-button-table div{background-position:0 -80px}.sceditor-button-superscript div{background-position:0 -96px}.sceditor-button-subscript div{background-position:0 -112px}.sceditor-button-strike div{background-position:0 -128px}.sceditor-button-source div{background-position:0 -144px}.sceditor-button-size div{background-position:0 -160px}.sceditor-button-rtl div{background-position:0 -176px}.sceditor-button-right div{background-position:0 -192px}.sceditor-button-removeformat div{background-position:0 -208px}.sceditor-button-quote div{background-position:0 -224px}.sceditor-button-print div{background-position:0 -240px}.sceditor-button-pastetext div{background-position:0 -256px}.sceditor-button-paste div{background-position:0 -272px}.sceditor-button-outdent div{background-position:0 -288px}.sceditor-button-orderedlist div{background-position:0 -304px}.sceditor-button-maximize div{background-position:0 -320px}.sceditor-button-ltr div{background-position:0 -336px}.sceditor-button-left div{background-position:0 -352px}.sceditor-button-justify div{background-position:0 -368px}.sceditor-button-italic div{background-position:0 -384px}.sceditor-button-indent div{background-position:0 -400px}.sceditor-button-image div{background-position:0 -416px}.sceditor-button-horizontalrule div{background-position:0 -432px}.sceditor-button-format div{background-position:0 -448px}.sceditor-button-font div{background-position:0 -464px}.sceditor-button-emoticon div{background-position:0 -480px}.sceditor-button-email div{background-position:0 -496px}.sceditor-button-date div{background-position:0 -512px}.sceditor-button-cut div{background-position:0 -528px}.sceditor-button-copy div{background-position:0 -544px}.sceditor-button-color div{background-position:0 -560px}.sceditor-button-code div{background-position:0 -576px}.sceditor-button-center div{background-position:0 -592px}.sceditor-button-bulletlist div{background-position:0 -608px}.sceditor-button-bold div{background-position:0 -624px}div.sceditor-grip{background-position:0 -640px}.rtl div.sceditor-grip{background-position:0 -650px}.sceditor-container{-webkit-box-orient:vertical;-webkit-box-direction:normal;background:#fff;background-clip:padding-box;border:1px solid #d9d9d9;border-radius:4px;color:#333;display:-ms-flexbox;display:-webkit-box;display:flex;-ms-flex-direction:column;flex-direction:column;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;font-size:13px;font-weight:700;height:250px;line-height:1;position:relative}.sceditor-container *,.sceditor-container :after,.sceditor-container :before{-webkit-box-sizing:content-box;box-sizing:content-box}.sceditor-container,.sceditor-container div,div.sceditor-dropdown,div.sceditor-dropdown div{margin:0;padding:0;z-index:3}.sceditor-container iframe,.sceditor-container textarea{-webkit-box-flex:1;background:#fff;border:0;color:#111;display:block;-ms-flex:1 1 0%;flex:1 1 0%;font-family:Verdana,Arial,Helvetica,sans-serif;font-size:14px;height:auto!important;line-height:1.25;margin:5px;min-height:1px;outline:none;padding:0;resize:none;width:auto!important;width:calc(100% - 10px)!important}.sceditor-container textarea{margin:7px 5px}div.sceditor-dnd-cover{background:#fff3;border:5px dashed #aaa;color:#aaa;font-size:2em;inset:0;position:absolute;text-align:center;z-index:200}div.sceditor-dnd-cover p{pointer-events:none;position:relative;top:45%}div.sceditor-resize-cover{background:#000;height:100%;left:0;opacity:.3;position:absolute;top:0;width:100%;z-index:10}div.sceditor-grip{bottom:0;cursor:pointer;height:10px;line-height:0;overflow:hidden;position:absolute;right:0;width:10px;z-index:3}div.sceditor-grip.has-icon{background-image:none}.sceditor-maximize{background-clip:padding-box;border-radius:0;height:100%!important;left:0;position:fixed;top:0;width:100%!important;z-index:2000}body.sceditor-maximize,html.sceditor-maximize{height:100%;margin:0;overflow:hidden;padding:0;width:100%}.sceditor-maximize div.sceditor-grip{display:none}.sceditor-maximize div.sceditor-toolbar{background-clip:padding-box;border-radius:0}div.sceditor-dropdown{background:#fff;background-clip:padding-box;border:1px solid #ccc;border-radius:2px;-webkit-box-shadow:1px 2px 4px rgba(0,0,0,.2);box-shadow:1px 2px 4px #0003;font-size:15px;font-weight:400;padding:10px;position:absolute;z-index:4000}div.sceditor-dropdown *,div.sceditor-dropdown :after,div.sceditor-dropdown :before{-webkit-box-sizing:border-box;box-sizing:border-box}div.sceditor-dropdown a,div.sceditor-dropdown a:link{color:#333}div.sceditor-dropdown form{margin:0}div.sceditor-dropdown label{color:#3c3c3c;display:block;font-weight:700;padding:4px 0}div.sceditor-dropdown input,div.sceditor-dropdown textarea{background-clip:padding-box;border:1px solid #ccc;border-radius:1px;border-top-color:#888;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;margin:0 0 .75em;outline:0;padding:4px}div.sceditor-dropdown textarea{padding:6px}div.sceditor-dropdown input:focus,div.sceditor-dropdown textarea:focus{border-color:#666 #aaa #aaa;-webkit-box-shadow:inset 0 1px 5px rgba(0,0,0,.1);box-shadow:inset 0 1px 5px #0000001a}div.sceditor-dropdown .button{background:#ececec;background-clip:padding-box;border:1px solid #ccc;border-radius:2px;color:#444;cursor:pointer;font-weight:700;margin:.3em 0 0;padding:6px 12px}div.sceditor-dropdown .button:hover{background:#f3f3f3;-webkit-box-shadow:0 1px 1px rgba(0,0,0,.15);box-shadow:0 1px 1px #00000026}div.sceditor-font-picker,div.sceditor-fontsize-picker,div.sceditor-format{padding:6px 0}div.sceditor-color-picker{padding:4px}div.sceditor-emoticons,div.sceditor-more-emoticons{padding:0}.sceditor-pastetext textarea{border:1px solid #bbb;width:20em}.sceditor-emoticons img,.sceditor-more-emoticons img{cursor:pointer;margin:2px;padding:0}.sceditor-more{border-top:1px solid #bbb;cursor:pointer;display:block;font-weight:700;padding:6px 0;text-align:center}.sceditor-dropdown a:hover{background:#eee}.sceditor-font-option,.sceditor-fontsize-option,.sceditor-format a{color:#222;cursor:pointer;display:block;padding:7px 10px;text-decoration:none}.sceditor-fontsize-option{padding:7px 13px}.sceditor-color-column{float:left}.sceditor-color-option{border:2px solid #fff;display:block;height:18px;overflow:hidden;width:18px}.sceditor-color-option:hover{border:1px solid #aaa}div.sceditor-toolbar{-ms-flex-negative:0;background:#f7f7f7;background-clip:padding-box;border-bottom:1px solid silver;border-radius:3px 3px 0 0;flex-shrink:0;line-height:0;overflow:hidden;padding:3px 5px 2px;text-align:left;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}div.sceditor-group{background:#ddd;border-bottom:1px solid #aaa;display:inline-block;margin:1px 5px 1px 0;padding:1px}.sceditor-button,div.sceditor-group{background-clip:padding-box;border-radius:3px}.sceditor-button{cursor:pointer;float:left;height:20px;padding:3px 5px;width:16px}.sceditor-button.active,.sceditor-button:active,.sceditor-button:hover{background:#fff;-webkit-box-shadow:inset 1px 1px 0 rgba(0,0,0,.3),inset -1px 0 rgba(0,0,0,.3),inset 0 -1px 0 rgba(0,0,0,.2);box-shadow:inset 1px 1px #0000004d,inset -1px 0 #0000004d,inset 0 -1px #0003}.sceditor-button:active{background:#fff;-webkit-box-shadow:inset 1px 1px 0 rgba(0,0,0,.3),inset -1px 0 rgba(0,0,0,.3),inset 0 -1px 0 rgba(0,0,0,.2),inset 0 0 8px rgba(0,0,0,.3);box-shadow:inset 1px 1px #0000004d,inset -1px 0 #0000004d,inset 0 -1px #0003,inset 0 0 8px #0000004d}.sceditor-button.disabled:hover{background:inherit;-webkit-box-shadow:none;box-shadow:none;cursor:default}.sceditor-button,.sceditor-button div{display:block}.sceditor-button svg{fill:#111;display:inline-block;height:16px;line-height:1;margin:2px 0;pointer-events:none;text-decoration:none;width:16px}.sceditor-button.disabled svg{fill:#888}.sceditor-button div{color:transparent;display:inline-block;font-size:0;line-height:0;margin:2px 0;overflow:hidden;padding:0}.sceditor-button.has-icon div{display:none}.sceditor-button.disabled div{opacity:.3}.sceditor-button.text,.sceditor-button.text div,.sceditor-button.text-icon,.sceditor-button.text-icon div,.text .sceditor-button,.text .sceditor-button div,.text-icon .sceditor-button,.text-icon .sceditor-button div{color:inherit;display:inline-block;font-size:1em;line-height:16px;text-indent:0;width:auto}.sceditor-button.has-icon div,.sceditor-button.text div,.text .sceditor-button div,.text-icon .sceditor-button.has-icon div{background:none;padding:0 2px}.sceditor-button.text svg,.text .sceditor-button svg{display:none}.sceditor-button.text-icon div,.text-icon .sceditor-button div{padding:0 2px 0 20px}.rtl div.sceditor-toolbar{text-align:right}.rtl .sceditor-button{float:right}.rtl div.sceditor-grip{left:0;right:auto}body,code:before,html,p,table{font-family:Verdana,Arial,Helvetica,sans-serif;font-size:14px;line-height:1.25;margin:0;overflow:visible;padding:0}body.placeholder:before{content:attr(placeholder);font-style:italic}code{direction:ltr;display:block;margin:.25em 0;padding:1em;text-align:left;white-space:pre}blockquote{border-left:.3em solid #f4e59f;margin:.25em 0;padding:.5em .5em .5em .75em}body,code:before,html,p,table{color:#111;font-family:Verdana,Arial,Helvetica,sans-serif;font-size:14px;line-height:1.25;margin:0;overflow:visible;padding:0}html{height:100%}.ios{-webkit-overflow-scrolling:touch;overflow:auto}.ios body{overflow:auto;position:relative}body{word-wrap:break-word;min-height:100%}body.placeholder:before{color:#555;content:attr(placeholder);font-style:italic}ol,ul{margin-bottom:0;margin-top:0;padding-bottom:0;padding-top:0}table,td{border:1px dotted #000;empty-cells:show}table td{min-width:5px}code{background:#f1f1f1;direction:ltr;display:block;margin:.25em 0;padding:1em;text-align:left;white-space:pre}blockquote{background:#fff7d9;border-left:.3em solid #f4e59f;margin:.25em 0;padding:.5em .5em .5em .75em}blockquote cite{border-bottom:1px solid #f4e59f;display:block;font-size:1em;font-weight:700;margin:0 -.5em .25em -.75em;padding:0 .5em .15em .75em}h1,h2,h3,h4,h5,h6{margin:0;padding:0}div,p{min-height:1.25em}\n/*! SCEditor | (C) 2011-2016, Sam Clarke | sceditor.com/license */\n/*! SCEditor | (C) 2011-2013, Sam Clarke | sceditor.com/license */\n"] }]
        }], propDecorators: { id: [{
                type: Input,
                args: ['id']
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
            }] } });

class SCEditorModule {
    static getValue(id) {
        const textarea = document.getElementById(id);
        // @ts-ignore
        return sceditor.instance(textarea).val();
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
