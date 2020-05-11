import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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

  settingsFormGroup = this.fb.group({
    title: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) { }

  @Output() configChanged: EventEmitter<EditorConfig> = new EventEmitter<EditorConfig>();

  ngOnInit(): void {

    this.settingsFormGroup.valueChanges.subscribe(form => {
      console.log('it changed: ', form);
      this.EditorConfig.isDirty = true;
      this.configChanged.emit(this.EditorConfig);
    });
  }

  // helpers

  public getMessageCSS(): unknown {
    const css: CssObject = {};

    css["height"] = '50px';
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
