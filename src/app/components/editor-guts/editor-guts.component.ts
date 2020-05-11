import { Component, OnInit, Input } from '@angular/core';

import { EditorConfig } from 'src/app/common/editor-config';

interface CssObject {
  [key: string]: any
}

@Component({
  selector: 'app-editor-guts',
  templateUrl: './editor-guts.component.html',
  styleUrls: ['./editor-guts.component.scss']
})
export class EditorGutsComponent implements OnInit {

  private _editorConfig = new EditorConfig();

  message = 'Your text here';

  constructor() { }

  ngOnInit(): void {
  }

  // helpers

  public getMessageCSS(): unknown {
    const css: CssObject = {};

    css["height"] = '90px';
    css["background-color"] = 'red';

    return css;
  }

  @Input() set EditorConfig(config: EditorConfig) {
    this._editorConfig = config;
  }
  get EditorConfig(): EditorConfig {
    return this._editorConfig;
  }
}
