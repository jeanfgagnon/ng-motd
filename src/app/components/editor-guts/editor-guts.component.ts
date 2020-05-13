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
  public borderStyles: string[] = [];
  initMessage = 'Your text here';

  fgSettings = this.fb.group({
    enabled: [false],
    background: ['', Validators.required],
    color: ['', Validators.required],
    verticalAlign: [false],
    horizontalAlign: [false],
    padding: [0],
    font: [''],
    fontSize: [0],
    bold: [false],
    italic: [false],
    underline: [false],
    height: [0],
    borderWidth: [0],
    borderColor: [''],
    borderStyle: [''],
    rounded: [false],
    shadow: [false]
  });

  constructor(private fb: FormBuilder) { }

  @Output() configChanged: EventEmitter<EditorConfig> = new EventEmitter<EditorConfig>();

  ngOnInit(): void {

    this.fgSettings.valueChanges.subscribe(form => {
      this.updateConfig(form);
      this.configChanged.emit(this.EditorConfig);
    });

    this.loadBorderStyles();
    this.loadForm();
  }

  // helpers

  public getMessageCSS(): unknown {
    const css: CssObject = {};

    css["height"] = '50px';
    css["background-color"] = this.EditorConfig.background;

    if (this.EditorConfig.verticalAlign && this.EditorConfig.horizontalAlign) {
      css["display"] = 'flex';
      css["align-items"] = 'center';
      css["justify-content"] = 'center';
    }
    else if (this.EditorConfig.verticalAlign) {
      css["display"] = 'flex';
      css["align-items"] = 'center';
      css["justify-content"] = 'start';
    }
    else if (this.EditorConfig.horizontalAlign) {
      css["text-align"] = 'center';
    }

    css["padding"] = `${this.EditorConfig.padding}px`;
    css["color"] = this.EditorConfig.color;
    css["font-family"] = this.EditorConfig.font;
    css["font-size"] = `${this.EditorConfig.fontSize}px`;

    if (this.EditorConfig.bold) {
      css["font-weight"] = 'bold';
    }

    if (this.EditorConfig.rounded) {
      css["border-radius"] = '6px';
    }

    css["border-style"] = this.EditorConfig.borderStyle;
    css["border-width"] = `${this.EditorConfig.borderWidth}px`;
    css["border-color"] = this.EditorConfig.borderColor;

    if (this.EditorConfig.shadow) {
      css["box-shadow"] = '1px 1px 3px 0px rgba(92, 92, 92, 1)';
    }

    return css;
  }

  // privates

  private loadBorderStyles(): void {
    this.borderStyles.push("none");
    this.borderStyles.push("solid");
    this.borderStyles.push("double");
    this.borderStyles.push("dashed");
    this.borderStyles.push("dotted");
  }

  private updateConfig(form: any) {

    this.EditorConfig.enabled = form.enabled;
    this.EditorConfig.isDirty = true;
    this.EditorConfig.background = form.background;
    this.EditorConfig.color = form.color;
    this.EditorConfig.verticalAlign = form.verticalAlign;
    this.EditorConfig.horizontalAlign = form.horizontalAlign;
    this.EditorConfig.padding = form.padding;
    this.EditorConfig.font = form.font;
    this.EditorConfig.fontSize = form.fontSize;
    this.EditorConfig.bold = form.bold;
    this.EditorConfig.italic = form.italic;
    this.EditorConfig.underline = form.underline;
    this.EditorConfig.height = form.height;
    this.EditorConfig.borderWidth = form.borderWidth;
    this.EditorConfig.borderStyle = form.borderStyle;
    this.EditorConfig.borderColor = form.borderColor;
    this.EditorConfig.rounded = form.rounded;
    this.EditorConfig.shadow = form.shadow;

  }

  private loadForm(): void {

    this.fgSettings.setValue({
      enabled: this.EditorConfig.enabled,
      background: this.EditorConfig.background,
      color: this.EditorConfig.color,
      verticalAlign: this.EditorConfig.verticalAlign,
      horizontalAlign: this.EditorConfig.horizontalAlign,
      padding: this.EditorConfig.padding,
      font: this.EditorConfig.font,
      fontSize: this.EditorConfig.fontSize,
      bold: this.EditorConfig.bold,
      italic: this.EditorConfig.italic,
      underline: this.EditorConfig.underline,
      height: this.EditorConfig.height,
      borderWidth: this.EditorConfig.borderWidth,
      borderColor: this.EditorConfig.borderColor,
      borderStyle: this.EditorConfig.borderStyle,
      rounded: this.EditorConfig.rounded,
      shadow: this.EditorConfig.shadow
    }, { emitEvent: false });

  }

  @Input() set EditorConfig(config: EditorConfig) {
    this._editorConfig = config;
  }
  get EditorConfig(): EditorConfig {
    return this._editorConfig;
  }
}
